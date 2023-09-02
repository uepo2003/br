declare namespace Express {
  export interface Request {
    uploadError?: import("express-validator").ValidationError;
    currentUser: import("@/models/user").UserWithoutPassword | null;
  }
}
