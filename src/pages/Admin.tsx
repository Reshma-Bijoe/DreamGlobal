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
  CheckCircle2,
  Clock3,
  KeyRound,
  Loader2,
  LockKeyhole,
  LogOut,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { supabase } from "../../supabaseClient";

type LeadStatus = "Accepted" | "Rejected" | "Pending";

type Lead = {
  id: number;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  status?: LeadStatus | string | null;
  created_at?: string | null;
};

const getLeadStatus = (status?: string | null): LeadStatus => {
  if (status === "Accepted" || status === "Rejected") return status;
  return "Pending";
};

const statusStyles: Record<LeadStatus, string> = {
  Accepted: "border-emerald-200 bg-emerald-50 text-emerald-700",
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
  const [actionLeadId, setActionLeadId] = useState<number | null>(null);

  const fetchLeads = useCallback(async () => {
    setFetchingLeads(true);
    setLeadsError("");
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching leads:", error);
      setLeadsError(error.message);
    } else {
      setLeads(data || []);
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

  const stats = useMemo(() => {
    const base = { total: leads.length, pending: 0, accepted: 0, rejected: 0 };

    leads.forEach((lead) => {
      const status = getLeadStatus(lead.status);
      if (status === "Accepted") base.accepted += 1;
      if (status === "Rejected") base.rejected += 1;
      if (status === "Pending") base.pending += 1;
    });

    return base;
  }, [leads]);

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

  const handleUpdateStatus = async (id: number, newStatus: LeadStatus) => {
    setActionLeadId(id);
    const { error } = await supabase
      .from("leads")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      alert("Error updating status: " + error.message);
    } else {
      setLeads((currentLeads) =>
        currentLeads.map((lead) =>
          lead.id === id ? { ...lead, status: newStatus } : lead
        )
      );
    }

    setActionLeadId(null);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this request entirely?"
    );
    if (!confirmed) return;

    setActionLeadId(id);
    const { error } = await supabase.from("leads").delete().eq("id", id);

    if (error) {
      alert("Error deleting request: " + error.message);
    } else {
      setLeads((currentLeads) =>
        currentLeads.filter((lead) => lead.id !== id)
      );
    }

    setActionLeadId(null);
  };

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
                  ["Decide", "Accept or reject instantly"],
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
                Review new student enquiries and update each request status for
                the counselling team.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
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

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              { label: "Total", value: stats.total, Icon: ShieldCheck },
              { label: "Pending", value: stats.pending, Icon: Clock3 },
              { label: "Accepted", value: stats.accepted, Icon: CheckCircle2 },
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
                  Student requests
                </h2>
                <p className="text-sm text-muted-foreground">
                  Accept or reject each incoming request after review.
                </p>
              </div>

              {fetchingLeads && (
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Loader2 size={16} className="animate-spin" />
                  Loading requests
                </div>
              )}
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
                  {leads.map((lead) => {
                    const status = getLeadStatus(lead.status);
                    const busy = actionLeadId === lead.id;

                    return (
                      <tr
                        key={lead.id}
                        className="border-t border-border transition hover:bg-muted/40"
                      >
                        <td className="px-5 py-4">
                          <p className="font-semibold text-foreground">
                            {lead.name || "Unnamed student"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Request #{lead.id}
                          </p>
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
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() =>
                                handleUpdateStatus(lead.id, "Accepted")
                              }
                              disabled={busy}
                              className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
                            >
                              <CheckCircle2 size={15} />
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleUpdateStatus(lead.id, "Rejected")
                              }
                              disabled={busy}
                              className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white transition hover:bg-accent disabled:opacity-60"
                            >
                              <XCircle size={15} />
                              Reject
                            </button>
                            <button
                              onClick={() => handleDelete(lead.id)}
                              disabled={busy}
                              className="rounded-md border border-destructive/30 px-3 py-2 text-sm font-semibold text-destructive transition hover:bg-destructive/10 disabled:opacity-60"
                            >
                              Delete
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
              {leads.map((lead) => {
                const status = getLeadStatus(lead.status);
                const busy = actionLeadId === lead.id;

                return (
                  <article
                    key={lead.id}
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

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleUpdateStatus(lead.id, "Accepted")}
                        disabled={busy}
                        className="inline-flex items-center justify-center gap-1.5 rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white"
                      >
                        <CheckCircle2 size={15} />
                        Accept
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(lead.id, "Rejected")}
                        disabled={busy}
                        className="inline-flex items-center justify-center gap-1.5 rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white"
                      >
                        <XCircle size={15} />
                        Reject
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        disabled={busy}
                        className="col-span-2 rounded-md border border-destructive/30 px-3 py-2 text-sm font-semibold text-destructive"
                      >
                        Delete request
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {!fetchingLeads && leads.length === 0 && (
              <div className="px-5 py-14 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock3 size={24} />
                </div>
                <h3 className="mt-4 font-heading text-2xl font-semibold text-foreground">
                  No incoming requests yet.
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  New student requests will appear here as soon as they are
                  submitted.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
