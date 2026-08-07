"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Pencil, Trash2, Eye } from "lucide-react";


type Product = {

  id: number;

  title: string;

  country: string;

  price: number;

  stock: number;

  featured: boolean;

  topRated: boolean;

  bestSeller: boolean;

  rare: boolean;

  image: string;

  views: number;

};




export default function ProductsTable({
  products,
}: {
  products: Product[];
}) {


  const [rows, setRows] = useState(products);

  const [search, setSearch] = useState("");






  async function fixOldProducts(){


    const res = await fetch("/api/products/fix",{

      method:"POST",

    });



    const data = await res.json();




    if(!res.ok){

      alert("Failed to fix products.");

      return;

    }



    alert(`Fixed ${data.fixed} products`);



    location.reload();


  }






  const filtered = useMemo(() => {


    return rows.filter((product)=>{


      const value = search.toLowerCase();



      return (

        product.title
        .toLowerCase()
        .includes(value)

        ||

        product.country
        .toLowerCase()
        .includes(value)

      );


    });


  },[rows,search]);







  async function deleteProduct(id:number){


    if(!confirm("Delete this product?")) return;



    const res = await fetch(

      `/api/products/${id}`,

      {
        method:"DELETE",
      }

    );



    if(!res.ok){


      alert("Failed to delete product.");

      return;


    }




    setRows(prev=>

      prev.filter(

        p=>p.id !== id

      )

    );


  }






  return (

    <>

      <button
        onClick={fixOldProducts}
        className="
        mb-6
        rounded-xl
        bg-lime-400
        px-5
        py-3
        font-bold
        text-black
        "
      >

        Fix Old Products

      </button>





      <div className="mb-6 relative">


        <Search

          className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-zinc-500
          "

          size={18}

        />



        <input

          placeholder="Search product..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          className="
          w-full
          rounded-2xl
          border
          border-zinc-800
          bg-[#111111]
          py-4
          pl-12
          pr-5
          outline-none
          focus:border-lime-400
          "

        />


      </div>
            <div
        className="
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-[#111111]
        "
      >

        <table className="w-full">


          <thead
            className="
            border-b
            border-zinc-800
            bg-[#171717]
            "
          >

            <tr>

              <th className="p-5 text-left">
                Product
              </th>


              <th className="p-5 text-left">
                Price
              </th>


              <th className="p-5 text-left">
                Stock
              </th>


              <th className="p-5 text-left">
                Views
              </th>


              <th className="p-5 text-left">
                Badges
              </th>


              <th className="p-5 text-left">
                Actions
              </th>


            </tr>


          </thead>






          <tbody>


          {
            filtered.map((product)=>(


              <tr

                key={product.id}

                className="
                border-b
                border-zinc-800
                hover:bg-white/[0.03]
                "

              >




                <td className="p-5">


                  <div
                    className="
                    flex
                    items-center
                    gap-4
                    "
                  >



                    <Image

                      src={
                        product.image &&
                        product.image.startsWith("/")

                        ?

                        product.image

                        :

                        "/images/products/apple.png"
                      }


                      alt={product.title}

                      width={60}

                      height={60}

                      className="
                      rounded-xl
                      border
                      border-zinc-700
                      object-cover
                      "

                    />




                    <h3 className="text-lg font-bold">

                      {product.title}

                    </h3>



                  </div>


                </td>







                <td className="
                p-5
                font-bold
                text-lime-400
                ">

                  ${product.price.toFixed(2)}

                </td>






                <td className="p-5">

                  {product.stock}

                </td>






                <td className="p-5">


                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    text-zinc-400
                    "
                  >

                    <Eye size={16}/>

                    {product.views}


                  </div>


                </td>








                <td className="p-5">


                  <div className="flex flex-wrap gap-2">


                    {product.featured && (

                      <span
                        className="
                        rounded-full
                        bg-lime-400/15
                        px-3
                        py-1
                        text-xs
                        text-lime-400
                        "
                      >

                        Featured

                      </span>

                    )}






                    {product.topRated && (

                      <span
                        className="
                        rounded-full
                        bg-yellow-400/15
                        px-3
                        py-1
                        text-xs
                        text-yellow-400
                        "
                      >

                        Top Rated

                      </span>

                    )}







                    {product.bestSeller && (

                      <span
                        className="
                        rounded-full
                        bg-orange-400/15
                        px-3
                        py-1
                        text-xs
                        text-orange-400
                        "
                      >

                        Best Seller

                      </span>

                    )}







                    {product.rare && (

                      <span
                        className="
                        rounded-full
                        bg-purple-400/15
                        px-3
                        py-1
                        text-xs
                        text-purple-400
                        "
                      >

                        Rare

                      </span>

                    )}







                    {
                      !product.featured &&
                      !product.topRated &&
                      !product.bestSeller &&
                      !product.rare &&

                      <span className="text-zinc-600">
                        —
                      </span>
                    }



                  </div>


                </td>









                <td className="p-5">


                  <div className="flex gap-3">



                    <Link

                      href={`/admin/products/${product.id}`}

                      className="
                      rounded-xl
                      bg-blue-600
                      p-3
                      hover:bg-blue-500
                      "

                    >

                      <Pencil size={18}/>


                    </Link>






                    <button

                      onClick={()=>deleteProduct(product.id)}

                      className="
                      rounded-xl
                      bg-red-600
                      p-3
                      hover:bg-red-500
                      "

                    >

                      <Trash2 size={18}/>


                    </button>



                  </div>


                </td>






              </tr>


            ))
          }






          {
            filtered.length === 0 && (

              <tr>

                <td
                  colSpan={6}
                  className="
                  p-10
                  text-center
                  text-zinc-500
                  "
                >

                  No products found.

                </td>

              </tr>

            )
          }




          </tbody>


        </table>


      </div>



    </>

  );


}