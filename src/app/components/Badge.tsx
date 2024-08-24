type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  rounded?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-blue-200 text-blue-800",
  secondary: "bg-gray-200 text-gray-800",
  success: "bg-green-200 text-green-800",
  danger: "bg-red-200 text-red-800",
  warning: "bg-yellow-200 text-yellow-800",
  info: "bg-indigo-200 text-indigo-800",
};

export const Badge = ({
  text,
  variant = "primary",
  rounded = false,
}: BadgeProps) => {
  const baseClasses =
    "inline-flex items-center px-2.5 py-0.5 text-xs font-medium";
  const roundedClass = rounded ? "rounded-full" : "rounded";

  return (
    <span
      className={`${baseClasses} ${roundedClass} ${variantClasses[variant]}`}
    >
      {text}
    </span>
  );
};
