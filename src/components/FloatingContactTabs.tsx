import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { CalendarClock, Mail, MessageCircle, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import {
  consultationInterestOptions,
  WHATSAPP_URL,
} from "@/lib/careerCounsellingData";
import { notifyAdminOfConsultation } from "@/lib/consultationNotifications";

type ActiveTab = "call" | "callback" | "email" | null;
type FormErrors = {
  name?: string;
  age?: string;
  grade?: string;
  location?: string;
  phone?: string;
  email?: string;
};

type CallbackForm = {
  name: string;
  age: string;
  grade: string;
  location: string;
  phone: string;
  email: string;
  interest: string;
  preferredDate: string;
  preferredTime: string;
  remarks: string;
};

const phoneNumber = "+91 88486 74757";
const phoneHref = "tel:+918848674757";
const email = "dreamglobalin@gmail.com";
const emailComposeHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9\s-]+$/;

const initialCallbackForm: CallbackForm = {
  name: "",
  age: "",
  grade: "",
  location: "",
  phone: "",
  email: "",
  interest: consultationInterestOptions[0],
  preferredDate: "",
  preferredTime: "",
  remarks: "",
};

const callbackFieldClass =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-primary";

const tabs = [
  {
    id: "call" as const,
    label: "Call",
    icon: Phone,
    className: "bg-secondary text-white",
  },
  {
    id: "callback" as const,
    label: "Callback",
    icon: CalendarClock,
    className: "gold-gradient-bg text-primary-foreground",
  },
  {
    id: "email" as const,
    label: "Email",
    icon: Mail,
    className: "bg-white text-secondary border border-border",
  },
];

const panelVariants = {
  hidden: {
    opacity: 0,
    x: 46,
    y: "-50%",
    scale: 0.82,
    rotateY: -18,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    y: "-50%",
    scale: 1,
    rotateY: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 430,
      damping: 25,
      mass: 0.8,
      when: "beforeChildren",
      staggerChildren: 0.045,
    },
  },
  exit: {
    opacity: 0,
    x: 42,
    y: "-50%",
    scale: 0.86,
    rotateY: -14,
    filter: "blur(7px)",
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 420, damping: 28 },
  },
};

