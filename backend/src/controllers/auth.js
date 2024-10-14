import { createUser } from "../data/auth/createUser.js";
import { login } from "../data/auth/login.js";

export const authControllers = class {
  static async signup(request, reply, next) {
    try {
      const newUser = await createUser(request.body);

      return reply.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
  static async signin(request, reply, next) {
    try {
      const { email, password } = request.body;

      const user = await login(email, password);

      return reply.json(user);
    } catch (error) {
      next(error);
    }
  }
};
