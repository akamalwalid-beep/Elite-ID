import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const slug = body.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        title: body.title,
        slug,
        country: body.title,
        price: Number(body.price),
        currency: body.currency,
        rating: Number(body.rating),
        stock: Number(body.stock),
        image: body.image,
        description: body.description,
        featured: Boolean(body.featured),
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to update product.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}