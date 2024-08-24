import React, { ButtonHTMLAttributes } from "react";
import { LoadingIndicator } from "app/components/LoadingIndicator";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  isLoading = false,
  variant = "primary",
  fullWidth = false,
  type = "button",
  className = "",
  ...props
}) => {
  const baseClasses =
    "py-2 px-4 rounded transition duration-300 disabled:opacity-50";
  const widthClass = fullWidth ? "w-full" : "";

  const variantClasses = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline:
      "bg-transparent text-emerald-600 border border-emerald-600 hover:bg-emerald-50",
  };

  const buttonClasses = `${baseClasses} ${widthClass} ${variantClasses[variant]} ${className}`;

  return (
    <button
      type={type}
      disabled={isLoading}
      className={buttonClasses}
      {...props}
    >
      {isLoading ? <LoadingIndicator size="small" color="white" /> : text}
    </button>
  );
};
