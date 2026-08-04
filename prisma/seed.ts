import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // =====================
  // Create Admins
  // =====================

  const admins = [
    {
      username: "admin",
      password: "EliteAdmin123!",
      name: "Owner",
      role: "OWNER",
    },
    {
      username: "admin2",
      password: "AdminTwo123!",
      name: "Admin Two",
      role: "ADMIN",
    },
    {
      username: "admin3",
      password: "AdminThree123!",
      name: "Admin Three",
      role: "ADMIN",
    },
  ];

  for (const admin of admins) {
    const passwordHash = await bcrypt.hash(admin.password, 10);

    await prisma.admin.upsert({
      where: {
        username: admin.username,
      },
      update: {},
      create: {
        username: admin.username,
        passwordHash,
        name: admin.name,
        role: admin.role,
      },
    });
  }


  // =====================
  // Create Products
  // =====================

  await prisma.product.createMany({
    data: [
      {
        title: "USA Apple ID",
        slug: "usa-apple-id",
        country: "USA",
        price: 15,
        currency: "USDT",
        rating: 4.8,
        featured: true,
        image: "/images/products/apple.png",
        description:
          "Premium USA Apple ID ready for instant delivery.",
        stock: 100,
        views: 0,
      },

      {
        title: "UK Apple ID",
        slug: "uk-apple-id",
        country: "United Kingdom",
        price: 20,
        currency: "USDT",
        rating: 4.7,
        featured: false,
        image: "/images/products/apple.png",
        description:
          "Premium UK Apple ID.",
        stock: 80,
        views: 0,
      },
    ],
    skipDuplicates: true,
  });


  console.log("Seed completed successfully ✅");
}


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });