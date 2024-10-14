import prisma from "../../lib/db.js";

export async function createMessage(data) {
  const now = new Date();

  await prisma.Message.create({
    data: {
      text: data.text,
      chatId: data.chatId,
      userId: data.userId,
      published: true,
      createdAt: now,
      updatedAt: now,
    },
  });

  return {};
}
