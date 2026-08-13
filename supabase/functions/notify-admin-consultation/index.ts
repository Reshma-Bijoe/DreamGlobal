type ConsultationPayload = {
  name?: string;
  age?: string;
  grade?: string;
  location?: string;
  phone?: string;
  email?: string;
  remarks?: string;
  preferredDate?: string;
  preferredTime?: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
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
    <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;color:#0a2342;">${label}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#334155;">${escapeHtml(
      value?.trim() || "Not shared"
    )}</td>
  </tr>
`;

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const adminEmail = Deno.env.get("ADMIN_NOTIFICATION_EMAIL");
  const fromEmail =
    Deno.env.get("ADMIN_NOTIFICATION_FROM_EMAIL") ||
    "DreamGlobal <onboarding@resend.dev>";

  if (!resendApiKey || !adminEmail) {
    return new Response(
      JSON.stringify({ error: "Email notification is not configured" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  const payload = (await request.json()) as ConsultationPayload;

  if (!payload.name?.trim() || !payload.phone?.trim() || !payload.email?.trim()) {
    return new Response(JSON.stringify({ error: "Missing lead details" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const schedule = `${payload.preferredDate?.trim() || "Flexible date"} ${
    payload.preferredTime?.trim() || "Flexible time"
  }`;

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.5;color:#0f172a;">
      <h1 style="margin:0 0 8px;font-size:22px;color:#0a2342;">New DreamGlobal Consultation Request</h1>
      <p style="margin:0 0 18px;color:#475569;">A new candidate submitted the Book a Consultation form.</p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
        ${field("Name", payload.name)}
        ${field("Age", payload.age)}
        ${field("Grade/Class", payload.grade)}
        ${field("Location", payload.location)}
        ${field("Phone", payload.phone)}
        ${field("Email", payload.email)}
        ${field("Preferred Schedule", schedule)}
        ${field("Remarks", payload.remarks)}
      </table>
    </div>
  `;

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
      subject: `New consultation request: ${payload.name.trim()}`,
      html,
    }),
  });

  if (!emailResponse.ok) {
    const details = await emailResponse.text();
    console.error("Admin notification email failed:", details);

    return new Response(JSON.stringify({ error: "Email could not be sent" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
