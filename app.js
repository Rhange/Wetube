import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { userRouter } from "./router";

const app = express();

//! Arrow function
const handleHome = (req, res) => res.send("Hello from home.");

//? Arrow function
const handleProfile = (req, res) => res.send("You are on my profile.");

//TODO middleware helmet, morgan, cookie-parser, body-parser(json, urlencoded)
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

const middleware = (req, res, next) => {
  res.send("not happening");
};

app.get("/", middleware, handleHome);

app.get("/profile", handleProfile);

app.use("/user", userRouter);

export default app;