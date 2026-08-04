import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: {
      featured: "desc",
    },
  });

  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const title = `${body.country} Apple ID`;

    const slug = title
      .toLowerCase()
      .replace(/\s+/g, "-");

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        country: body.country,
        price: body.price,
        currency: body.currency,
        rating: body.rating,
        image: body.image,
        description: body.description,
        stock: body.stock,
        featured: body.featured,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create product.",
      },
      {
        status: 500,
      }
    );
  }
}