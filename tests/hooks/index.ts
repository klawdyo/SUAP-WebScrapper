import { PrismaClient } from "@prisma/client";

export const truncateTables = async () => {
  const prisma = new PrismaClient();

  await prisma.token.deleteMany();
  await prisma.user.deleteMany();
};
