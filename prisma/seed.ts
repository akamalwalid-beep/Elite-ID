import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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
        description: "Premium USA Apple ID ready for instant delivery.",
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
        description: "Premium UK Apple ID.",
        stock: 80,
        views: 0,
      },
    ],
  });
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