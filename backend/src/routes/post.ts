import express from "express";
import {body, validationResult} from "express-validator";
import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "@/models/post";
import {getPostLikedCount, hasUserLikedPost} from "@/models/like";
import {ensureAuthUser} from "@/middlewares/authentication";
import {ensureOwnerOfPost} from "@/middlewares/current_user";
export const postRouter = express.Router();

postRouter.get("/", ensureAuthUser, async (req, res) => {
  const postsWithUser = await getAllPosts();
  res.status(200).json({
    posts: postsWithUser,
  });
});

postRouter.get("/:postId", ensureAuthUser, async (req, res, next) => {
  const {postId} = req.params;
  const post = await getPost(Number(postId));
  if (!post || !post.id)
    return next(new Error("Invalid error: The post or post.id is undefined."));

  const currentUserId = req.currentUser?.id;
  if (currentUserId === undefined) {
    // `ensureAuthUser` enforces `currentUserId` is not undefined.
    // This must not happen.
    return next(new Error("Invalid error: currentUserId is undefined."));
  }
  const likeCount = await getPostLikedCount(post.id);
  const hasLiked = await hasUserLikedPost(currentUserId, post.id);
  res.status(200).json({
    post,
    likeCount,
    hasLiked,
  });
});

postRouter.post(
  "/",
  ensureAuthUser,
  body("content", "Content can't be blank").notEmpty(),
  async (req, res, next) => {
    const {content} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        post: {
          content,
        },
        errors: errors.array(),
      });
    }

    const currentUserId = req.currentUser?.id;
    if (currentUserId === undefined) {
      // `ensureAuthUser` enforces `currentUserId` is not undefined.
      // This must not happen.
      return next(new Error("Invalid error: currentUserId is undefined."));
    }
    const post = await createPost({content, userId: currentUserId});
    res.status(201).json({
      post: post,
      dialogMessage: "Post successfully created",
    });
  }
);

postRouter.patch(
  "/:postId",
  ensureAuthUser,
  ensureOwnerOfPost,
  body("content", "Content can't be blank").notEmpty(),
  async (req, res) => {
    const {content} = req.body;
    const {postId} = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    const post = await updatePost(Number(postId), content);
    res.status(200).json({message: "Post successfully updated", post});
  }
);

postRouter.delete(
  "/:postId",
  ensureAuthUser,
  ensureOwnerOfPost,
  async (req, res) => {
    const {postId} = req.params;
    const post = await deletePost(Number(postId));
    res.status(200).json({message: "Post successfully deleted", post});
  }
);
