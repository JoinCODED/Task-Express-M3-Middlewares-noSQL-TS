import express from "express";
import connectDB from "./database";
import postsRoutes from "./api/posts/posts.routes";
import cors from "cors";
import morgan from "morgan";
import { NotFoundHandler } from "./api/posts/middlewares/NotFound";
import { ErrorHandler } from "./api/posts/middlewares/ErrorHandler";
import path from "path";
import { validatePost } from "./api/posts/middlewares/validatePost";
export const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use("/posts", postsRoutes);

app.use(NotFoundHandler);
app.use(ErrorHandler);
