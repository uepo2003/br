import {RequestHandler} from "express";

import {getUserByEmail, getUserByEmailWithPassword} from "@/models/user";
import {CustomValidator} from "express-validator";
import {HashPassword} from "@/lib/hash_password";
import {AUTH_COOKIE_NAME} from "@/constants";
import jwt from "jsonwebtoken";

export const isUniqueEmail: CustomValidator = async (email: string) => {
  const user = await getUserByEmail(email);
  if (user) {
    throw new Error("Email has already been taken");
  }
};

export const isMatchEmailAndPassword: CustomValidator = async (_, {req}) => {
  const {email, password} = req.body;
  if (!email || !password) return;
  const user = await getUserByEmailWithPassword(email);
  const match =
    user &&
    user.password &&
    (await new HashPassword().compare(password, user.password));
  if (!match) {
    throw new Error("Invalid email/password combination");
  }
};

export const forbidAuthUser: RequestHandler = (req, res, next) => {
  if (req.currentUser) {
    res.status(403).json({
      message: "You are already logged in",
    });
  } else {
    next();
  }
};

export const ensureAuthUser: RequestHandler = (req, res, next) => {
  if (req.currentUser) {
    return next();
  }
  const token: string = req.cookies[AUTH_COOKIE_NAME];
  try {
    jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
  } catch (error) {
    return res.status(401).json({message: "Token has expired or is invalid"});
  }
  return res.status(401).json({message: "You must be logged in"});
};
