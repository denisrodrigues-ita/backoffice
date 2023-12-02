export interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    buttonRef?: React.RefObject<HTMLButtonElement>;
    type: "button" | "submit" | "reset" | undefined;
    style: "btn1" | "btn2" | "btnSVG";
    isLoading?: boolean;
  }