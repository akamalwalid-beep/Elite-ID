"use client";

import { useState } from "react";

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleConfirm(quantity: number) {
    addToCart(props, quantity);
  }

  const inStock = props.stock > 0;

  return (
    <>
      <div
        className="
          group
          relative
          overflow-hidden
          rounded-[32px]
          border
          border-zinc-800
          bg-gradient-to-b
          from-[#1b1b1b]
          via-[#111111]
          to-[#090909]
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-lime-400/40
          hover:shadow-[0_25px_80px_rgba(132,255,0,.18)]
        "
      >
        {/* Background Glow */}

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

        {/* Shine */}

        <div
          className="
            absolute
            inset-0
            -translate-x-full
            bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.05),transparent)]
            transition-transform
            duration-1000
            group-hover:translate-x-full
          "
        />

        {/* Border */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-[32px]
            border
            border-white/5
            opacity-0
            transition
            duration-500
            group-hover:opacity-100
          "
        />

        <div className="relative z-10 p-7">

          <ProductHeader
            country={props.country}
            featured={props.featured}
            rating={props.rating}
            views={props.views}
            image={props.image}
          />

          <div className="mt-7">
            <ProductStats
              views={props.views}
              stock={props.stock}
              rating={props.rating}
            />
          </div>

          <div className="mt-8">
            <ProductPrice
              price={props.price}
              currency={props.currency}
            />
          </div>

          <div className="mt-10">
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