import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps {
  label?: string;
  registration: Partial<UseFormRegisterReturn>;
  error?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  registration,
  error,
  onKeyDown,
}) => {
  return (
    <div>
      {label && (
        <label
          className="block text-sm font-medium text-gray-50 mb-1"
          htmlFor={registration.name}
        >
          {label}
        </label>
      )}
      <input
        type="text"
        className="bg-gray-700 mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm text-white"
        {...registration}
        onKeyDown={onKeyDown}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};
