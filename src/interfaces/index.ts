export interface ToastProps extends StatusProps {
  setIsToastOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}

export interface StatusProps {
  status: "success" | "error" | "warning" | "info";
}

export interface DataGuestsProps {
  dataGuests: BackofficeProps[];
}

export interface BackofficeProps {
  active: boolean;
  attendance_status: boolean;
  code: string;
  created_at: string;
  engaged_id: number;
  id: number;
  message: string;
  name: string;
  update_at: string;
}
