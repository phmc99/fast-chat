import { findAllUsers } from "../data/user/findAllUsers.js";

export const userControllers = class {
  static async getUsers(request, reply, next) {
    try {
      const users = await findAllUsers(request.query);

      return reply.status(200).json(users);
    } catch (error) {
      next(error, request, reply);
    }
  }
};
