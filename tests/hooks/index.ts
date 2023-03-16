import { PrismaClient } from "@prisma/client";
import login from "modules/suap/auth/lib/login";

export const truncateTables = async () => {
  const prisma = new PrismaClient();

  await prisma.token.deleteMany();
  await prisma.user.deleteMany();
};

export const getAuthorization = async () => {
  const data = await login(process.env.SUAP_USER!, process.env.SUAP_PASS!);
  return { Authorization: `Bearer ${data.token!.access_token}` };
};
