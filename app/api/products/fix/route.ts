import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST() {

  try {

    const products = await prisma.product.findMany();


    let fixed = 0;


    for (const product of products) {


      if(product.country === product.title){


        await prisma.product.update({

          where:{
            id: product.id,
          },

          data:{
            country:"USA",
          },

        });


        fixed++;

      }

    }



    return NextResponse.json({

      success:true,

      fixed,

    });


  } catch(error){


    console.error(error);


    return NextResponse.json({

      success:false,

    },{

      status:500,

    });


  }

}