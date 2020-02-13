import express from "express";
import routes from "../routes";

const videoRouter = express.Router();

globalRouter.get(routes.videos, (req, res) => res.send("Videos"));
globalRouter.get(routes.upload, (req, res) => res.send("Upload"));
globalRouter.get(routes.videoDetail, (req, res) => res.send("Video Detail"));
globalRouter.get(routes.editVideo, (req, res) => res.send("Edit Video"));
globalRouter.get(routes.deleteVideo, (req, res) => res.send("Delete Video"));

//? export const ~ 는 '변수'만 내놓는 것
//! export default는 '파일'을 내놓는 것
export default videoRouter;
