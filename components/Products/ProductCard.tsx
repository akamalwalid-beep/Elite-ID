"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { Product } from "../../types/product";
import { useCart } from "../../context/CartContext";

import AddToCartModal from "../Modal/AddToCartModal";

import ProductHeader from "./ProductHeader";
import ProductStats from "./ProductStats";
import ProductPrice from "./ProductPrice";
import ProductActions from "./ProductActions";


type ProductCardProps = Product;



export default function ProductCard(props: ProductCardProps) {


  const { addToCart } = useCart();


  const [isModalOpen, setIsModalOpen] =
    useState(false);



  function handleConfirm(quantity:number){

    addToCart({
      ...props,
    });

  }





  const inStock = props.stock > 0;


  const premiumCard =
    props.rare || props.bestSeller;





  return (

    <>

      <div
        className={`
        group
        relative
        flex
        h-full
        min-h-[760px]
        flex-col
        overflow-hidden
        rounded-[32px]
        border
        transition-all
        duration-500
        hover:-translate-y-2


        ${
          premiumCard

          ?

          `
          border-yellow-400/40
          bg-gradient-to-b
          from-[#332707]
          via-[#17120a]
          to-[#090909]
          shadow-[0_25px_80px_rgba(250,204,21,.2)]
          `

          :

          `
          border-zinc-800
          bg-gradient-to-b
          from-[#1b1b1b]
          via-[#111111]
          to-[#090909]
          `
        }


        hover:border-lime-400/40
        `}
      >





        <div
          className="
          absolute
          -left-24
          -top-24
          h-72
          w-72
          rounded-full
          bg-lime-400/10
          blur-[120px]
          opacity-0
          transition-all
          duration-700
          group-hover:opacity-100
          "
        />






        <div className="relative z-10 flex h-full flex-col p-7">





          <ProductHeader

            title={props.title}

            country={props.country}

            featured={props.featured}

            topRated={props.topRated}

            bestSeller={props.bestSeller}

            rare={props.rare}

            views={props.views}

            image={props.image}

          />







          <div className="mt-6 min-h-[190px]">


            {
              props.features &&
              props.features.length > 0 && (

                <div
                  className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/20
                  p-4
                  "
                >

                  <div className="space-y-2">

                    {
                      props.features.map((feature)=>(

                        <div
                          key={feature}
                          className="
                          flex
                          items-center
                          gap-2
                          text-sm
                          text-zinc-300
                          "
                        >

                          <Check
                            size={16}
                            className="text-lime-400"
                          />

                          {feature}

                        </div>

                      ))
                    }

                  </div>

                </div>

              )
            }


          </div>







          <div className="mt-6">


            <ProductStats

              stock={props.stock}

            />


          </div>








          <div className="mt-8">


            <ProductPrice

              price={props.price}

              currency={props.currency}

            />


          </div>







          <div className="mt-auto pt-10">


            <ProductActions

              id={props.id}

              inStock={inStock}

              onAddToCart={() => setIsModalOpen(true)}

            />


          </div>






        </div>


      </div>







      <AddToCartModal

        product={props}

        isOpen={isModalOpen}

        onClose={() => setIsModalOpen(false)}

        onConfirm={handleConfirm}

      />


    </>

  );

}