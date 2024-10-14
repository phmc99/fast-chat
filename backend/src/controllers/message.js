import { findByChatId } from "../data/message/findByChatId.js";
import { createMessage } from "../data/message/createMessage.js";
import { AppError } from "../middlewares/error.js";

export const messageControllers = class {
  static async postMessage(request, reply, next) {
    try {
      request.body.userId = request.loggedUser.id;
      createMessage(request.body);

      return reply.status(201).json({});
    } catch (error) {
      next(error);
    }
  }
  static async getMessageByChat(request, reply, next) {
    try {
      const { chatId } = request.params;
      const { page, perPage } = request.query;

      if (!chatId) {
        throw new AppError("'chatId' é uma propriedade obrigatória", 400);
      }

      const messages = await findByChatId(chatId, page, perPage);

      return reply.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  }
};
