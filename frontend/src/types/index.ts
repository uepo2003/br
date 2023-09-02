import { FieldValidationError } from "express-validator";

export type User = {
  id: number;
  email: string;
  name: string;
  imageName: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PostUser = {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
};

export type FormValidationErrors = FieldValidationError[];
