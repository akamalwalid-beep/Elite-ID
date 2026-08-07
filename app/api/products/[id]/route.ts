import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await params;

    const body = await request.json();



    const slug =
      body.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        + `-${id}`;





    const product = await prisma.product.update({

      where: {
        id: Number(id),
      },


      data: {

        title: body.title,

        slug,


        country:
          body.country ||
          body.title,



        price:
          Number(body.price),



        currency:
          body.currency ||
          "USDT",



        rating:
          Number(body.rating) || 5,



        stock:
          Number(body.stock),



        image:
          body.image ||
          "/images/products/apple.png",



        description:
          body.description || "",



        featured:
          Boolean(body.featured),



        topRated:
          Boolean(body.topRated),



        bestSeller:
          Boolean(body.bestSeller),



        rare:
          Boolean(body.rare),



        features:
          body.features || [],

      },

    });



    return NextResponse.json(product);



  } catch(error) {


    console.error(
      "UPDATE PRODUCT ERROR:",
      error
    );


    return NextResponse.json(

      {
        message:"Failed to update product.",
      },

      {
        status:500,
      }

    );


  }

}









export async function DELETE(

  request: Request,

  { params }: { params: Promise<{ id:string }> }

){


  try{


    const { id } = await params;

    const productId = Number(id);



    // حذف الطلبات المرتبطة بالمنتج أولاً
    await prisma.orderItem.deleteMany({

      where:{
        productId,
      },

    });



    // حذف المنتج
    await prisma.product.delete({

      where:{
        id: productId,
      },

    });



    return NextResponse.json({

      success:true,

    });



  }catch(error){


    console.error(
      "DELETE PRODUCT ERROR:",
      error
    );


    return NextResponse.json(

      {
        success:false,
        message:"Failed to delete product",
      },

      {
        status:500,
      }

    );


  }

}