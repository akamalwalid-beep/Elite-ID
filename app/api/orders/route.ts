import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (
      !body.customerName ||
      !body.customerEmail ||
      !body.paymentMethod ||
      !body.items ||
      !Array.isArray(body.items)
    ) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    const total = body.items.reduce(
      (sum: number, item: any) =>
        sum + Number(item.price) * Number(item.quantity),
      0
    );

    const order = await prisma.order.create({
      data: {
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        paymentMethod: body.paymentMethod,
        total,

        items: {
          create: body.items.map((item: any) => ({
            productId: item.productId,
            country: item.country,
            price: Number(item.price),
            quantity: Number(item.quantity),
          })),
        },
      },

      include: {
        items: true,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("ORDER API ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to create order",
      },
      {
        status: 500,
      }
    );
  }
}