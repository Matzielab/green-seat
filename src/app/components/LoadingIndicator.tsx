import React from "react";

interface LoadingIndicatorProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

export const LoadingIndicator = ({
  size = "medium",
  color = "text-emerald-400",
}: LoadingIndicatorProps) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} ${color} animate-spin rounded-full border-4 border-solid border-current border-r-transparent`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
