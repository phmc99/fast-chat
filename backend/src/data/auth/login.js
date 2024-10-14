import bcrypt from "bcryptjs";
import { AppError } from "../../middlewares/error.js";
import { encode } from "../../lib/jwt.js";

function validatePassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

export async function login(email, password) {
  const user = await prisma.User.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new AppError("Usuário não encontrado", 404);
  }

  if (!validatePassword(user, password)) {
    throw new AppError("E-mail ou senha inválidos", 401);
  }

  delete user.password;

  return {
    user,
    token: encode({
      user,
    }),
  };
}
