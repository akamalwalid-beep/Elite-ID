"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {

  const router = useRouter();

  const [form,setForm] = useState({

    title:"",
    slug:"",
    country:"",
    price:"",
    description:"",

    image:"/images/products/apple.png",

    stock:"100",
    views:"0",
    rating:"5",

    featured:false,
    topRated:false,
    bestSeller:false,
    rare:false,

    features:[] as string[],

  });



  const featureList = [
    "AppStore",
    "iCloud 5GB",
    "2FA",
    "Mailbox",
  ];



  function toggleFeature(item:string){

    setForm(prev=>({

      ...prev,

      features: prev.features.includes(item)

      ? prev.features.filter(x=>x!==item)

      : [...prev.features,item]

    }));

  }




  async function submit(e:React.FormEvent){

    e.preventDefault();


    const res = await fetch("/api/products",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },


      body:JSON.stringify({

        ...form,

        price:Number(form.price),

        stock:Number(form.stock),

        views:Number(form.views),

        rating:Number(form.rating),

      })

    });



    if(res.ok){

      router.push("/admin/products");

      router.refresh();

    }

  }




  return (

    <main className="min-h-screen bg-[#090909] p-10 text-white">


      <form

        onSubmit={submit}

        className="
        mx-auto
        max-w-3xl
        space-y-5
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-8
        "

      >


        <h1 className="text-4xl font-black">
          Add Product
        </h1>



        {
          [
            "title",
            "slug",
            "country",
            "price",
            "description",
            "stock",
            "views",
            "rating"

          ].map(field=>(


            <input

              key={field}

              placeholder={field}

              value={(form as any)[field]}

              onChange={(e)=>

                setForm({

                  ...form,

                  [field]:e.target.value

                })

              }


              className="
              w-full
              rounded-xl
              bg-black/40
              border
              border-zinc-700
              p-4
              "

            />


          ))
        }




        <div className="space-y-3">


          <h2 className="font-bold">
            Product Features
          </h2>



          {
            featureList.map(item=>(


              <label

                key={item}

                className="flex gap-3 items-center"

              >

                <input

                  type="checkbox"

                  checked={form.features.includes(item)}

                  onChange={()=>toggleFeature(item)}

                />


                {item}


              </label>


            ))
          }


        </div>






        <div className="space-y-3">


          <h2 className="font-bold">
            Badges
          </h2>



          {
            [
              ["featured","Featured"],
              ["topRated","Top Rated"],
              ["bestSeller","Best Seller"],
              ["rare","Rare"],

            ].map(([key,label])=>(


              <label

                key={key}

                className="flex gap-3"

              >

                <input

                  type="checkbox"

                  checked={(form as any)[key]}

                  onChange={(e)=>

                    setForm({

                      ...form,

                      [key]:e.target.checked

                    })

                  }

                />


                {label}


              </label>


            ))
          }


        </div>






        <div
          className="
          rounded-xl
          border
          border-zinc-700
          p-4
          text-sm
          text-lime-400
          "
        >

          Default Image:
          <br />

          /images/products/apple.png

        </div>






        <button

          className="
          w-full
          rounded-xl
          bg-lime-400
          py-4
          font-black
          text-black
          "

        >

          Create Product

        </button>



      </form>


    </main>

  );

}