import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

import "./passport";

const app = express();

// TODO middleware helmet, morgan, cookie-parser, body-parser(json, urlencoded)
app.use(helmet());

// ? PUG
app.set("view engine", "pug");

app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//! if there is no 'bodyParse' you can't get req.body information.
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);
//! locals 위에 있는 것은 locals에 접근 X

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
