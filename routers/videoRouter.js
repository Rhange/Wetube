import express from "express";
import routes from "../routes";
import {
  upload,
  videoDetail,
  editVideo,
  deleteVideo
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.upload, upload);
videoRouter.get(routes.deleteVideo, deleteVideo);
videoRouter.get(routes.videoDetail, videoDetail);

//? export const ~ 는 '변수'만 내놓는 것
//! export default는 '파일'을 내놓는 것
export default videoRouter;
