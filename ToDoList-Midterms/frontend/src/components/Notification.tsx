import type React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
interface NotificationProps {
  message: string;
  type: "info" | "warning" | "error";
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type,
}) => {
  const bgColor =
    type === "warning"
      ? "text-red-600 font-medium"
      : type === "info"
      ? "bg-blue-100 text-blue-800"
      : "bg-red-100 text-red-800";

  const icon =
    type === "warning" ? (
      <ExclamationCircleIcon />
    ) : type === "info" ? (
      "ℹ️"
    ) : (
      "❌"
    );

  return (
    <div
      className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${bgColor}`}
    >
      <span className="text-base">{icon}</span>
      <span>{message}</span>
    </div>
  );
};
