import express from "express";
import {body, validationResult} from "express-validator";
import {
  forbidAuthUser,
  isMatchEmailAndPassword,
  ensureAuthUser,
  isUniqueEmail,
} from "@/middlewares/authentication";
import {createUser, getUser, getUserByEmailWithPassword} from "@/models/user";

import {AUTH_COOKIE_NAME} from "@/constants";
import jwt from "jsonwebtoken";
import {HashPassword} from "@/lib/hash_password";

export const authRouter = express.Router();

/** An endpoint to log in */
authRouter.post(
  "/login",
  forbidAuthUser,
  body("email", "Email can't be blank").notEmpty(),
  body("password", "Password can't be blank").notEmpty(),
  body("custom").custom(isMatchEmailAndPassword),
  async (req, res, next) => {
    const {email, password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        email,
        password,
        errors: errors.array(),
      });
    }
    const user = await getUserByEmailWithPassword(email);
    if (!user) return next(new Error("Invalid error: The user is undefined."));

    const token = jwt.sign({id: user.id}, process.env.AUTH_TOKEN_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.cookie(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: "strict",
    });

    res.status(200).json({
      user: user,
      dialogMessage: "You have logged in successfully",
    });
  }
);

/** An endpoint to create a new user */
authRouter.post(
  "/signup",
  forbidAuthUser,
  body("name", "Name can't be blank").notEmpty(),
  body("email", "Email can't be blank").notEmpty(),
  body("password", "Password can't be blank").notEmpty(),
  body("email").custom(isUniqueEmail),
  async (req, res) => {
    const {name, email, password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    const hashPassword = await new HashPassword().generate(password);
    const user = await createUser({name, email, password: hashPassword});

    const token = jwt.sign({id: user.id}, process.env.AUTH_TOKEN_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.cookie(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: "strict",
    });

    res.status(201).json({
      user,
      message: "You have signed up successfully",
    });
  }
);

authRouter.get("/me", async (req, res) => {
  const token = req.cookies[AUTH_COOKIE_NAME];
  if (!token) {
    return res.status(200).json({message: "Not authenticated"});
  }
  try {
    const decoded = jwt.verify(token, process.env.AUTH_TOKEN_SECRET) as {
      id: number;
    };
    const user = await getUser(decoded.id);
    return res.status(200).json({user});
  } catch (error) {
    return res.status(200).json({message: "Not authenticated"});
  }
});

/** An endpoint to log out */
authRouter.delete("/logout", ensureAuthUser, (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME);
  res.status(200).json({dialogMessage: "You have logged out successfully"});
});
