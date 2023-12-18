import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface ValidationOptions {
  isRequiredName?: boolean;
  isRequiredEmail?: boolean;
  isRequiredLoginPassword?: boolean;
  isRequiredPassword?: boolean;
  isRequiredConfirmPassword?: boolean;
  isRequiredGroomName?: boolean;
  isRequiredBrideName?: boolean;
  isRequiredGuestName?: boolean;
  isRequiredNewName?: boolean;
  isRequiredNewPassword?: boolean;
  isRequiredNewConfirmPassword?: boolean;
}

export const useFormValidations = ({
  isRequiredName = false,
  isRequiredEmail = false,
  isRequiredLoginPassword = false,
  isRequiredPassword = false,
  isRequiredConfirmPassword = false,
  isRequiredGroomName = false,
  isRequiredBrideName = false,
  isRequiredGuestName = false,
  isRequiredNewName = false,
  isRequiredNewPassword = false,
  isRequiredNewConfirmPassword = false,
}: ValidationOptions) => {
  const validationSchema = Yup.object().shape({
    name: isFieldRequired(isRequiredName),
    email: isFieldRequired(isRequiredEmail).email("Email incorreto"),
    loginPassword: isFieldRequired(isRequiredLoginPassword),
    password: isFieldRequired(isRequiredPassword).min(6, "Mínimo de 6 dígitos"),
    confirmPassword: isFieldRequired(isRequiredConfirmPassword).oneOf(
      [Yup.ref("password"), null],
      "Senhas não coincidem"
    ),
    groomName: isFieldRequired(isRequiredGroomName),
    brideName: isFieldRequired(isRequiredBrideName),
    guestName: isFieldRequired(isRequiredGuestName),
    newName: isFieldRequired(isRequiredNewName),
    newPassword: isFieldRequired(isRequiredNewPassword).min(
      6,
      "Mínimo de 6 dígitos"
    ),
    newConfirmPassword: isFieldRequired(isRequiredNewConfirmPassword).oneOf(
      [Yup.ref("newPassword"), null],
      "Senhas não coincidem"
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return {
    register,
    handleSubmit,
    errors,
    reset,
  };
};

const isFieldRequired = (isRequired: boolean) =>
  isRequired
    ? Yup.string().required("Campo obrigatório")
    : Yup.string().notRequired();
