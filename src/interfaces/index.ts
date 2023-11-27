import { Id, ToastContent, ToastOptions } from "react-toastify";

export interface ModalProps {
  setPropsModal: React.Dispatch<
    React.SetStateAction<{
      guestName: string;
      attendanceStatus: boolean;
      code: string;
      changeOn: string;
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
  setPropsModal?: ModalProps;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  stylePropsInput?: string;
}

export interface SearchProps {
  search: string;
}

export interface childrenlProps {
  children?: React.ReactNode;
}

export interface UserProps {
  token: string | null;
  user: UserDataProps | null;
}

export interface UserDataProps {
  id: number;
  groom_name: string;
  bride_name: string;
  email: string;
  active: boolean;
  role: "admin" | "client";
  first_access: boolean;
  created_at: string;
  updated_at: string;
}

export interface AppState {
  user: UserProps | null;
  setUser: (user: UserProps) => void;
}

export interface ToastProps {
  toast: (content: ToastContent, options?: ToastOptions | undefined) => Id;
}

export interface CustomInputProps extends InputProps, childrenlProps {
  setPropsModal?: ModalProps;
  styleProps?: string;
}

export interface DropItems {
  name: string;
  onClick?: (guest?: any) => void;
  onChange?: () => void;
  checked?: boolean;
  type: "button" | "checkbox";
}

export interface DropProps {
  title: string;
  style: "btn1" | "btn2";
  guest?: BackofficeProps;
  dropItems: {
    name: string;
    onClick?: (guest?: BackofficeProps) => void;
    onChange?: () => void;
    checked?: boolean;
    type: "button" | "checkbox";
  }[];
}