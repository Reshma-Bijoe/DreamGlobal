import { supabase } from "../../supabaseClient";

export type ConsultationNotification = {
  name: string;
  age: string;
  grade: string;
  location: string;
  phone: string;
  email: string;
  interest?: string;
  remarks: string;
  preferredDate: string;
  preferredTime: string;
};

export const notifyAdminOfConsultation = async (
  consultation: ConsultationNotification
) => {
  const { error } = await supabase.functions.invoke(
    "notify-admin-consultation",
    {
      body: {
        name: consultation.name.trim(),
        age: consultation.age.trim(),
        grade: consultation.grade.trim(),
        location: consultation.location.trim(),
        phone: consultation.phone.trim(),
        email: consultation.email.trim(),
        interest: consultation.interest?.trim() || "Book consultation",
        remarks: consultation.remarks.trim(),
        preferredDate: consultation.preferredDate,
        preferredTime: consultation.preferredTime,
      },
    }
  );

  if (error) {
    console.error("Admin notification failed:", error);
    return false;
  }

  return true;
};
