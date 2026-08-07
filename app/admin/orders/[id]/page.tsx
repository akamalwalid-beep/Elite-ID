import Link from "next/link";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderDetailsPage({
  params,
}: Props) {

  const { id } = await params;


  const order = await prisma.order.findUnique({
    where: {
      id: Number(id),
    },

    include: {
      items: true,
    },
  });



  if (!order) {
    return (
      <main className="min-h-screen bg-[#090909] p-10 text-white">
        <h1 className="text-4xl font-bold">
          Order Not Found
        </h1>
      </main>
    );
  }



  return (
    <main className="min-h-screen bg-[#090909] p-10 text-white">


      <div className="mx-auto max-w-5xl">


        <Link
          href="/admin"
          className="
          inline-block
          rounded-xl
          bg-zinc-800
          px-5
          py-3
          font-bold
          "
        >
          ← Back
        </Link>



        <div
          className="
          mt-8
          rounded-3xl
          border
          border-zinc-800
          bg-[#111]
          p-8
          "
        >


          <div className="flex flex-wrap justify-between gap-6">


            <div>

              <h1 className="text-4xl font-black">
                Order #{order.id}
              </h1>


              <p className="mt-4 text-zinc-400">
                {order.customerName}
              </p>


              <p className="text-zinc-500">
                {order.customerEmail}
              </p>


            </div>



            <div className="text-right">


              <p className="text-zinc-500">
                Payment Method
              </p>


              <p className="font-bold text-lime-400">
                {order.paymentMethod}
              </p>


              <p className="mt-4 text-3xl font-black">
                {Number(order.total).toFixed(2)} USDT
              </p>


            </div>


          </div>





          <div className="mt-10 border-t border-zinc-800 pt-8">


            <h2 className="mb-5 text-2xl font-bold">
              Products
            </h2>



            <div className="space-y-4">


              {order.items.map((item) => (

                <div
                  key={item.id}
                  className="
                  flex
                  justify-between
                  rounded-2xl
                  bg-black/30
                  p-5
                  "
                >


                  <div>

                    <p className="font-bold">
                      {item.country}
                    </p>


                    <p className="text-zinc-500">
                      Quantity: {item.quantity}
                    </p>

                  </div>



                  <div className="text-right">


                    <p className="font-bold text-lime-400">
                      {Number(item.price).toFixed(2)} USDT
                    </p>


                    <p className="text-zinc-500">
                      Total:
                      {" "}
                      {(Number(item.price) * item.quantity).toFixed(2)}
                      {" "}USDT
                    </p>


                  </div>


                </div>

              ))}


            </div>


          </div>





          <div className="mt-10 border-t border-zinc-800 pt-8">


            <p className="text-zinc-500">
              Status
            </p>


            <span
              className="
              mt-3
              inline-block
              rounded-full
              bg-yellow-400/10
              px-5
              py-2
              font-bold
              text-yellow-400
              "
            >
              {order.status}
            </span>


          </div>



        </div>


      </div>


    </main>
  );
}