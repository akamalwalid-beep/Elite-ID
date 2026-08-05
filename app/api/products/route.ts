import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        featured: "desc",
      },
    });

    return NextResponse.json(products);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch products.",
      },
      {
        status: 500,
      }
    );
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const title = body.title?.trim();

    if (!title) {
      return NextResponse.json(
        {
          message: "Product title is required.",
        },
        {
          status: 400,
        }
      );
    }


    let baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");


    let slug = baseSlug;

    let counter = 1;


    while (
      await prisma.product.findUnique({
        where: {
          slug,
        },
      })
    ) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }


    const product = await prisma.product.create({
      data: {
        title,

        slug,

        country: body.country || title,

        price: Number(body.price),

        currency: body.currency || "USDT",

        rating: Number(body.rating) || 5,

        image: body.image || "/images/products/apple.png",

        description: body.description || "",

        stock: Number(body.stock) || 0,

        featured: Boolean(body.featured),
      },
    });


    return NextResponse.json(product);


  } catch (error: any) {

    console.error(error);


    if (error.code === "P2002") {
      return NextResponse.json(
        {
          message: "Product already exists.",
        },
        {
          status: 400,
        }
      );
    }


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