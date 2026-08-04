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

    const title = body.title;

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        country: title,
        price: Number(body.price),
        currency: body.currency,
        rating: Number(body.rating),
        image: body.image,
        description: body.description,
        stock: Number(body.stock),
        featured: Boolean(body.featured),
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