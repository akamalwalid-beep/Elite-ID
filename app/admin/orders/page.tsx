import { prisma } from "@/lib/prisma";

export default async function AdminOrdersPage() {

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: true,
    },
  });


  return (
    <main className="min-h-screen bg-[#090909] p-10 text-white">

      <h1 className="mb-10 text-5xl font-black">
        Orders
      </h1>


      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order.id}
            className="
            rounded-3xl
            border
            border-zinc-800
            bg-[#111]
            p-8
            "
          >

            <div className="flex flex-wrap justify-between gap-5">

              <div>

                <h2 className="text-2xl font-bold">
                  Order #{order.id}
                </h2>

                <p className="mt-2 text-zinc-400">
                  {order.customerName}
                </p>

                <p className="text-zinc-500">
                  {order.customerEmail}
                </p>

              </div>



              <div className="text-right">

                <p className="text-zinc-400">
                  Payment
                </p>

                <p className="font-bold text-lime-400">
                  {order.paymentMethod}
                </p>

                <p className="mt-3 text-2xl font-black">
                  {Number(order.total).toFixed(2)} USDT
                </p>

              </div>


            </div>



            <div className="mt-6 border-t border-zinc-800 pt-5">

              <p className="mb-3 font-bold">
                Products
              </p>


              {order.items.map((item)=>(
                <div
                  key={item.id}
                  className="
                  flex
                  justify-between
                  rounded-xl
                  bg-black/30
                  p-3
                  "
                >

                  <span>
                    {item.country}
                  </span>

                  <span>
                    x{item.quantity}
                  </span>

                </div>
              ))}


            </div>



            <div className="mt-6">

              <span
                className="
                rounded-full
                bg-yellow-400/10
                px-4
                py-2
                text-yellow-400
                "
              >
                {order.status}
              </span>

            </div>


          </div>

        ))}


      </div>


    </main>
  );
}