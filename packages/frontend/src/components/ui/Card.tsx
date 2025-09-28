import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outlined";
}

export const Card = ({
  variant = "default",
  className = "",
  children,
  ...props
}: CardProps) => {
  const variants = {
    default: "bg-white shadow-md border border-gray-200",
    outlined: "border-2 border-gray-300 bg-white",
  };

  return (
    <div
      className={`rounded-lg p-4 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
