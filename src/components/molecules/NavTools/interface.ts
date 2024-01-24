import { DropItems } from "@/interfaces";
import { toast } from "react-toastify";

export interface NavToolsProps {
  toast: typeof toast;
  handlePrint: () => void;
  dropItems: DropItems[];
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
