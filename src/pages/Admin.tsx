import { useEffect, useMemo, useState, useCallback } from "react";
import type { FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Bell,
  BellOff,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  ListFilter,
  KeyRound,
  Loader2,
  LockKeyhole,
  LogOut,
  Mail,
  Phone,
  ShieldCheck,
  Trash2,
  UserRound,
  XCircle,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { supabase } from "../../supabaseClient";

type LeadStatus = "Accepted" | "Rejected" | "Pending";
type EligibilityStatus = "Approved" | "Rejected" | "Pending";
type RequestStatus = LeadStatus | EligibilityStatus;
type StatusFilter = "All" | "Accepted" | "Approved" | "Rejected" | "Pending";
type SortMode = "latest" | "oldest" | "name-az" | "name-za";
type RequestSource = "leads" | "eligibility";

type Lead = {
  id: number;
  source?: RequestSource;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  status?: RequestStatus | string | null;
  remarks?: string | null;
  interest?: string | null;
  preferred_country?: string | null;
  country_interest?: string | null;
  preferred_intake?: string | null;
  highest_qualification?: string | null;
  academic_score?: string | null;
  passport_status?: string | null;
  english_test_status?: string | null;
  expected_budget?: number | string | null;
  study_seriousness?: string | null;
  lead_type?: string | null;
  created_at?: string | null;
};

type EligibilityRow = {
  id: number;
  name?: string | null;
  number?: string | null;
  email?: string | null;
  country?: string | null;
  interest?: string | null;
  intake?: string | null;
  cgpa?: string | null;
  passport?: string | null;
  qualification?: string | null;
  serious?: string | null;
  ielts?: string | null;
  budget?: number | string | null;
  status?: EligibilityStatus | string | null;
  remarks?: string | null;
  created_at?: string | null;
};

const mapEligibilityRow = (row: EligibilityRow): Lead => ({
  id: row.id,
  source: "eligibility",
  name: row.name,
  email: row.email,
  phone: row.number,
  status: row.status || "Pending",
  remarks: row.remarks,
  preferred_country: row.country,
  country_interest: row.interest,
  preferred_intake: row.intake,
  highest_qualification: row.qualification,
  academic_score: row.cgpa,
  passport_status: row.passport,
  english_test_status: row.ielts,
  expected_budget: row.budget,
  study_seriousness: row.serious,
  lead_type: "eligibility",
  created_at: row.created_at,
});

const getLeadStatus = (status?: string | null): RequestStatus => {
  if (
    status === "Accepted" ||
    status === "Approved" ||
    status === "Rejected"
  ) {
    return status;
  }
  return "Pending";
};

const statusStyles: Record<RequestStatus, string> = {
  Accepted: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Rejected: "border-rose-200 bg-rose-50 text-rose-700",
  Pending: "border-amber-200 bg-amber-50 text-amber-700",
};

const formatDate = (value?: string | null) => {
  if (!value) return "Recently submitted";

  try {
    return new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch (e) {
    return "Recently submitted";
  }
};

const getEligibilityDetails = (lead: Lead) =>
  [
    ["Interest", lead.interest],
    ["Country", lead.preferred_country],
    ["Interest", lead.country_interest],
    ["Intake", lead.preferred_intake],
    ["Qualification", lead.highest_qualification],
    ["Score", lead.academic_score],
    ["Passport", lead.passport_status],
    ["IELTS/PTE", lead.english_test_status],
    ["Budget", lead.expected_budget ? `INR ${lead.expected_budget}` : null],
    ["Intent", lead.study_seriousness],
  ].filter((detail): detail is [string, string] => Boolean(detail[1]));

const csvEscape = (value?: string | number | null) => {
  const text = value === null || value === undefined ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
};

export default function AdminDashboard() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingLeads, setFetchingLeads] = useState(false);
  const [authError, setAuthError] = useState("");
  const [leadsError, setLeadsError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [sortMode, setSortMode] = useState<SortMode>("latest");
  const [statusAction, setStatusAction] = useState<{
    id: number;
    source: RequestSource;
    status: RequestStatus;
  } | null>(null);
  const [statusRemark, setStatusRemark] = useState("");
  const [statusError, setStatusError] = useState("");
  const [actionLeadId, setActionLeadId] = useState<number | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("dreamglobal-admin-notifications") === "true";
  });
  const [notificationMessage, setNotificationMessage] = useState("");

  const fetchLeads = useCallback(async () => {
    setFetchingLeads(true);
    setLeadsError("");
    const { data: leadData, error: leadError } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: eligibilityData, error: eligibilityError } = await supabase
      .from("eligibility")
      .select("*")
      .order("created_at", { ascending: false });

    if (leadError || eligibilityError) {
      console.error("Error fetching requests:", {
        leadError,
        eligibilityError,
      });
      setLeadsError(
        leadError?.message ||
          eligibilityError?.message ||
          "Could not load incoming requests."
      );
    } else {
      setLeads([
        ...(leadData || []).map((lead) => ({
          ...lead,
          source: "leads" as const,
        })),
        ...((eligibilityData as EligibilityRow[] | null) || []).map(
          mapEligibilityRow
        ),
      ]);
    }

    setFetchingLeads(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchLeads();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchLeads();
    });

    return () => subscription.unsubscribe();
  }, [fetchLeads]);

  useEffect(() => {
    if (!session || !notificationsEnabled) return;

    const notifyIncomingRequest = (source: RequestSource) => {
      const title =
        source === "eligibility"
          ? "New eligibility profile"
          : "New callback request";

      if (
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        new Notification(title, {
          body: "A new DreamGlobal request has arrived.",
        });
      }

      setNotificationMessage(`${title} received. Refreshing the dashboard.`);
      fetchLeads();
    };

    const channel = supabase
      .channel("admin-incoming-requests")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "leads" },
        () => notifyIncomingRequest("leads")
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "eligibility" },
        () => notifyIncomingRequest("eligibility")
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setNotificationMessage("Incoming browser notifications turned on.");
        }

        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          setNotificationMessage(
            "Realtime notifications could not connect. Check Supabase realtime settings for leads and eligibility."
          );
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchLeads, notificationsEnabled, session]);

  const stats = useMemo(() => {
    const base = { total: leads.length, pending: 0, accepted: 0, rejected: 0 };

    leads.forEach((lead) => {
      const status = getLeadStatus(lead.status);
      if (status === "Accepted" || status === "Approved") base.accepted += 1;
      if (status === "Rejected") base.rejected += 1;
      if (status === "Pending") base.pending += 1;
    });

    return base;
  }, [leads]);

  const displayedLeads = useMemo(() => {
    return [...leads]
      .filter((lead) => {
        if (statusFilter === "All") return true;
        return getLeadStatus(lead.status) === statusFilter;
      })
      .sort((first, second) => {
        const firstName = (first.name || "").toLowerCase();
        const secondName = (second.name || "").toLowerCase();
        const firstDate = first.created_at
          ? new Date(first.created_at).getTime()
          : 0;
        const secondDate = second.created_at
          ? new Date(second.created_at).getTime()
          : 0;

        if (sortMode === "oldest") return firstDate - secondDate;
        if (sortMode === "name-az") return firstName.localeCompare(secondName);
        if (sortMode === "name-za") return secondName.localeCompare(firstName);
        return secondDate - firstDate;
      });
  }, [leads, sortMode, statusFilter]);

  const displayedLeadRequests = useMemo(
    () => displayedLeads.filter((lead) => (lead.source || "leads") === "leads"),
    [displayedLeads]
  );

  const displayedEligibilityRequests = useMemo(
    () => displayedLeads.filter((lead) => lead.source === "eligibility"),
    [displayedLeads]
  );

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: identifier.trim(),
      password,
    });

    if (error) setAuthError(error.message);

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setLeads([]);
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setPasswordMessage("");
    setShowPasswordModal(false);
    setStatusAction(null);
    setStatusRemark("");
    setStatusError("");
  };

  const handlePasswordModalOpenChange = (open: boolean) => {
    setShowPasswordModal(open);
    if (!open) {
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError("");
      setPasswordMessage("");
    }
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordMessage("");

    if (newPassword.length < 6) {
      setPasswordError("Use at least 6 characters for the new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("The new passwords do not match.");
      return;
    }

    setChangingPassword(true);
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setPasswordError(error.message);
    } else {
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMessage("Password updated successfully.");
    }

    setChangingPassword(false);
  };

  const handleOpenStatusAction = (
    lead: Lead,
    newStatus: RequestStatus
  ) => {
    setStatusAction({
      id: lead.id,
      source: lead.source || "leads",
      status: newStatus,
    });
    setStatusRemark(lead?.remarks || "");
    setStatusError("");
  };

  const handleStatusModalOpenChange = (open: boolean) => {
    if (!open) {
      setStatusAction(null);
      setStatusRemark("");
      setStatusError("");
    }
  };

  const handleUpdateStatus = async (event: FormEvent) => {
    event.preventDefault();
    if (!statusAction) return;

    setActionLeadId(statusAction.id);
    setStatusError("");

    const remark = statusRemark.trim();
    const { error } =
      statusAction.source === "eligibility"
        ? await supabase
            .from("eligibility")
            .update({ status: statusAction.status, remarks: remark || null })
            .eq("id", statusAction.id)
        : await supabase
            .from("leads")
            .update({ status: statusAction.status, remarks: remark || null })
            .eq("id", statusAction.id);

    if (error) {
      setStatusError(error.message);
    } else {
      setLeads((currentLeads) =>
        currentLeads.map((lead) =>
          lead.id === statusAction.id &&
          (lead.source || "leads") === statusAction.source
            ? { ...lead, status: statusAction.status, remarks: remark || null }
            : lead
        )
      );
      setStatusAction(null);
      setStatusRemark("");
    }

    setActionLeadId(null);
  };

  const handleDeleteRequest = async (lead: Lead) => {
    const source = lead.source || "leads";
    const requestLabel =
      source === "eligibility"
        ? `eligibility profile #${lead.id}`
        : `lead #${lead.id}`;

    if (
      typeof window !== "undefined" &&
      !window.confirm(`Delete ${requestLabel}? This cannot be undone.`)
    ) {
      return;
    }

    setActionLeadId(lead.id);
    setLeadsError("");

    const { error } = await supabase.from(source).delete().eq("id", lead.id);

    if (error) {
      setLeadsError(error.message);
    } else {
      setLeads((currentLeads) =>
        currentLeads.filter(
          (currentLead) =>
            currentLead.id !== lead.id ||
            (currentLead.source || "leads") !== source
        )
      );
    }

    setActionLeadId(null);
  };

  const handleToggleNotifications = async () => {
    setNotificationMessage("");

    if (notificationsEnabled) {
      setNotificationsEnabled(false);
      localStorage.setItem("dreamglobal-admin-notifications", "false");
      setNotificationMessage("Incoming browser notifications turned off.");
      return;
    }

    if (typeof window !== "undefined" && "Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setNotificationMessage(
          "Browser notification permission was not granted."
        );
        return;
      }
    }

    setNotificationsEnabled(true);
    localStorage.setItem("dreamglobal-admin-notifications", "true");
    setNotificationMessage("Incoming browser notifications turned on.");
  };

  const exportRequests = (requests: Lead[], fileLabel: string) => {
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Status",
      "Remarks",
      "Interest",
      "Country",
      "Interest",
      "Intake",
      "Qualification",
      "CGPA/Score",
      "Passport",
      "IELTS/PTE",
      "Budget",
      "Seriousness",
      "Submitted",
    ];

    const rows = requests.map((lead) => [
      lead.id,
      lead.name,
      lead.email,
      lead.phone,
      getLeadStatus(lead.status),
      lead.remarks,
      lead.interest,
      lead.preferred_country,
      lead.country_interest,
      lead.preferred_intake,
      lead.highest_qualification,
      lead.academic_score,
      lead.passport_status,
      lead.english_test_status,
      lead.expected_budget,
      lead.study_seriousness,
      lead.created_at,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((value) => csvEscape(value)).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dreamglobal-${fileLabel}-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderRequestSection = ({
    title,
    description,
    requests,
    total,
    fileLabel,
    emptyTitle,
    emptyText,
  }: {
    title: string;
    description: string;
    requests: Lead[];
    total: number;
    fileLabel: string;
    emptyTitle: string;
    emptyText: string;
  }) => (
    <section className="mt-8 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Showing {requests.length} of {total}
          </p>
        </div>

        <button
          type="button"
          onClick={() => exportRequests(requests, fileLabel)}
          disabled={requests.length === 0}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={17} />
          Export CSV
        </button>
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="bg-muted/60 text-sm text-muted-foreground">
              <th className="px-5 py-4 font-semibold">Student</th>
              <th className="px-5 py-4 font-semibold">Contact</th>
              <th className="px-5 py-4 font-semibold">Submitted</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((lead) => {
              const status = getLeadStatus(lead.status);
              const isEligibility = lead.source === "eligibility";
              const busy = actionLeadId === lead.id;
              const eligibilityDetails = getEligibilityDetails(lead);

              return (
                <tr
                  key={`${lead.source || "leads"}-${lead.id}`}
                  className="border-t border-border transition hover:bg-muted/40"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-foreground">
                      {lead.name || "Unnamed student"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isEligibility
                        ? `Eligibility #${lead.id}`
                        : `Lead #${lead.id}`}
                    </p>
                    {isEligibility && (
                      <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                        <FileText size={12} />
                        Eligibility profile
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail size={15} className="text-primary" />
                      {lead.email || "No email"}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Phone size={15} className="text-primary" />
                      {lead.phone || "No phone"}
                    </div>
                    {eligibilityDetails.length > 0 && (
                      <div className="mt-3 grid gap-1 text-xs">
                        {eligibilityDetails.map(([label, value]) => (
                          <p key={label}>
                            <span className="font-semibold text-foreground">
                              {label}:
                            </span>{" "}
                            {value}
                          </p>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">
                    {formatDate(lead.created_at)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[status]}`}
                    >
                      {status}
                    </span>
                    {lead.remarks && (
                      <p className="mt-2 max-w-xs text-sm leading-5 text-muted-foreground">
                        {lead.remarks}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenStatusAction(
                            lead,
                            isEligibility ? "Approved" : "Accepted"
                          )
                        }
                        disabled={busy}
                        className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
                      >
                        <CheckCircle2 size={15} />
                        {isEligibility ? "Approve" : "Accept"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenStatusAction(lead, "Rejected")}
                        disabled={busy}
                        className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white transition hover:bg-accent disabled:opacity-60"
                      >
                        <XCircle size={15} />
                        Reject
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteRequest(lead)}
                        disabled={busy}
                        aria-label={`Delete ${isEligibility ? "eligibility profile" : "lead"} ${lead.id}`}
                        title="Delete"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-destructive/30 text-destructive transition hover:bg-destructive/10 disabled:opacity-60"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 p-4 lg:hidden">
        {requests.map((lead) => {
          const status = getLeadStatus(lead.status);
          const isEligibility = lead.source === "eligibility";
          const busy = actionLeadId === lead.id;
          const eligibilityDetails = getEligibilityDetails(lead);

          return (
            <article
              key={`${lead.source || "leads"}-${lead.id}`}
              className="rounded-lg border border-border bg-background p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    {lead.name || "Unnamed student"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(lead.created_at)}
                  </p>
                  {isEligibility && (
                    <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                      <FileText size={12} />
                      Eligibility profile
                    </p>
                  )}
                </div>
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[status]}`}
                >
                  {status}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Mail size={15} className="text-primary" />
                  {lead.email || "No email"}
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={15} className="text-primary" />
                  {lead.phone || "No phone"}
                </p>
              </div>

              {eligibilityDetails.length > 0 && (
                <div className="mt-4 grid gap-2 rounded-md border border-border bg-muted/30 p-3 text-sm text-muted-foreground">
                  {eligibilityDetails.map(([label, value]) => (
                    <p key={label}>
                      <span className="font-semibold text-foreground">
                        {label}:
                      </span>{" "}
                      {value}
                    </p>
                  ))}
                </div>
              )}

              {lead.remarks && (
                <p className="mt-4 rounded-md border border-border bg-muted/40 p-3 text-sm leading-6 text-muted-foreground">
                  {lead.remarks}
                </p>
              )}

              <div className="mt-4 grid grid-cols-[1fr_1fr_auto] gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleOpenStatusAction(
                      lead,
                      isEligibility ? "Approved" : "Accepted"
                    )
                  }
                  disabled={busy}
                  className="inline-flex items-center justify-center gap-1.5 rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-60"
                >
                  <CheckCircle2 size={15} />
                  {isEligibility ? "Approve" : "Accept"}
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenStatusAction(lead, "Rejected")}
                  disabled={busy}
                  className="inline-flex items-center justify-center gap-1.5 rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white disabled:opacity-60"
                >
                  <XCircle size={15} />
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteRequest(lead)}
                  disabled={busy}
                  aria-label={`Delete ${isEligibility ? "eligibility profile" : "lead"} ${lead.id}`}
                  title="Delete"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-destructive/30 text-destructive disabled:opacity-60"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {!fetchingLeads && requests.length === 0 && (
        <div className="px-5 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Clock3 size={24} />
          </div>
          <h3 className="mt-4 font-heading text-2xl font-semibold text-foreground">
            {emptyTitle}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{emptyText}</p>
        </div>
      )}
    </section>
  );

  if (!session) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="px-4 pb-16 pt-52 sm:pt-48">
          <div className="container mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1fr_0.82fr]">
            <section>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <ShieldCheck size={16} />
                Admin authentication
              </div>

              <h1 className="mt-6 font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">
                DreamGlobal request review portal.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                Sign in with your admin credentials to review incoming student
                requests, accept qualified enquiries, and reject requests that
                need to be filtered out.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ["Secure", "Supabase protected login"],
                  ["Review", "Incoming requests in one place"],
                  ["Decide", "Accept, approve, or reject instantly"],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-lg border border-border bg-card p-4 shadow-sm"
                  >
                    <p className="font-heading text-lg font-semibold text-foreground">
                      {title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-border bg-card p-6 shadow-lg shadow-secondary/10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-white">
                  <LockKeyhole size={20} />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    Admin sign in
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Use your username/email and password.
                  </p>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-foreground">
                    Username or email
                  </span>
                  <div className="flex items-center gap-3 rounded-md border border-input bg-background px-3 py-2.5 focus-within:ring-2 focus-within:ring-primary">
                    <UserRound size={18} className="text-primary" />
                    <input
                      type="text"
                      autoComplete="username"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                      placeholder="admin@dreamglobal.in"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-foreground">
                    Password
                  </span>
                  <div className="flex items-center gap-3 rounded-md border border-input bg-background px-3 py-2.5 focus-within:ring-2 focus-within:ring-primary">
                    <LockKeyhole size={18} className="text-primary" />
                    <input
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                      placeholder="Enter admin password"
                    />
                  </div>
                </label>

                {authError && (
                  <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
                    {authError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="gold-gradient-bg flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Authenticating
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} />
                      Secure login
                    </>
                  )}
                </button>
              </form>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="px-4 pb-16 pt-52 sm:pt-48">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Admin dashboard
              </p>
              <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
                Incoming request review.
              </h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Review new student enquiries and eligibility profiles for the
                counselling team.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleToggleNotifications}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary"
              >
                {notificationsEnabled ? (
                  <BellOff size={17} />
                ) : (
                  <Bell size={17} />
                )}
                {notificationsEnabled ? "Notifications on" : "Notify me"}
              </button>

              <button
                type="button"
                onClick={() => setShowPasswordModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary"
              >
                <KeyRound size={17} />
                Change password
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          </div>

          {notificationMessage && (
            <p className="mt-4 rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground">
              {notificationMessage}
            </p>
          )}

          <Dialog
            open={showPasswordModal}
            onOpenChange={handlePasswordModalOpenChange}
          >
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 font-heading text-2xl">
                  <KeyRound size={20} className="text-primary" />
                  Change password
                </DialogTitle>
                <DialogDescription>
                  Update the password for {session.user.email || "this admin account"}.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-foreground">
                    New password
                  </span>
                  <input
                    type="password"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary"
                    placeholder="Minimum 6 characters"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-foreground">
                    Confirm password
                  </span>
                  <input
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary"
                    placeholder="Repeat password"
                  />
                </label>

                {(passwordError || passwordMessage) && (
                  <p
                    className={`rounded-md border px-3 py-2 text-sm font-medium ${
                      passwordError
                        ? "border-destructive/30 bg-destructive/10 text-destructive"
                        : "border-emerald-200 bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {passwordError || passwordMessage}
                  </p>
                )}

                <DialogFooter>
                  <button
                    type="submit"
                    disabled={changingPassword}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {changingPassword ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <KeyRound size={16} />
                    )}
                    Update password
                  </button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog
            open={Boolean(statusAction)}
            onOpenChange={handleStatusModalOpenChange}
          >
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 font-heading text-2xl">
                  {statusAction?.status === "Accepted" ||
                  statusAction?.status === "Approved" ? (
                    <CheckCircle2 size={20} className="text-emerald-600" />
                  ) : (
                    <XCircle size={20} className="text-secondary" />
                  )}
                  {statusAction?.status === "Accepted"
                    ? "Accept request"
                    : statusAction?.status === "Approved"
                    ? "Approve eligibility"
                    : "Reject request"}
                </DialogTitle>
                <DialogDescription>
                  Add a remark for the candidate if you want to keep context for
                  the counselling team.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleUpdateStatus} className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-foreground">
                    Remarks optional
                  </span>
                  <textarea
                    value={statusRemark}
                    onChange={(event) => setStatusRemark(event.target.value)}
                    rows={4}
                    className="w-full resize-none rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary"
                    placeholder="Add notes about documents, eligibility, next steps, or rejection reason."
                  />
                </label>

                {statusError && (
                  <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
                    {statusError}
                  </p>
                )}

                <DialogFooter>
                  <button
                    type="submit"
                    disabled={Boolean(
                      statusAction && actionLeadId === statusAction.id
                    )}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {statusAction && actionLeadId === statusAction.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : statusAction?.status === "Accepted" ||
                      statusAction?.status === "Approved" ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <XCircle size={16} />
                    )}
                    Save status
                  </button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              { label: "Total", value: stats.total, Icon: ShieldCheck },
              { label: "Pending", value: stats.pending, Icon: Clock3 },
              {
                label: "Accepted/Approved",
                value: stats.accepted,
                Icon: CheckCircle2,
              },
              { label: "Rejected", value: stats.rejected, Icon: XCircle },
            ].map(({ label, value, Icon }) => (
              <div
                key={label}
                className="rounded-lg border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-muted-foreground">
                    {label}
                  </p>
                  <Icon size={18} className="text-primary" />
                </div>
                <p className="mt-3 font-heading text-3xl font-bold text-foreground">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <section className="mt-8 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-heading text-2xl font-semibold text-foreground">
                  Request controls
                </h2>
                <p className="text-sm text-muted-foreground">
                  Filter and sort both tables before reviewing or exporting.
                </p>
              </div>

              {fetchingLeads && (
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Loader2 size={16} className="animate-spin" />
                  Loading requests
                </div>
              )}
            </div>

            <div className="grid gap-3 bg-muted/30 px-5 py-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <ListFilter size={15} className="text-primary" />
                  Filter status
                </span>
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value as StatusFilter)
                  }
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary"
                >
                  <option value="All">All requests</option>
                  <option value="Pending">Pending only</option>
                  <option value="Accepted">Accepted only</option>
                  <option value="Approved">Approved only</option>
                  <option value="Rejected">Rejected only</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-foreground">
                  Sort by
                </span>
                <select
                  value={sortMode}
                  onChange={(event) =>
                    setSortMode(event.target.value as SortMode)
                  }
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary"
                >
                  <option value="latest">Latest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="name-az">Name A to Z</option>
                  <option value="name-za">Name Z to A</option>
                </select>
              </label>

              <p className="rounded-md border border-border bg-background px-3 py-2.5 text-sm font-semibold text-muted-foreground">
                Showing {displayedLeads.length} of {leads.length}
              </p>
            </div>

            {leadsError && (
              <div className="m-5 rounded-lg border border-destructive/30 bg-destructive/10 p-4">
                <p className="font-semibold text-destructive">
                  Could not load incoming requests.
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {leadsError}
                </p>
                <button
                  type="button"
                  onClick={fetchLeads}
                  className="mt-3 rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent"
                >
                  Retry
                </button>
              </div>
            )}
          </section>

          {renderRequestSection({
            title: "Leads table",
            description: "Callback and enquiry leads submitted from contact forms.",
            requests: displayedLeadRequests,
            total: leads.filter((lead) => (lead.source || "leads") === "leads")
              .length,
            fileLabel: "leads",
            emptyTitle: "No leads yet.",
            emptyText: "New callback and enquiry leads will appear here.",
          })}

          {renderRequestSection({
            title: "Eligibility table",
            description: "Detailed eligibility profiles submitted from country pages.",
            requests: displayedEligibilityRequests,
            total: leads.filter((lead) => lead.source === "eligibility").length,
            fileLabel: "eligibility",
            emptyTitle: "No eligibility profiles yet.",
            emptyText: "New eligibility profile submissions will appear here.",
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
