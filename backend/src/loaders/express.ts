import express, {Express} from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import logger from "morgan";
import {userRouter} from "@/routes/user";
import {authRouter} from "@/routes/auth";
import {postRouter} from "@/routes/post";
import {likeRouter} from "@/routes/like";
import {currentUserMiddleware} from "@/middlewares/current_user";

export const loadMiddlewaresForTweetApp = (app: Express): void => {
  loadSecureHeaders(app);
  loadLogger(app);
  loadStatic(app);
  loadBodyParser(app);
  loadCookieParser(app);
  loadUser(app);
  loadRouter(app);
};

const loadLogger = (app: Express): void => {
  app.use(logger("dev"));
};

const loadStatic = (app: Express): void => {
  app.use(express.static("public"));
};

const loadBodyParser = (app: Express): void => {
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
};

const loadCookieParser = (app: Express): void => {
  app.use(cookieParser());
};

/**
 * Pass login information to view
 * null is passed when user is not logged in
 */
const loadUser = (app: Express): void => {
  app.use(currentUserMiddleware);
};

const loadRouter = (app: Express): void => {
  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);
  app.use("/api/posts", postRouter, likeRouter);
};

const loadSecureHeaders = (app: Express): void => {
  app.use(helmet());
  if (app.get("env") === "development" || app.get("env") === "test") {
    // Setting upgradeInsecureRequests to null in development/test environment
    // since safari redirects to https even on localhost and the page cannot be displayed.
    app.use(
      helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
          upgradeInsecureRequests: null,
        },
      })
    );
  }
};
