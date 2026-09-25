"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../ui/InputField";
import TextAreaField from "../ui/TextAreaField";
import { ConsultFormData, ConsultResponse, ConsultformProps } from "../types/consult";
import { EMAIL_REGEX } from "../constants/regex";
import { apiService } from "../services/apiService";

export default function Consultform({ className = "" }: ConsultformProps) {
  const {
    register,
    handleSubmit,
    reset,
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

  const onSubmit = async (data: ConsultFormData) => {
    try {
      const response = await apiService<ConsultResponse>(
        "/api/consult",
        "POST",
        data
      );

      if (!response.success) {
        const errorMsg =
          response.error ||
          "Unable to submit your consultation request. Please try again.";

        toast.error(errorMsg, {
          position: "top-right",
          autoClose: 5000,
        });

        if (response.errors?.email) {
          setError("email", { type: "server", message: response.errors.email });
        }
        return;
      }

      toast.success(
        response.message ||
          "Your consultation request has been submitted successfully! Our team will reach out shortly.",
        {
          position: "top-right",
          autoClose: 5000,
        }
      );

      reset();
    } catch (err: unknown) {
      console.error("Submission failed:", err);
      toast.error(
        "A network error occurred. Please check your connection and try again.",
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
    }
  };

  return (
    <div
      className={`w-full max-w-xl mx-auto rounded-2xl bg-white border border-[#E5DCEE] shadow-sm p-6 sm:p-8 text-left transition-all ${className}`}
    >
      <ToastContainer
        position="top-right"
        autoClose={4500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#392259] font-arimo tracking-tight">
          Consult Now
        </h2>
        <p className="text-sm text-[#756383] mt-1 font-inter">
          Talk to our IoT specialists to discuss your connectivity and modem architecture.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Name Field */}
        <InputField
          id="consult-name"
          type="text"
          label="Full Name *"
          placeholder="e.g. John Doe"
          disabled={isSubmitting}
          error={errors.name?.message}
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
        />

        {/* Email Field */}
        <InputField
          id="consult-email"
          type="email"
          label="Email Address *"
          placeholder="e.g. john@example.com"
          disabled={isSubmitting}
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: EMAIL_REGEX,
              message: "Please enter a valid email format",
            },
          })}
        />

        {/* Two Columns: Phone & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            id="consult-phone"
            type="tel"
            label="Phone Number"
            placeholder="e.g. +1 (555) 019-2834"
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

        {/* Message Field */}
        <TextAreaField
          id="consult-message"
          label="Project Details or Inquiry *"
          placeholder="Tell us about your IoT project, fleet size, or connectivity requirements..."
          disabled={isSubmitting}
          rows={4}
          error={errors.message?.message}
          {...register("message", {
            required: "Message is required",
            minLength: {
              value: 10,
              message: "Message must be at least 10 characters",
            },
          })}
        />

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#392259] px-6 py-3.5 text-base font-semibold text-[#E5DCEE] shadow-sm transition-all duration-300 hover:bg-[#4d2f78] hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#392259] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin text-white"
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
                <span>Submitting Request...</span>
              </>
            ) : (
              <>
                <span>Consult Now</span>
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
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
