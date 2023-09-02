import {RequestHandler} from "express";
import {getUser} from "@/models/user";
import {getPost} from "@/models/post";
import {AUTH_COOKIE_NAME} from "@/constants";
import jwt from "jsonwebtoken";
/**
 * If logged in, set the user information to currentUser.
 * If not logged in, set null.
 */
export const currentUserMiddleware: RequestHandler = async (req, res, next) => {
  const token: string = req.cookies[AUTH_COOKIE_NAME];
  if (!token) {
    req.currentUser = null;
    return next();
  }
  try {
    const decode = jwt.verify(token, process.env.AUTH_TOKEN_SECRET) as {
      id: number;
    };
    req.currentUser = await getUser(decode.id);
  } catch (error) {
    req.currentUser = null;
  }
  next();
};

export const ensureCorrectUser: RequestHandler = async (req, res, next) => {
  if (req.currentUser === null || req.currentUser === undefined) {
    next();
    return;
  }
  const {userId} = req.params;
  if (req.currentUser.id === Number(userId)) {
    next();
  } else {
    res.status(403).json({
      dialogMessage: "You are not authorized to access this resource",
    });
  }
};

export const ensureOwnerOfPost: RequestHandler = async (req, res, next) => {
  const {postId} = req.params;
  const post = await getPost(Number(postId));
  const owner = await post?.user;
  if (owner && owner.id === req.currentUser?.id) {
    next();
  } else {
    res.status(403).json({
      dialogMessage: "You are not authorized to access this resource",
    });
  }
};
