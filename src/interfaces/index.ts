export interface ToastProps extends StatusProps {
  setIsToastOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}

export interface StatusProps {
  status: "success" | "error" | "warning" | "info";
}

export interface ModalProps {
  setPropsModal: React.Dispatch<
    React.SetStateAction<{
      isOpenModal: boolean;
      guestName: string;
      attendanceStatus: boolean;
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
  };
}