const FloatingContactTabs = () => {
  const location = useLocation();
  const contactTabsRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);
  const [callbackForm, setCallbackForm] = useState<CallbackForm>(
    initialCallbackForm
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);
  const connectorOffset = activeTabIndex >= 0 ? activeTabIndex - 1 : 0;

  useEffect(() => {
    setActiveTab(null);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (!activeTab) {
      return;
    }

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (
        contactTabsRef.current &&
        !contactTabsRef.current.contains(event.target as Node)
      ) {
        setActiveTab(null);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
    };
  }, [activeTab]);

  const updateCallbackField =
    (field: keyof CallbackForm) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setCallbackForm((current) => ({ ...current, [field]: event.target.value }));
      setFormErrors((current) => ({ ...current, [field]: undefined }));
      setSubmitMessage("");
    };

  const validateForm = () => {
    const nextErrors: FormErrors = {};
    const fullName = callbackForm.name.trim();
    const ageValue = callbackForm.age.trim();
    const gradeValue = callbackForm.grade.trim();
    const locationValue = callbackForm.location.trim();
    const phoneNumber = callbackForm.phone.trim();
    const emailAddress = callbackForm.email.trim();

    if (!fullName) {
      nextErrors.name = "Please enter your full name.";
    }

    if (!ageValue) {
      nextErrors.age = "Please enter the student's age.";
    } else {
      const age = Number(ageValue);
      if (!Number.isInteger(age) || age < 5 || age > 80) {
        nextErrors.age = "Please enter a valid age.";
      }
    }

    if (!gradeValue) {
      nextErrors.grade = "Please enter grade or class.";
    }

    if (!locationValue) {
      nextErrors.location = "Please enter your location.";
    }

    if (!phoneNumber) {
      nextErrors.phone = "Please enter your phone number.";
    } else if (!phonePattern.test(phoneNumber)) {
      nextErrors.phone = "Please enter a valid phone number.";
    } else if (phoneNumber.replace(/\D/g, "").length !== 10) {
      nextErrors.phone = "Phone number must be 10 digits.";
    }

    if (!emailAddress) {
      nextErrors.email = "Please enter your email address.";
    } else if (!emailPattern.test(emailAddress)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitCallback = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const normalizedPhone = callbackForm.phone.replace(/\D/g, "");

    const { error } = await supabase.from("leads").insert({
      name: callbackForm.name.trim(),
      phone: normalizedPhone,
      email: callbackForm.email.trim(),
      interest: [
        "Floating callback",
        `Interest: ${callbackForm.interest}`,
        `Age: ${callbackForm.age.trim()}`,
        `Grade/Class: ${callbackForm.grade.trim()}`,
        `Location: ${callbackForm.location.trim()}`,
        `Remarks: ${callbackForm.remarks.trim() || "Not shared"}`,
        `Preferred schedule: ${callbackForm.preferredDate || "Flexible date"} ${
          callbackForm.preferredTime || "Flexible time"
        }`,
      ].join(" | "),
    });

    if (error) {
      setIsSubmitting(false);
      setSubmitMessage("Sorry, we could not send this right now.");
      console.error("Callback request failed:", error);
      return;
    }

    await notifyAdminOfConsultation({
      ...callbackForm,
      phone: normalizedPhone,
    });

    setIsSubmitting(false);
    setCallbackForm(initialCallbackForm);
    setSubmitMessage("Request sent. We will call you soon.");
  };

  const sendCallbackViaWhatsApp = () => {
    setSubmitMessage("");

    if (!validateForm()) {
      return;
    }

    const whatsappText = encodeURIComponent(
      [
        "DreamGlobal callback request",
        `Name: ${callbackForm.name}`,
        `Age: ${callbackForm.age}`,
        `Grade/Class: ${callbackForm.grade}`,
        `Location: ${callbackForm.location}`,
        `Phone: ${callbackForm.phone.replace(/\D/g, "") || callbackForm.phone}`,
        `Email: ${callbackForm.email}`,
        `Interest: ${callbackForm.interest}`,
        `Remarks: ${callbackForm.remarks || "Not shared"}`,
        `Preferred Date: ${callbackForm.preferredDate || "Flexible"}`,
        `Preferred Time: ${callbackForm.preferredTime || "Flexible"}`,
      ].join("\n")
    );

    window.location.href = `${WHATSAPP_URL}?text=${whatsappText}`;
  };

  return (
    <>
      <div
        ref={contactTabsRef}
        className="fixed right-0 top-[58%] z-50 -translate-y-1/2 sm:top-1/2"
      >
        <AnimatePresence>
          {activeTab && (
            <motion.div
              key={activeTab}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                transformOrigin: "right center",
                transformPerspective: 900,
              }}
              className="absolute right-full top-1/2 mr-3 max-h-[calc(100vh-2rem)] w-[calc(100vw-4.5rem)] max-w-96 overflow-y-auto rounded-lg border border-white/60 bg-card/95 p-4 text-card-foreground shadow-2xl shadow-secondary/20 backdrop-blur-md sm:p-5"
          >
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 24 }}
              style={{
                top: `calc(50% + ${connectorOffset} * clamp(48px, 8vw, 56px))`,
              }}
              className="absolute -right-2 h-4 w-4 -translate-y-1/2 rotate-45 border-r border-t border-white/60 bg-card/95"
            />

            <motion.div
              variants={contentVariants}
              className="mb-4 flex items-start justify-between gap-3"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  DreamGlobal
                </p>
                <h2 className="font-heading text-xl font-semibold">
                  {activeTab === "call" && "Call Us"}
                  {activeTab === "callback" && "Request Callback"}
                  {activeTab === "email" && "Email Us"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab(null)}
                className="rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                aria-label="Close contact panel"
              >
                <X size={18} />
              </button>
            </motion.div>

            {activeTab === "call" && (
              <motion.div variants={contentVariants} className="space-y-4">
                <p className="text-sm leading-6 text-muted-foreground">
                  Speak directly with our counselling team.
                </p>
                <a
                  href={phoneHref}
                  className="flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-3 text-sm font-semibold text-white transition hover:bg-secondary/90"
                >
                  <Phone size={16} />
                  {phoneNumber}
                </a>
              </motion.div>
            )}

            {activeTab === "callback" && (
              <motion.form
                variants={contentVariants}
                onSubmit={submitCallback}
                className="space-y-3"
              >
                <input
                  id="callback-full-name"
                  name="name"
                  value={callbackForm.name}
                  onChange={updateCallbackField("name")}
                  className={callbackFieldClass}
                  placeholder="Full name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={Boolean(formErrors.name)}
                />
                {formErrors.name && (
                  <p className="text-xs leading-4 text-destructive">
                    {formErrors.name}
                  </p>
                )}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <input
                      id="callback-age"
                      name="age"
                      value={callbackForm.age}
                      onChange={updateCallbackField("age")}
                      className={callbackFieldClass}
                      placeholder="Age"
                      type="number"
                      min="5"
                      max="80"
                      aria-invalid={Boolean(formErrors.age)}
                    />
                    {formErrors.age && (
                      <p className="mt-1 text-xs leading-4 text-destructive">
                        {formErrors.age}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      id="callback-grade"
                      name="grade"
                      value={callbackForm.grade}
                      onChange={updateCallbackField("grade")}
                      className={callbackFieldClass}
                      placeholder="Grade/Class"
                      type="text"
                      aria-invalid={Boolean(formErrors.grade)}
                    />
                    {formErrors.grade && (
                      <p className="mt-1 text-xs leading-4 text-destructive">
                        {formErrors.grade}
                      </p>
                    )}
                  </div>
                </div>
                <input
                  id="callback-location"
                  name="location"
                  value={callbackForm.location}
                  onChange={updateCallbackField("location")}
                  className={callbackFieldClass}
                  placeholder="Location"
                  type="text"
                  aria-invalid={Boolean(formErrors.location)}
                />
                {formErrors.location && (
                  <p className="text-xs leading-4 text-destructive">
                    {formErrors.location}
                  </p>
                )}
                <input
                  id="callback-phone"
                  name="phone"
                  value={callbackForm.phone}
                  onChange={updateCallbackField("phone")}
                  className={callbackFieldClass}
                  placeholder="Phone number"
                  type="tel"
                  autoComplete="tel"
                  aria-invalid={Boolean(formErrors.phone)}
                />
                {formErrors.phone && (
                  <p className="text-xs leading-4 text-destructive">
                    {formErrors.phone}
                  </p>
                )}
                <input
                  id="callback-email"
                  name="email"
                  value={callbackForm.email}
                  onChange={updateCallbackField("email")}
                  className={callbackFieldClass}
                  placeholder="Email address"
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(formErrors.email)}
                />
                {formErrors.email && (
                  <p className="text-xs leading-4 text-destructive">
                    {formErrors.email}
                  </p>
                )}
                <select
                  id="callback-interest"
                  name="interest"
                  value={callbackForm.interest}
                  onChange={updateCallbackField("interest")}
                  className={callbackFieldClass}
                >
                  {consultationInterestOptions.map((interest) => (
                    <option key={interest} value={interest}>
                      {interest}
                    </option>
                  ))}
                </select>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    id="callback-date"
                    name="preferredDate"
                    value={callbackForm.preferredDate}
                    onChange={updateCallbackField("preferredDate")}
                    className={callbackFieldClass}
                    type="date"
                  />
                  <input
                    id="callback-time"
                    name="preferredTime"
                    value={callbackForm.preferredTime}
                    onChange={updateCallbackField("preferredTime")}
                    className={callbackFieldClass}
                    type="time"
                  />
                </div>
                <textarea
                  id="callback-remarks"
                  name="remarks"
                  value={callbackForm.remarks}
                  onChange={updateCallbackField("remarks")}
                  className={`${callbackFieldClass} min-h-20 resize-y`}
                  placeholder="Tell us about yourself"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-md gold-gradient-bg px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  {isSubmitting ? "Sending..." : "Send Request"}
                </button>
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <span className="h-px flex-1 bg-border" />
                  or
                  <span className="h-px flex-1 bg-border" />
                </div>
                <button
                  type="button"
                  onClick={sendCallbackViaWhatsApp}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-green-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
                >
                  <MessageCircle size={16} />
                  Send in WhatsApp
                </button>
                {submitMessage && (
                  <p className="text-sm leading-5 text-muted-foreground">
                    {submitMessage}
                  </p>
                )}
              </motion.form>
            )}

            {activeTab === "email" && (
              <motion.div variants={contentVariants} className="space-y-4">
                <p className="break-words text-sm leading-6 text-muted-foreground">
                  Send your questions or documents to {email}.
                </p>
                <a
                  href={emailComposeHref}
                  className="flex items-center justify-center gap-2 rounded-md border border-primary px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                  <Mail size={16} />
                  Open Email
                </a>
              </motion.div>
            )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col overflow-hidden rounded-l-lg shadow-xl shadow-secondary/20">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <motion.button
                key={tab.id}
                type="button"
                onClick={() =>
                  setActiveTab((current) =>
                    current === tab.id ? null : tab.id
                  )
                }
                className={`flex h-9 w-8 items-center justify-center transition hover:brightness-105 sm:h-14 sm:w-12 ${
                  activeTab === tab.id ? "brightness-110" : ""
                } ${tab.className}`}
                aria-label={tab.label}
                title={tab.label}
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.92 }}
                animate={{
                  x: activeTab === tab.id ? -6 : 0,
                }}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
              >
                <motion.span
                  animate={{
                    scale: activeTab === tab.id ? 1.18 : 1,
                    rotate: activeTab === tab.id ? [0, -8, 8, 0] : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 18,
                  }}
                >
                  <Icon size={20} aria-hidden="true" />
                </motion.span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FloatingContactTabs;
