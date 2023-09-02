import { User } from "@/types";

export type UserResponse = {
  user: User;
};

export type UserRegisterFormData = {
  email: string;
  password: string;
  name: string;
};
