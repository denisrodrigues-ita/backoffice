export interface DropdownItemProps {
  name: string;
  onClick: () => void;
}

export interface DropdownArrayProps {
  dropdownItems: DropdownItemProps[];
  translate: string;
}
