import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("123456", 10);

  await prisma.admin.upsert({
    where: {
      username: "admin",
    },
    update: {
      passwordHash,
      name: "Owner",
      role: "OWNER",
    },
    create: {
      username: "admin",
      passwordHash,
      name: "Owner",
      role: "OWNER",
    },
  });

  console.log("Owner admin created");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });