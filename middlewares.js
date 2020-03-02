import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
  // TODO res.locals.variables_name = "variables_value";
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  next();
  //! middlewares are between codes so to next to the function.
};

export const uploadVideo = multerVideo.single("videoFile");
