export interface ConsultFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export interface Consultation {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  slot_time: string | null;
  event_id: string | null;
  meet_link: string | null;
  calendar_link: string | null;
  created_at: string;
}

export interface ConsultResponse {
  success: boolean;
  message?: string;
  data?: Consultation | Consultation[];
  error?: string;
  errors?: Record<string, string>;
  meetLink?: string | null;
  calendarLink?: string | null;
}

export interface SlotsResponse {
  success: boolean;
  slots?: string[];
  error?: string;
}

export interface ConsultformProps {
  className?: string;
}

export type FormErrors = {
  [K in keyof ConsultFormData]?: string;
};

export type FormTouched = {
  [K in keyof ConsultFormData]?: boolean;
};

/** Multi-step form state */
export type BookingStep = "form" | "slots" | "confirmed";
