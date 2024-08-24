import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
  label: string;
  registration: Partial<UseFormRegisterReturn>;
  error?: string;
  placeholder?: string;
  rows?: number;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  registration,
  error,
  placeholder = "",
  rows = 4,
}) => {
  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-50 mb-1"
        htmlFor={registration.name}
      >
        {label}
      </label>
      <textarea
        {...registration}
        rows={rows}
        className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm bg-gray-700 text-white"
        placeholder={placeholder}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};
