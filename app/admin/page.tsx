import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [
    totalProducts,
    totalOrders,
    pendingOrders,
    featuredProducts,
    revenue,
    latestOrders,
  ] = await Promise.all([
    prisma.product.count(),

    prisma.order.count(),

    prisma.order.count({
      where: {
        status: "Pending",
      },
    }),

    prisma.product.count({
      where: {
        featured: true,
      },
    }),

    prisma.order.aggregate({
      _sum: {
        total: true,
      },
    }),

    prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
  ]);


  const totalRevenue = Number(revenue._sum.total ?? 0);


  return (
    <main className="min-h-screen bg-[#090909] p-10 text-white">

      <div className="mx-auto max-w-7xl">


        <div className="mb-10 flex items-center justify-between">

          <div>

            <h1 className="text-5xl font-bold">
              Admin Dashboard
            </h1>


            <p className="mt-2 text-zinc-400">
              Welcome back 👋
            </p>

          </div>



          <Link
            href="/admin/add"
            className="
            rounded-xl
            bg-lime-400
            px-6
            py-3
            font-bold
            text-black
            "
          >
            + Add Product
          </Link>


        </div>




        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">


          <DashboardCard
            title="Products"
            value={totalProducts}
          />


          <DashboardCard
            title="Orders"
            value={totalOrders}
          />


          <DashboardCard
            title="Revenue"
            value={`${totalRevenue.toFixed(2)} USDT`}
          />


          <DashboardCard
            title="Pending Orders"
            value={pendingOrders}
          />


        </div>






        <div
          className="
          mt-10
          rounded-2xl
          border
          border-zinc-800
          bg-[#111111]
          p-6
          "
        >


          <div className="mb-6 flex items-center justify-between">


            <h2 className="text-2xl font-bold">
              Latest Orders
            </h2>


            <span className="text-zinc-500">
              Featured Products: {featuredProducts}
            </span>


          </div>





          <table className="w-full">


            <thead>

              <tr className="border-b border-zinc-800">


                <th className="p-3 text-left">
                  Customer
                </th>


                <th className="p-3 text-left">
                  Email
                </th>


                <th className="p-3 text-left">
                  Total
                </th>


                <th className="p-3 text-left">
                  Status
                </th>


                <th className="p-3 text-left">
                  Action
                </th>


              </tr>


            </thead>





            <tbody>


              {latestOrders.map((order) => (


                <tr
                  key={order.id}
                  className="
                  border-b
                  border-zinc-900
                  transition
                  hover:bg-white/[0.03]
                  "
                >



                  <td className="p-3">
                    {order.customerName}
                  </td>



                  <td className="p-3">
                    {order.customerEmail}
                  </td>




                  <td className="p-3 text-lime-400">
                    {Number(order.total).toFixed(2)} USDT
                  </td>





                  <td className="p-3">

                    <span
                      className="
                      rounded-full
                      bg-yellow-400/10
                      px-3
                      py-1
                      text-yellow-400
                      "
                    >
                      {order.status}
                    </span>

                  </td>





                  <td className="p-3">


                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="
                      rounded-lg
                      bg-lime-400
                      px-4
                      py-2
                      font-bold
                      text-black
                      transition
                      hover:scale-105
                      "
                    >
                      View
                    </Link>


                  </td>




                </tr>


              ))}



            </tbody>


          </table>



        </div>




      </div>


    </main>
  );
}




function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {


  return (

    <div
      className="
      rounded-2xl
      border
      border-zinc-800
      bg-[#111111]
      p-6
      "
    >


      <p className="text-zinc-500">
        {title}
      </p>


      <h2 className="mt-3 text-4xl font-bold">
        {value}
      </h2>


    </div>

  );
}