"use client";

import { useEffect, useRef, useState } from "react";
import { Product } from "../../types/product";

type AddToCartModalProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
};

export default function AddToCartModal({
  product,
  isOpen,
  onClose,
  onConfirm,
}: AddToCartModalProps) {
  const [quantity, setQuantity] = useState("1");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    setQuantity("1");

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 50);
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const qty = Math.max(1, Number(quantity) || 1);
  const total = (product.price * qty).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-[#141414] p-8 text-white shadow-2xl">
        <h2 className="text-3xl font-bold">
          {product.country} Apple ID
        </h2>

        <p className="mt-2 text-zinc-400">
          Choose how many accounts you want to add.
        </p>

        <div className="mt-8">
          <p className="text-sm text-zinc-400">
            Unit Price
          </p>

          <h3 className="mt-1 text-2xl font-bold text-lime-400">
            {product.price.toFixed(2)} {product.currency}
          </h3>
        </div>

        <div className="mt-8">
          <label className="mb-2 block text-sm text-zinc-400">
            Quantity
          </label>

          <input
            ref={inputRef}
            type="number"
            min={1}
            step={1}
            value={quantity}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-[#1d1d1d] p-4 text-xl outline-none transition focus:border-lime-400"
          />
        </div>

        <div className="mt-8 rounded-2xl bg-[#1d1d1d] p-5">
          <p className="text-sm text-zinc-400">
            Total
          </p>

          <h3 className="mt-2 text-3xl font-bold text-lime-400">
            {total} {product.currency}
          </h3>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => {
              setQuantity("1");
              onClose();
            }}
            className="flex-1 rounded-xl border border-zinc-700 py-4 font-semibold transition hover:border-red-500"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm(qty);
              setQuantity("1");
              onClose();
            }}
            className="flex-1 rounded-xl bg-lime-400 py-4 font-bold text-black transition hover:scale-105"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}