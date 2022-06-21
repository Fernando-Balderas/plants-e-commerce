import { Request, Response, NextFunction } from "express";

import User from "../models/User";
import userService from "../services/user";
import { BadRequestError } from "../helpers/apiError";
import { toHash } from "../util/hashing";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, lastname, email, password, role } = req.body;
    const hashedPassword = await toHash(password);
    const user = User.build({
      name,
      lastname,
      email,
      password: hashedPassword,
      role,
    });
    await userService.create(user);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else if (
      error instanceof Error &&
      error.name == "SequelizeUniqueConstraintError"
    ) {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const update = req.body;
    const userId = req.params.userId;
    const updatedUser = await userService.update(userId, update);
    res.json(updatedUser);
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

const _delete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    await userService._delete(parseInt(userId));
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await userService.findById(parseInt(userId));
    user.password = undefined;
    res.json(user);
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await userService.findAll();
    res.json(results);
  } catch (error) {
    if (error instanceof Error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", error));
    } else {
      next(error);
    }
  }
};

export default {
  create,
  update,
  _delete,
  findById,
  findAll,
};
