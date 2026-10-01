"use client";

import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import InputField from "../ui/InputField";
import TextAreaField from "../ui/TextAreaField";
import {
  ConsultFormData,
  ConsultResponse,
  ConsultformProps,
  SlotsResponse,
  BookingStep,
} from "../types/consult";
import { EMAIL_REGEX } from "../constants/regex";
import { apiService } from "../services/apiService";


function formatSlot(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(new Date(iso));
}

function getTodayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

// ── Inline status banner ──────────────────────────────────────────────────────

function StatusBanner({
  type,
  message,
}: {
  type: "error" | "success" | "info";
  message: string;
}) {
  const styles = {
    error: "bg-red-50 border-red-300 text-red-700",
    success: "bg-green-50 border-green-300 text-green-700",
    info: "bg-blue-50 border-blue-300 text-blue-700",
  };
  const icons = {
    error: "✕",
    success: "✓",
    info: "ℹ",
  };
  return (
    <div
      role="alert"
      className={`flex items-start gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-all ${styles[type]}`}
    >
      <span className="mt-0.5 font-bold shrink-0">{icons[type]}</span>
      <span>{message}</span>
    </div>
  );
}

// ── Step indicator ────────────────────────────────────────────────────────────

function StepDots({ step }: { step: BookingStep }) {
  const steps: BookingStep[] = ["form", "slots", "confirmed"];
  const labels = ["Details", "Time Slot", "Confirmed"];
  const current = steps.indexOf(step);
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                i < current
                  ? "bg-[#392259] text-white"
                  : i === current
                  ? "bg-[#6B53AE] text-white ring-2 ring-[#6B53AE] ring-offset-2"
                  : "bg-[#E5DCEE] text-[#9E90AA]"
              }`}
            >
              {i < current ? "✓" : i + 1}
            </div>
            <span
              className={`text-[10px] font-medium ${
                i === current ? "text-[#392259]" : "text-[#9E90AA]"
              }`}
            >
              {labels[i]}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-px w-8 mb-4 transition-all duration-300 ${
                i < current ? "bg-[#392259]" : "bg-[#E5DCEE]"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Consultform({ className = "" }: ConsultformProps) {
  const [step, setStep] = useState<BookingStep>("form");
  const [statusError, setStatusError] = useState<string | null>(null);
  const [statusInfo, setStatusInfo] = useState<string | null>(null);

  // Slot picker state
  const [selectedDate, setSelectedDate] = useState(getTodayISO());
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsLoaded, setSlotsLoaded] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [slotError, setSlotError] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  // Confirmation state
  const [meetLink, setMeetLink] = useState<string | null>(null);
  const [calendarLink, setCalendarLink] = useState<string | null>(null);
  const [confirmedSlot, setConfirmedSlot] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ConsultFormData>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  // ── Step 1: Form submit → go to slot picker ─────────────────────────────
  const onFormSubmit = async (data: ConsultFormData) => {
    setStatusError(null);
    setStatusInfo(null);

    setStep("slots");
    loadSlots(selectedDate);
    void data;
  };

  // ── Step 2: Load available slots for a date ─────────────────────────────
  const loadSlots = useCallback(async (date: string) => {
    setSlotsLoading(true);
    setSlotsLoaded(false);
    setSlots([]);
    setSelectedSlot(null);
    setSlotError(null);
    setStatusError(null);

    try {
      const res = await apiService<SlotsResponse>(
        `/api/consult/slots?date=${date}`,
        "GET"
      );
      if (!res.success) {
        setStatusError(res.error || "Failed to load slots.");
      } else {
        setSlots(res.slots || []);
        setSlotsLoaded(true);
        if ((res.slots || []).length === 0) {
          setStatusInfo("No slots available on this day. Try another date.");
        }
      }
    } catch {
      setStatusError("Network error while loading slots. Please try again.");
    } finally {
      setSlotsLoading(false);
    }
  }, []);

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    setSlotsLoaded(false);
    setSlots([]);
    setSelectedSlot(null);
    setStatusError(null);
    setStatusInfo(null);
  };

  const onLoadSlots = () => {
    loadSlots(selectedDate);
  };

  // ── Step 3: Confirm booking ─────────────────────────────────────────────
  const onConfirmBooking = async () => {
    if (!selectedSlot) {
      setSlotError("Please select a time slot to continue.");
      return;
    }
    setSlotError(null);
    setStatusError(null);
    setIsBooking(true);

    const formData = getValues();

    try {
      const res = await apiService<ConsultResponse>("/api/consult", "POST", {
        ...formData,
        slotTime: selectedSlot,
      });

      if (!res.success) {
        const msg =
          res.error || "Failed to confirm your booking. Please try again.";
        setStatusError(msg);
        if (res.errors?.email) {
          setError("email", { type: "server", message: res.errors.email });
        }
        return;
      }

      setMeetLink(res.data && "meet_link" in res.data ? (res.data as { meet_link?: string | null }).meet_link ?? null : null);
      setCalendarLink(res.data && "calendar_link" in res.data ? (res.data as { calendar_link?: string | null }).calendar_link ?? null : null);
      setConfirmedSlot(selectedSlot);
      setStep("confirmed");
    } catch {
      setStatusError(
        "A network error occurred. Please check your connection and try again."
      );
    } finally {
      setIsBooking(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <div
      className={`w-full max-w-xl mx-auto rounded-2xl bg-white border border-[#E5DCEE] shadow-sm p-6 sm:p-8 text-left transition-all ${className}`}
    >
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#392259] font-arimo tracking-tight">
          {step === "confirmed" ? "Booking Confirmed" : "Book a Consultation"}
        </h2>
        <p className="text-sm text-[#756383] mt-1 font-inter">
          {step === "form" &&
            "Fill in your details to get started."}
          {step === "slots" &&
            "Choose a convenient time slot for your session."}
          {step === "confirmed" &&
            "Your consultation has been booked. Check your email for details."}
        </p>
      </div>

      {/* Step dots */}
      {step !== "confirmed" && <StepDots step={step} />}

      {/* ── STEP 1: Contact Form ─────────────────────────────────────────── */}
      {step === "form" && (
        <form onSubmit={handleSubmit(onFormSubmit)} noValidate className="space-y-4">
          {statusError && <StatusBanner type="error" message={statusError} />}

          <InputField
            id="consult-name"
            type="text"
            label="Full Name *"
            placeholder="e.g. John Doe"
            disabled={isSubmitting}
            error={errors.name?.message}
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" },
            })}
          />

          <InputField
            id="consult-email"
            type="email"
            label="Email Address *"
            placeholder="e.g. john@example.com"
            disabled={isSubmitting}
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: { value: EMAIL_REGEX, message: "Please enter a valid email" },
            })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              id="consult-phone"
              type="tel"
              label="Phone Number"
              placeholder="e.g. +91 98765 43210"
              disabled={isSubmitting}
              error={errors.phone?.message}
              {...register("phone")}
            />
            <InputField
              id="consult-company"
              type="text"
              label="Company (Optional)"
              placeholder="e.g. Acme Corp"
              disabled={isSubmitting}
              error={errors.company?.message}
              {...register("company")}
            />
          </div>

          <TextAreaField
            id="consult-message"
            label="Project Details or Inquiry *"
            placeholder="Tell us about your IoT project, fleet size, or connectivity requirements..."
            disabled={isSubmitting}
            rows={4}
            error={errors.message?.message}
            {...register("message", {
              required: "Message is required",
              minLength: { value: 10, message: "Message must be at least 10 characters" },
            })}
          />

          <div className="pt-2">
            <button
              id="consult-next-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#392259] px-6 py-3.5 text-base font-semibold text-[#E5DCEE] shadow-sm transition-all duration-300 hover:bg-[#4d2f78] hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#392259] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <SpinnerIcon />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Next: Choose Time Slot</span>
                  <ArrowIcon />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* ── STEP 2: Slot Picker ──────────────────────────────────────────── */}
      {step === "slots" && (
        <div className="space-y-5">
          {statusError && <StatusBanner type="error" message={statusError} />}
          {statusInfo && !statusError && (
            <StatusBanner type="info" message={statusInfo} />
          )}
          {slotError && <StatusBanner type="error" message={slotError} />}

          {/* Date picker */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="slot-date"
              className="text-sm font-medium text-[#28242F]"
            >
              Select Date
            </label>
            <div className="flex gap-2">
              <input
                id="slot-date"
                type="date"
                value={selectedDate}
                min={getTodayISO()}
                onChange={onDateChange}
                className="flex-1 rounded-md border border-[#D9CDE3] px-3 py-2 text-sm text-[#28242F] outline-none focus:border-[#392259] focus:ring-1 focus:ring-[#392259] bg-white"
              />
              <button
                id="load-slots-btn"
                type="button"
                onClick={onLoadSlots}
                disabled={slotsLoading}
                className="px-4 py-2 rounded-md bg-[#392259] text-white text-sm font-semibold hover:bg-[#4d2f78] transition-colors disabled:opacity-60 cursor-pointer"
              >
                {slotsLoading ? "Loading..." : "Check"}
              </button>
            </div>
          </div>

          {/* Slots grid */}
          {slotsLoading && (
            <div className="flex items-center justify-center py-8 gap-3 text-[#756383]">
              <SpinnerIcon className="w-5 h-5" />
              <span className="text-sm">Checking availability...</span>
            </div>
          )}

          {slotsLoaded && slots.length > 0 && (
            <>
              <p className="text-xs text-[#9E90AA] -mb-2">
                All times shown in IST (Asia/Kolkata) · {slots.length} slot
                {slots.length !== 1 ? "s" : ""} available
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-52 overflow-y-auto pr-1">
                {slots.map((iso) => (
                  <button
                    key={iso}
                    id={`slot-${iso}`}
                    type="button"
                    onClick={() => {
                      setSelectedSlot(iso);
                      setSlotError(null);
                    }}
                    className={`rounded-lg border px-3 py-2.5 text-xs font-semibold text-center transition-all duration-200 cursor-pointer ${
                      selectedSlot === iso
                        ? "border-[#392259] bg-[#392259] text-white shadow-md"
                        : "border-[#D9CDE3] bg-white text-[#392259] hover:border-[#6B53AE] hover:bg-[#F5F0FA]"
                    }`}
                  >
                    {new Intl.DateTimeFormat("en-IN", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "Asia/Kolkata",
                    }).format(new Date(iso))}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Selected slot summary */}
          {selectedSlot && (
            <div className="rounded-lg bg-[#F5F0FA] border border-[#D9CDE3] px-4 py-3 text-sm text-[#392259]">
              <span className="font-semibold">Selected: </span>
              {formatSlot(selectedSlot)}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              id="slot-back-btn"
              type="button"
              onClick={() => {
                setStep("form");
                setStatusError(null);
                setSlotError(null);
              }}
              className="flex-1 rounded-lg border border-[#D9CDE3] px-4 py-3 text-sm font-semibold text-[#392259] hover:bg-[#F5F0FA] transition-colors cursor-pointer"
            >
              ← Back
            </button>
            <button
              id="confirm-booking-btn"
              type="button"
              onClick={onConfirmBooking}
              disabled={isBooking || !selectedSlot}
              className="flex-[2] flex items-center justify-center gap-2 rounded-lg bg-[#392259] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#4d2f78] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#392259] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isBooking ? (
                <>
                  <SpinnerIcon />
                  <span>Booking...</span>
                </>
              ) : (
                <>
                  <span>Confirm Booking</span>
                  <ArrowIcon />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: Confirmation ─────────────────────────────────────────── */}
      {step === "confirmed" && (
        <div className="space-y-5">
          {/* Success animation */}
          <div className="flex flex-col items-center py-4 gap-3">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <StatusBanner
              type="success"
              message="Your consultation is booked! A confirmation email with the calendar invite has been sent to your inbox."
            />
          </div>

          {/* Booking summary */}
          <div className="rounded-xl border border-[#E5DCEE] bg-[#F5F0FA] p-4 space-y-3">
            <h3 className="text-sm font-semibold text-[#392259]">
              Booking Summary
            </h3>
            {confirmedSlot && (
              <div className="flex gap-2 text-sm">
                <span className="text-[#756383] w-20 shrink-0">Date/Time</span>
                <span className="text-[#28242F] font-medium">
                  {formatSlot(confirmedSlot)}
                </span>
              </div>
            )}
            <div className="flex gap-2 text-sm">
              <span className="text-[#756383] w-20 shrink-0">Name</span>
              <span className="text-[#28242F] font-medium">
                {getValues("name")}
              </span>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="text-[#756383] w-20 shrink-0">Email</span>
              <span className="text-[#28242F] font-medium">
                {getValues("email")}
              </span>
            </div>
          </div>

          {/* Meet link */}
          {meetLink && (
            <a
              id="join-meet-link"
              href={meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#1558b0] hover:shadow-md"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.53 11.06L15.47 10l-4.88 4.88-2.12-2.12-1.06 1.06L10.59 17l5.94-5.94zM19 3h-1V1h-2v2H8V1H6v2H5C3.89 3 3.01 3.9 3.01 5L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
              </svg>
              Join Google Meet
            </a>
          )}

          {calendarLink && (
            <a
              id="view-calendar-link"
              href={calendarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-lg border border-[#392259] px-6 py-3 text-sm font-semibold text-[#392259] hover:bg-[#F5F0FA] transition-colors"
            >
              View Calendar Event →
            </a>
          )}

          {!meetLink && (
            <StatusBanner
              type="info"
              message="The Google Meet link will be sent to your email once our team confirms the event."
            />
          )}
        </div>
      )}
    </div>
  );
}

// ── Shared icon components ────────────────────────────────────────────────────

function SpinnerIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={`${className} animate-spin text-current`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );
}
