import { UserProps } from "@/interfaces";

const initialState: UserProps = {
  token: "",
  user: {
    id: 0,
    groom_name: "",
    bride_name: "",
    email: "",
    active: false,
    role: "client",
    first_access: true,
    created_at: "",
    updated_at: "",
  },
};

export default initialState;
