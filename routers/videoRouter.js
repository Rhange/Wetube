import express from "express";
import routes from "../routes";
import {
  getUpload,
  postUpload,
  videoDetail,
  deleteVideo,
  getEditVideo,
  postEditVideo
} from "../controllers/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

//* Upload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

//* Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

//* Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

//* Delete Video
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

// ? export const ~ 는 '변수'만 내놓는 것
//! export default는 '파일'을 내놓는 것
export default videoRouter;
