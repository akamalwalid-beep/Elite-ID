// D:\Elite-ID\frontend\app\api\orders\route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type OrderItemInput = {
  productId: number;
  country: string;
  price: number;
  quantity: number;
};

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error: any) {
    console.error("GET ORDERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Failed to fetch orders.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (
      !body.telegram ||
      !body.whatsapp ||
      !body.paymentMethod ||
      !Array.isArray(body.items) ||
      body.items.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        {
          status: 400,
        }
      );
    }

    const items: OrderItemInput[] =
      body.items.map(
        (item: OrderItemInput) => ({
          productId: Number(item.productId),
          country: String(item.country),
          price: Number(item.price),
          quantity: Number(item.quantity),
        })
      );

    const invalidItem = items.some(
      (item) =>
        !Number.isInteger(item.productId) ||
        item.productId <= 0 ||
        !Number.isFinite(item.price) ||
        item.price <= 0 ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
    );

    if (invalidItem) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order items.",
        },
        {
          status: 400,
        }
      );
    }

    const total = items.reduce(
      (sum, item) =>
        sum +
        item.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        telegram: String(body.telegram),
        whatsapp: String(body.whatsapp),
        paymentMethod: String(
          body.paymentMethod
        ),

        total,

        status: "Pending",

        items: {
          create: items.map((item) => ({
            productId: item.productId,
            country: item.country,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },

      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        order,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.error("ORDER API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Failed to create order.",
      },
      {
        status: 500,
      }
    );
  }
}