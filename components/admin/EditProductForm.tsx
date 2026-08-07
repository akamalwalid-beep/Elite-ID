"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


type Product = {

  id:number;

  title:string;

  country:string;

  price:number;

  stock:number;

  image:string;

  description:string;

  featured:boolean;

  topRated:boolean;

  bestSeller:boolean;

  rare:boolean;

  features:string[];

  rating:number;

  currency:string;

};



export default function EditProductForm({
  product,
}:{
  product:Product;
}){


  const router = useRouter();


  const [form,setForm] = useState(product);


  const [loading,setLoading] = useState(false);


  const [uploading,setUploading] = useState(false);




  const featureList = [

    "AppStore",
    "iCloud 5GB",
    "2FA",
    "Mailbox",

  ];





  function toggleFeature(item:string){


    setForm(prev=>({


      ...prev,


      features:

      prev.features.includes(item)

      ?

      prev.features.filter(
        x=>x!==item
      )

      :

      [
        ...prev.features,
        item
      ]


    }));


  }





  async function uploadImage(
    e:React.ChangeEvent<HTMLInputElement>
  ){


    const file = e.target.files?.[0];


    if(!file) return;



    setUploading(true);



    const data = new FormData();


    data.append(
      "file",
      file
    );



    const res = await fetch(
      "/api/upload",
      {
        method:"POST",
        body:data,
      }
    );



    const result = await res.json();



    setUploading(false);



    if(!res.ok){

      alert("Upload failed");

      return;

    }



    setForm(prev=>({

      ...prev,

      image:result.url

    }));


  }






  async function saveProduct(){


    setLoading(true);



    const res = await fetch(

      `/api/products/${product.id}`,

      {

        method:"PATCH",

        headers:{

          "Content-Type":
          "application/json",

        },


        body:JSON.stringify({

          ...form,

          price:Number(form.price),

          stock:Number(form.stock),

          rating:Number(form.rating),

        }),

      }

    );



    setLoading(false);



    if(!res.ok){

      alert("Failed to update product.");

      return;

    }



    alert("✅ Product Updated");


    router.push("/admin/products");

    router.refresh();


  }
    return (

    <div
      className="
      space-y-6
      rounded-2xl
      border
      border-zinc-800
      bg-[#111111]
      p-8
      "
    >


      <input

        value={form.title}

        onChange={e=>
          setForm({
            ...form,
            title:e.target.value
          })
        }

        placeholder="Product Name"

        className="
        w-full
        rounded-xl
        border
        border-zinc-700
        bg-black
        p-3
        "

      />





      <input

        value={form.country}

        onChange={e=>
          setForm({
            ...form,
            country:e.target.value
          })
        }

        placeholder="Country"

        className="
        w-full
        rounded-xl
        border
        border-zinc-700
        bg-black
        p-3
        "

      />






      <input

        type="number"

        value={form.price}

        onChange={e=>
          setForm({
            ...form,
            price:Number(e.target.value)
          })
        }

        placeholder="Price"

        className="
        w-full
        rounded-xl
        border
        border-zinc-700
        bg-black
        p-3
        "

      />






      <input

        type="number"

        value={form.stock}

        onChange={e=>
          setForm({
            ...form,
            stock:Number(e.target.value)
          })
        }

        placeholder="Stock"

        className="
        w-full
        rounded-xl
        border
        border-zinc-700
        bg-black
        p-3
        "

      />






      <input

        type="number"

        value={form.rating}

        onChange={e=>
          setForm({
            ...form,
            rating:Number(e.target.value)
          })
        }

        placeholder="Rating"

        className="
        w-full
        rounded-xl
        border
        border-zinc-700
        bg-black
        p-3
        "

      />







      {/* IMAGE UPLOAD */}


      <div className="space-y-4">


        <label className="block font-bold">

          Product Image

        </label>



        {
          form.image && (

            <Image

              src={form.image}

              alt="preview"

              width={120}

              height={120}

              className="
              rounded-xl
              border
              border-zinc-700
              object-cover
              "

            />

          )
        }





        <input

          type="file"

          accept="image/*"

          onChange={uploadImage}

          className="
          w-full
          rounded-xl
          border
          border-zinc-700
          bg-black
          p-3
          "

        />



        {
          uploading && (

            <p className="text-lime-400">
              Uploading...
            </p>

          )
        }


      </div>








      <textarea

        rows={5}

        value={form.description}

        onChange={e=>
          setForm({
            ...form,
            description:e.target.value
          })
        }

        placeholder="Description"

        className="
        w-full
        rounded-xl
        border
        border-zinc-700
        bg-black
        p-3
        "

      />








      <div className="space-y-3">


        <h3 className="font-bold">
          Product Features
        </h3>



        {
          featureList.map(item=>(


            <label
              key={item}
              className="flex gap-3"
            >


              <input

                type="checkbox"

                checked={
                  form.features.includes(item)
                }

                onChange={()=>
                  toggleFeature(item)
                }

              />


              {item}


            </label>


          ))
        }


      </div>








      <div className="space-y-3">


        <h3 className="font-bold">
          Badges
        </h3>




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

                checked={
                  (form as any)[key]
                }

                onChange={e=>

                  setForm({

                    ...form,

                    [key]:
                    e.target.checked

                  })

                }

              />


              {label}


            </label>


          ))
        }


      </div>







      <button

        onClick={saveProduct}

        disabled={loading || uploading}

        className="
        w-full
        rounded-xl
        bg-lime-400
        py-4
        font-bold
        text-black
        disabled:opacity-50
        "

      >

        {
          loading
          ?
          "Saving..."
          :
          "Save Changes"
        }


      </button>



    </div>

  );


}