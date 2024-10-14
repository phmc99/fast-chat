import { PrismaClient } from "@prisma/client";

let prisma;

if (!global.prisma) {
  global.prisma = new PrismaClient({
    log: ["query"],
  });
}

prisma = global.prisma;

prisma.$on("query", async (e) => {
  console.log(`${e.query} ${e.params}`);
});

export default prisma;
