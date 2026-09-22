declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
  serve(
    handler: (request: Request) => Response | Promise<Response>
  ): void;
};

type ConsultationPayload = {
  name?: string;
  age?: string;
  grade?: string;
  location?: string;
  phone?: string;
  email?: string;
  interest?: string;
  remarks?: string;
  preferredDate?: string;
  preferredTime?: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });

const toStringValue = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const normalizePayload = (value: unknown): ConsultationPayload => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  const body = value as Record<string, unknown>;

  return {
    name: toStringValue(body.name),
    age: toStringValue(body.age),
    grade: toStringValue(body.grade),
    location: toStringValue(body.location),
    phone: toStringValue(body.phone),
    email: toStringValue(body.email),
    interest: toStringValue(body.interest),
    remarks: toStringValue(body.remarks),
    preferredDate: toStringValue(body.preferredDate),
    preferredTime: toStringValue(body.preferredTime),
  };
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const field = (label: string, value?: string) => `
  <tr>
    <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;color:#0a2342;">
      ${label}
    </td>
    <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#334155;">
      ${escapeHtml(value?.trim() || "Not shared")}
    </td>
  </tr>
`;

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const adminEmail = Deno.env.get("ADMIN_NOTIFICATION_EMAIL");
  const fromEmail =
    Deno.env.get("ADMIN_NOTIFICATION_FROM_EMAIL") ||
    "DreamGlobal <onboarding@resend.dev>";

  if (!resendApiKey || !adminEmail) {
    console.error("Email notification is not configured:", {
      hasApiKey: !!resendApiKey,
      hasAdminEmail: !!adminEmail,
    });

    return jsonResponse({ error: "Email notification is not configured" }, 500);
  }

  let payload: ConsultationPayload;

  try {
    payload = normalizePayload(await request.json());
  } catch (error) {
    console.error("Failed to parse request body:", error);

    return jsonResponse({ error: "Invalid request body" }, 400);
  }

  if (!payload.name || !payload.phone || !payload.email) {
    console.error("Missing lead details:", {
      hasName: !!payload.name,
      hasPhone: !!payload.phone,
      hasEmail: !!payload.email,
    });

    return jsonResponse({ error: "Missing lead details" }, 400);
  }

  const schedule = `${payload.preferredDate || "Flexible date"} ${
    payload.preferredTime || "Flexible time"
  }`;

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.5;color:#0f172a;">
      <h1 style="margin:0 0 8px;font-size:22px;color:#0a2342;">
        New DreamGlobal Consultation Request
      </h1>

      <p style="margin:0 0 18px;color:#475569;">
        A new candidate submitted the Book a Consultation form.
      </p>

      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
        ${field("Name", payload.name)}
        ${field("Age", payload.age)}
        ${field("Grade/Class", payload.grade)}
        ${field("Location", payload.location)}
        ${field("Phone", payload.phone)}
        ${field("Email", payload.email)}
        ${field("Interest", payload.interest || "Book consultation")}
        ${field("Preferred Schedule", schedule)}
        ${field("Remarks", payload.remarks)}
      </table>
    </div>
  `;

  console.log("Sending email with:", {
    hasApiKey: !!resendApiKey,
    adminEmail,
    fromEmail,
  });

  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [adminEmail],
        reply_to: payload.email,
        subject: `New consultation request: ${payload.name}`,
        html,
      }),
    });

    console.log("Resend response status:", emailResponse.status);

    if (!emailResponse.ok) {
      const details = await emailResponse.text();

      console.error("Admin notification email failed:", details);

      return jsonResponse(
        {
          error: "Email could not be sent",
          details,
        },
        502
      );
    }

    const result = await emailResponse.text();

    console.log("Resend response:", result);

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error("Resend request threw an error:", error);

    return jsonResponse({ error: "Email request failed" }, 502);
  }
});
