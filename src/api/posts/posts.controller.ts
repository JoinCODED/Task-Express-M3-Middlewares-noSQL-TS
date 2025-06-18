import Post from "../../models/Post";
import { NextFunction, Request, Response } from "express";

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, body } = req.body;
    let imagePath;
    console.log("image from file", req.file);
    if (req.file) {
      imagePath = req.file.path;
    }

    const post = await Post.create({ title, body, image: imagePath });
    console.log("Mongodb create");
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    let imagePath;
    if (req.file) {
      imagePath = req.file.path;
    }
    const foundPost = await Post.findById(id);
    if (!foundPost) {
      res.status(404).json({ message: "Post not found" });
    } else {
      await foundPost.updateOne(req.body, { image: imagePath });
      res.json({ message: "Post updated successfully" });
    }
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};
