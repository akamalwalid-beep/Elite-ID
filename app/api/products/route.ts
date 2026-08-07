import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function GET() {

  try {

    const products = await prisma.product.findMany({

      orderBy: [

        {
          featured: "desc",
        },

        {
          createdAt: "desc",
        },

      ],

    });


    return NextResponse.json(products);


  } catch (error) {


    console.error(error);


    return NextResponse.json(

      {
        message:"Failed to fetch products",
      },

      {
        status:500,
      }

    );

  }

}









export async function POST(
  request: Request
) {


  try {


    const body = await request.json();



    const title =
      body.title?.trim();



    if(!title){


      return NextResponse.json(

        {
          message:"Product title is required",
        },

        {
          status:400,
        }

      );

    }







    let baseSlug = title

      .toLowerCase()

      .replace(/[^a-z0-9\s-]/g,"")

      .replace(/\s+/g,"-");



    let slug = baseSlug;


    let counter = 1;



    while(

      await prisma.product.findUnique({

        where:{
          slug,
        },

      })

    ){

      slug =
        `${baseSlug}-${counter}`;

      counter++;

    }








    const product = await prisma.product.create({

      data:{



        title,



        slug,



        country:
          body.country ||
          "USA",



        price:
          Number(body.price) || 0,



        currency:
          body.currency ||
          "USDT",




        image:
          body.image ||
          "/images/products/apple.png",





        description:
          body.description ||
          "",





        stock:
          Number(body.stock) || 0,





        views:
          Number(body.views) || 0,





        rating:
          Number(body.rating) || 5,





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







    return NextResponse.json(

      product,

      {
        status:201,
      }

    );





  } catch(error:any){



    console.error(
      "CREATE PRODUCT ERROR:",
      error
    );





    if(error.code === "P2002"){


      return NextResponse.json(

        {
          message:"Product already exists",
        },

        {
          status:400,
        }

      );


    }







    return NextResponse.json(

      {
        message:"Failed to create product",
      },

      {
        status:500,
      }

    );


  }


}