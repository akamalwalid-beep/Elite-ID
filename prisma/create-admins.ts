import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const admins = [
    {
      username: "nader",
      password: "Nader123!",
      name: "Nader",
    },
    {
      username: "tokyo",
      password: "Tokyo123!",
      name: "Tokyo",
    },
  ];

  for (const admin of admins) {
    const passwordHash = await bcrypt.hash(admin.password, 10);

    await prisma.admin.upsert({
      where: {
        username: admin.username,
      },
      update: {
        passwordHash,
        name: admin.name,
      },
      create: {
        username: admin.username,
        passwordHash,
        name: admin.name,
        role: "ADMIN",
      },
    });
  }

  console.log("Admins created successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });