"use client";

import { useState } from "react";
import { Check, Zap } from "lucide-react";

import { Product } from "../../types/product";
import { useCart } from "../../context/CartContext";

import AddToCartModal from "../Modal/AddToCartModal";

import ProductHeader from "./ProductHeader";
import ProductStats from "./ProductStats";
import ProductPrice from "./ProductPrice";
import ProductActions from "./ProductActions";

type ProductCardProps = Product;


export default function ProductCard(
  props: ProductCardProps
) {


const [isModalOpen,setIsModalOpen] =
useState(false);


const [modalMode,setModalMode] =
useState<"cart" | "buy">("cart");


const { addToCart } = useCart();




function handleConfirm(
  quantity:number,
  mode:"cart" | "buy"
){


for(let i = 0; i < quantity; i++){

  addToCart(props);

}



if(mode === "buy"){

  window.location.href="/cart";

}


}





const inStock =
props.stock > 0;



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





<a

href={`/products/${props.id}`}

className="
absolute
inset-0
z-0
"

/>







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







<div

className="
relative
z-10
flex
h-full
flex-col
p-7
pointer-events-none
"

>



<ProductHeader

title={props.title}

country={props.country}

featured={props.featured ?? false}

topRated={props.topRated ?? false}

bestSeller={props.bestSeller ?? false}

rare={props.rare ?? false}

views={props.views}

image={props.image}

/>







{
props.features &&
props.features.length > 0 && (


<div

className="
mt-6
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







<div

className="
mt-auto
pt-10
pointer-events-auto
"

>


<ProductActions

id={props.id}

inStock={inStock}

onAddToCart={()=>{

setModalMode("cart");

setIsModalOpen(true);

}}

/>






<button


disabled={!inStock}


onClick={()=>{

setModalMode("buy");

setIsModalOpen(true);

}}



className="

mt-3

flex

w-full

items-center

justify-center

gap-2

rounded-2xl

bg-lime-400

py-4

font-black

text-black

transition

hover:scale-105

disabled:bg-zinc-800

disabled:text-zinc-500

"


>


<Zap size={18}/>


Buy Now


</button>



</div>





</div>



</div>







<AddToCartModal


product={props}


isOpen={isModalOpen}


mode={modalMode}


onClose={()=>{

setIsModalOpen(false);

}}


onConfirm={handleConfirm}


/>



</>

);

}