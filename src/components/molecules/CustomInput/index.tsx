// import React from "react";
// import { CustomInputProps } from "@/interfaces";
// import { Input, Label } from "@/components/atoms";

// const CustomInput: React.FC<CustomInputProps> = ({
//   type,
//   value,
//   onChange,
//   placeholder,
//   children,
//   onClick,
//   styleProps,
//   stylePropsInput,
// }) => {
//   return (
//     <div
//       className={`print:hidden flex justify-between items-center 
//     border-2 border-blue-light-50 dark:border-gray-dark rounded-lg w-full ${
//       styleProps && styleProps
//     }`}
//     >
//       <Label>
//         <Input
//           type={type}
//           value={value}
//           onChange={(e) => onChange(e)}
//           placeholder={placeholder}
//           variant="search"
//           onClick={() => {
//             onClick && onClick();
//           }}
//           stylePropsInput={stylePropsInput}
//         />
//       </Label>
//       {children}
//     </div>
//   );
// };

// export default CustomInput;
