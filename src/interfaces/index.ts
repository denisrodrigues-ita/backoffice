export interface ToastProps extends StatusProps {
  setIsToastOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}

export interface StatusProps {
  status: "success" | "error" | "warning" | "info";
}

export interface ModalProps {
  setPropsModal?: React.Dispatch<
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

export interface InputProps extends ModalProps {
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

export interface LabelProps {
  children?: React.ReactNode;
}

export interface UserProps {
  token: string;
  user: UserDataProps;
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

export interface CustomInputProps extends InputProps, LabelProps, ModalProps {
  styleProps?: string;
}
