import User from "../models/User";
import { NotFoundError } from "../helpers/apiError";

const create = async (user: User): Promise<User> => {
  return user.save();
};

const findById = async (userId: number): Promise<User> => {
  const foundUser = await User.findByPk(userId);

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`);
  }

  return foundUser;
};

const findAll = async (): Promise<User[]> => {
  return User.findAll({
    attributes: { exclude: ["password"] },
    paranoid: false,
  });
};

const update = async (
  userId: string,
  update: Partial<User>
): Promise<User | null> => {
  const [count, foundUser] = await User.update(update, {
    where: {
      id: userId,
    },
    returning: true,
  });

  if (!count) {
    throw new NotFoundError(`User ${userId} not found`);
  }

  return foundUser[0];
};

const _delete = async (userId: number): Promise<number> => {
  const count = User.destroy({
    where: {
      id: userId,
    },
  });

  if (!count) {
    throw new NotFoundError(`User ${userId} not found`);
  }

  return count;
};

export default {
  create,
  findById,
  findAll,
  update,
  _delete,
};
