"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductForm() {

  const router = useRouter();


  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");



  const image = "/images/products/apple.png";



  const [featured, setFeatured] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [bestSeller, setBestSeller] = useState(false);
  const [rare, setRare] = useState(false);



  const [features, setFeatures] = useState<string[]>([]);


  const [loading, setLoading] = useState(false);





  const availableFeatures = [
    "App Store",
    "iCloud 5GB",
    "2FA",
    "Mailbox",
  ];






  function toggleFeature(feature:string){

    setFeatures((current)=>{

      if(current.includes(feature)){

        return current.filter(
          item => item !== feature
        );

      }


      return [
        ...current,
        feature
      ];

    });

  }









  async function saveProduct(){


    if(
      !title ||
      !country ||
      !price ||
      !stock
    ){

      alert("Please fill all required fields.");

      return;

    }




    setLoading(true);





    const res = await fetch("/api/products",{

      method:"POST",


      headers:{
        "Content-Type":"application/json",
      },



      body:JSON.stringify({

        title,

        slug,

        country,


        price:Number(price),


        stock:Number(stock),


        image,


        description,



        featured,


        topRated,


        bestSeller,


        rare,



        features,


      }),


    });






    setLoading(false);





    if(!res.ok){

      alert("Failed to create product.");

      return;

    }




    router.push("/admin/products");

    router.refresh();



  }








  return (

    <div
      className="
      rounded-3xl
      border
      border-zinc-800
      bg-[#111111]
      p-8
      "
    >



      <div className="grid gap-6 md:grid-cols-2">



        <input
          placeholder="Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />



        <input
          placeholder="Slug"
          value={slug}
          onChange={(e)=>setSlug(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />



        <input
          placeholder="Country"
          value={country}
          onChange={(e)=>setCountry(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />



        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />



        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e)=>setStock(e.target.value)}
          className="rounded-xl border border-zinc-700 bg-black p-4"
        />



      </div>









      <div className="mt-6 grid gap-3 md:grid-cols-2">



        <label className="flex items-center gap-3 rounded-xl border border-zinc-700 p-4">

          <input
            type="checkbox"
            checked={featured}
            onChange={(e)=>setFeatured(e.target.checked)}
          />

          Featured

        </label>





        <label className="flex items-center gap-3 rounded-xl border border-zinc-700 p-4">

          <input
            type="checkbox"
            checked={topRated}
            onChange={(e)=>setTopRated(e.target.checked)}
          />

          Top Rated

        </label>





        <label className="flex items-center gap-3 rounded-xl border border-zinc-700 p-4">

          <input
            type="checkbox"
            checked={bestSeller}
            onChange={(e)=>setBestSeller(e.target.checked)}
          />

          Best Seller

        </label>





        <label className="flex items-center gap-3 rounded-xl border border-zinc-700 p-4">

          <input
            type="checkbox"
            checked={rare}
            onChange={(e)=>setRare(e.target.checked)}
          />

          Rare

        </label>



      </div>









      <div className="mt-6 rounded-xl border border-zinc-700 p-5">


        <h3 className="mb-4 font-bold">
          Product Features
        </h3>



        <div className="grid gap-3 md:grid-cols-2">


          {availableFeatures.map((feature)=>(


            <label
              key={feature}
              className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-zinc-700
              p-3
              "
            >


              <input

                type="checkbox"

                checked={
                  features.includes(feature)
                }

                onChange={() =>
                  toggleFeature(feature)
                }

              />


              {feature}


            </label>


          ))}



        </div>


      </div>









      <textarea

        placeholder="Description"

        value={description}

        onChange={(e)=>setDescription(e.target.value)}

        className="
        mt-6
        h-40
        w-full
        rounded-xl
        border
        border-zinc-700
        bg-black
        p-4
        "

      />









      <button

        onClick={saveProduct}

        disabled={loading}

        className="
        mt-8
        rounded-xl
        bg-lime-400
        px-8
        py-4
        font-bold
        text-black
        "

      >

        {loading ? "Saving..." : "Create Product"}


      </button>





    </div>

  );

}