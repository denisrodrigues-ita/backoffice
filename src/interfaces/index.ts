export interface ToastProps extends StatusProps {
  setIsToastOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}

export interface StatusProps {
  status: "success" | "error" | "warning" | "info";
}
