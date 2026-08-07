import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


type OrderItemInput = {
  productId: number;
  country: string;
  price: number;
  quantity: number;
};



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
          message: "Invalid request body",
        },
        {
          status: 400,
        }
      );

    }




    const items: OrderItemInput[] = body.items.map(
      (item: OrderItemInput) => ({

        productId: Number(item.productId),

        country: String(item.country),

        price: Number(item.price),

        quantity: Number(item.quantity),

      })
    );






    const invalidItem = items.some(
      (item) =>
        !item.productId ||
        item.price <= 0 ||
        item.quantity <= 0
    );




    if (invalidItem) {

      return NextResponse.json(
        {
          message: "Invalid order items",
        },
        {
          status: 400,
        }
      );

    }






    const total = items.reduce(

      (sum, item) =>
        sum +
        item.price *
        item.quantity,

      0

    );







    const order = await prisma.order.create({

      data: {

        telegram: body.telegram,

        whatsapp: body.whatsapp,

        paymentMethod: body.paymentMethod,

        total,

        items: {

          create: items.map((item) => ({

            productId: item.productId,

            country: item.country,

            price: item.price,

            quantity: item.quantity,

          }))

        }

      },


      include: {

        items: true

      }

    });







    return NextResponse.json(

      order,

      {
        status: 201,
      }

    );



  } catch (error) {


    console.error(
      "ORDER API ERROR:",
      error
    );



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