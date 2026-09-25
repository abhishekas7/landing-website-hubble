import React, { forwardRef, TextareaHTMLAttributes } from "react";

export interface TextAreaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 text-left">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[#28242F]">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={id}
          {...props}
          className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition-all duration-200 resize-y min-h-[110px] text-[#28242F] placeholder:text-[#9E90AA] ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20"
              : "border-[#D9CDE3] focus:border-[#392259] focus:ring-1 focus:ring-[#392259] bg-white"
          } ${className}`}
          aria-invalid={!!error}
        />

        {error && (
          <span className="text-xs text-red-600 font-medium">
            {error}
          </span>
        )}
      </div>
    );
  }
);

TextAreaField.displayName = "TextAreaField";

export default TextAreaField;
