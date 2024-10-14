import prisma from "../../lib/db.js";
import paginateData from "../../lib/paginate.js";

export async function findAllUsers(query) {
  const { page, perPage } = query;

  const users = await prisma.User.findMany({
    select: {
      id: true,
      email: true,
      nickname: true,
      createdAt: true,
    },
  });

  return paginateData(users, Number(page), Number(perPage));
}
