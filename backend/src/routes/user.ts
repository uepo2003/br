import express, {RequestHandler} from "express";
import {join} from "node:path";
import multer from "multer";
import {nanoid} from "nanoid";
import {
  getAllUsers,
  getUserLikes,
  updateUserProfile,
  getUserPosts,
  getUser,
} from "@/models/user";
import {ensureAuthUser} from "@/middlewares/authentication";
import {ensureCorrectUser} from "@/middlewares/current_user";
import {body, validationResult} from "express-validator";

export const userRouter = express.Router();

/** A page to list all users */
userRouter.get("/", ensureAuthUser, async (req, res) => {
  const users = await getAllUsers();
  res.status(200).json({
    users,
  });
});

userRouter.get("/:userId", ensureAuthUser, async (req, res, next) => {
  const {userId} = req.params;
  const user = await getUser(Number(userId));
  if (!user) return next(new Error("Invalid error: The user is undefined."));
  res.status(200).json({
    user,
  });
});

userRouter.get("/:userId/posts", ensureAuthUser, async (req, res) => {
  const {userId} = req.params;
  const posts = await getUserPosts(Number(userId));
  res.status(200).json({
    posts,
  });
});

userRouter.get("/:userId/likes", ensureAuthUser, async (req, res) => {
  const {userId} = req.params;
  const posts = await getUserLikes(Number(userId));
  res.status(200).json({
    posts,
  });
});

const storage = multer.diskStorage({
  destination: join("public", "image", "users"),
  filename: (req, file, cb) => {
    const outFileName = `${nanoid()}.${file.mimetype.split("/")[1]}`;
    cb(null, outFileName);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ACCEPTABLE_SUBTYPES = ["png", "jpeg"] as const;
    type AcceptableSubtype = (typeof ACCEPTABLE_SUBTYPES)[number];
    const toAcceptableImageMediaType = (
      fullMimeType: string
    ): ["image", AcceptableSubtype] | null => {
      const isAcceptableSubtype = (
        subtype: string
      ): subtype is AcceptableSubtype => {
        return (ACCEPTABLE_SUBTYPES as readonly string[]).includes(subtype);
      };
      const [mediaType, mediaSubtype] = fullMimeType.split("/");
      if (!mediaType || !mediaSubtype) return null;
      if (mediaType !== "image") return null;
      if (!isAcceptableSubtype(mediaSubtype)) return null;
      return ["image", mediaSubtype];
    };
    const mediaType = toAcceptableImageMediaType(file.mimetype);
    if (mediaType === null)
      return cb(
        new Error("Only image files in png or jpeg format can be uploaded")
      );
    cb(null, true);
  },
});

const uploadHandler: RequestHandler = (req, res, next) => {
  const name = "image";
  upload.single(name)(req, res, err => {
    if (err instanceof Error) {
      req.uploadError = {
        type: "field",
        path: "image",
        msg: err.message,
        location: "body",
        value: req.file,
      };
    }
    next();
  });
};
/** An endpoint to update a user */
userRouter.patch(
  "/:userId",
  ensureAuthUser,
  ensureCorrectUser,
  uploadHandler,
  body("name", "Name can't be blank").notEmpty(),
  body("email", "Email can't be blank").notEmpty(),
  async (req, res) => {
    const {userId} = req.params;
    const {name, email} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty() || req.uploadError) {
      const validationErrors = errors.array();
      if (req.uploadError) {
        validationErrors.push(req.uploadError);
      }
      return res.status(422).json({
        errors: validationErrors,
      });
    }
    await updateUserProfile(Number(userId), {
      name,
      email,
      imageName: req.file ? req.file.path.replace("public", "") : undefined,
    });
    res.status(200).json({
      message: "Your account has been updated successfully",
    });
  }
);
