import React from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineWarning,
  AiOutlineInfoCircle,
  AiOutlineAlert,
} from "react-icons/ai";
import { ToastProps } from "@/interfaces";
import "animate.css";

const Toast: React.FC<ToastProps> = ({ message, status, setIsToastOpen }) => {
  const statusStyles = {
    success: {
      bg200: "bg-green-200",
      text800: "text-green-800",
      bg800: "bg-green-800",
      text200: "text-green-200",
    },
    error: {
      bg200: "bg-red-200",
      text800: "text-red-800",
      bg800: "bg-red-800",
      text200: "text-red-200",
    },
    warning: {
      bg200: "bg-yellow-200",
      text800: "text-yellow-800",
      bg800: "bg-yellow-800",
      text200: "text-yellow-200",
    },
    info: {
      bg200: "bg-blue-200",
      text800: "text-blue-800",
      bg800: "bg-blue-800",
      text200: "text-blue-200",
    },
  };

  const { bg200, text800, bg800, text200 } = statusStyles[status];

  return (
    <div
      id="toast-default"
      className={`absolute flex items-center w-full max-w-xs p-4 ${bg200} ${text800} rounded-lg shadow top-20 right-8 z-50 animate__animated animate__slideInRight`}
      role="alert"
    >
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${text200} ${bg800} rounded-lg`}
      >
        {status === "success" ? (
          <AiOutlineCheckCircle size={20} />
        ) : status === "warning" ? (
          <AiOutlineWarning size={20} />
        ) : status === "info" ? (
          <AiOutlineInfoCircle size={20} />
        ) : (
          <AiOutlineAlert size={20} />
        )}
        <span className="sr-only">check icon</span>
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className={`ml-auto -mx-1.5 -my-1.5 ${text800} focus:ring-2 focus:ring-white p-1.5 hover:opacity-60 inline-flex items-center justify-center h-8 w-8`}
        data-dismiss-target="#toast-default"
        aria-label="Close"
        onClick={() => setIsToastOpen(false)}
      >
        <span className="sr-only">Fechar</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
