import express from "express";
import routes from "../routes";

const userRouter = express.Router();

globalRouter.get(routes.users, (req, res) => res.send("Users"));
globalRouter.get(routes.userDetail, (req, res) => res.send("User Detail"));
globalRouter.get(routes.editProfile, (req, res) => res.send("Edit Profile"));
globalRouter.get(routes.changePassword, (req, res) =>
  res.send("Change Password")
);

export default userRouter;
