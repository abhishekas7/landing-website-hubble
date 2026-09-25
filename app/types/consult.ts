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
  created_at: string;
}

export interface ConsultResponse {
  success: boolean;
  message?: string;
  data?: Consultation | Consultation[];
  error?: string;
  errors?: Record<string, string>;
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
