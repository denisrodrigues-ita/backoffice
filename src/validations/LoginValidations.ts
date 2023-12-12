import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface ValidationOptions {
  isRequiredName?: boolean;
  isRequiredEmail?: boolean;
  isRequiredLoginPassword?: boolean;
}

export const useFormValidations = ({
  isRequiredName = false,
  isRequiredEmail = false,
  isRequiredLoginPassword = false,
}: ValidationOptions) => {
  const validationSchema = Yup.object().shape({
    name: isFieldRequired(isRequiredName),
    email: isFieldRequired(isRequiredEmail).email("Email incorreto"),
    loginPassword: isFieldRequired(isRequiredLoginPassword),
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
