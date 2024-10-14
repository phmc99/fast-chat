import prisma from "../../lib/db.js";
import paginateData from "../../lib/paginate.js";

export async function findByChatId(chatId, page, perPage) {
  const messages = await prisma.Message.findMany({
    where: {
      chatId,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          nickname: true,
        },
      },
    },
  });

  // return paginateData(messages, Number(page), Number(perPage));
  return messages;
}
