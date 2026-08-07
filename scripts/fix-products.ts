import { prisma } from "../lib/prisma";


async function fixProducts(){

  const products = await prisma.product.findMany();


  for(const product of products){

    if(product.country === product.title){

      await prisma.product.update({

        where:{
          id: product.id,
        },

        data:{
          country:"USA",
        },

      });


      console.log(
        "Fixed:",
        product.title
      );

    }

  }


  await prisma.$disconnect();

}


fixProducts();