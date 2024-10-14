import bcrypt from "bcryptjs";

import prisma from "../../lib/db.js";
import { AppError } from "../../middlewares/error.js";
import { encode } from "../../lib/jwt.js";

export async function createUser(data) {
  const now = new Date();

  const user = await prisma.User.findFirst({
    where: {
      OR: [{ email: data.email }, { nickname: data.nickname }],
    },
  });

  if (user) {
    if (user.email === data.email) {
      throw new AppError("E-mail já registrado", 400);
    } else if (user.nickname === data.nickname) {
      throw new AppError("Apelido já registrado", 400);
    }
  }

  const newUser = await prisma.User.create({
    data: {
      email: data.email,
      nickname: data.nickname,
      password: bcrypt.hashSync(data.password, 8),
      createdAt: now,
      updatedAt: now,
    },
  });

  delete newUser.password;

  return {
    user: newUser,
    token: encode({
      user: newUser,
    }),
  };
}
