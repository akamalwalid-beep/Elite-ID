import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        country: "USA",
        price: 15,
        currency: "USDT",
        rating: 5,
        featured: true,
        image: "/images/products/usa.png",
        description: "Premium USA Apple ID",
        stock: 100,
      },
      {
        country: "United Kingdom",
        price: 14,
        currency: "USDT",
        rating: 5,
        featured: false,
        image: "/images/products/uk.png",
        description: "Premium UK Apple ID",
        stock: 80,
      },
      {
        country: "Canada",
        price: 13,
        currency: "USDT",
        rating: 5,
        featured: false,
        image: "/images/products/canada.png",
        description: "Premium Canada Apple ID",
        stock: 75,
      },
      {
        country: "Turkey",
        price: 8,
        currency: "USDT",
        rating: 5,
        featured: false,
        image: "/images/products/turkey.png",
        description: "Premium Turkey Apple ID",
        stock: 120,
      },
    ],
  });

  console.log("✅ Products inserted.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });