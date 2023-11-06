import { Id, ToastContent, ToastOptions } from "react-toastify";

export interface ModalProps {
  setPropsModal: React.Dispatch<
    React.SetStateAction<{
      isOpenModal: boolean;
      guestName: string;
      attendanceStatus: boolean;
      code: string;
      changeOn: string;
      dropdownIndex: number;
    }>
  >;
}

export interface DataGuestsProps {
  dataGuests: {
    guests: BackofficeProps[];
    totalGuests: number;
    attendanceCount: number;
  };
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

export interface ModalChangeStatusProps {
  propsModal: {
    isOpenModal: boolean;
    guestName: string;
    attendanceStatus: boolean;
    code: string;
    changeOn: string;
    dropdownIndex: number;
  };
}

export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type: "button" | "submit" | "reset" | undefined;
  style: "btn1" | "btn2";
}

export interface InputProps {
  type: string;
  value: string;
  placeholder: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export interface SearchProps {
  search: string;
}

export interface LabelProps {
  children: React.ReactNode;
}

export interface ToastProps {
  toast: (content: ToastContent, options?: ToastOptions | undefined) => Id;
}
