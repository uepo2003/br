export const ROUTES = {
  ROOT: "/",
  SIGNUP: "/signup",
  LOGIN: "/login",
  LOGOUT: "/logout",
  ABOUT: "/about",
  POSTS: {
    INDEX: "/posts",
    NEW: "/posts/new",
    SHOW: "/posts/:postId",
    EDIT: "/posts/:postId/edit",
    LIKES: "/posts/:postId/likes",
  },
  USERS: {
    INDEX: "/users",
    SHOW: "/users/:userId",
    EDIT: "/users/:userId/edit",
    LIKES: "/users/:userId/likes",
  },
} as const;
