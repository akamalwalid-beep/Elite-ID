"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { CartItem } from "../types/cart";
import { Product } from "../types/product";


type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  cartCount: number;
};


const CartContext = createContext<CartContextType | null>(null);



export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {


  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);



  useEffect(() => {

    const savedCart = localStorage.getItem("elite-cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    setLoaded(true);

  }, []);




  useEffect(() => {

    if (!loaded) return;

    localStorage.setItem(
      "elite-cart",
      JSON.stringify(cart)
    );

  }, [cart, loaded]);





  function addToCart(product: Product) {

    setCart((currentCart) => {

      const existingItem = currentCart.find(
        item => item.id === product.id
      );


      if (existingItem) {

        return currentCart.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );

      }



      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];

    });

  }





  function removeFromCart(id:number){

    setCart(cart =>
      cart.filter(item => item.id !== id)
    );

  }





  function increaseQuantity(id:number){

    setCart(cart =>
      cart.map(item =>
        item.id === id
        ? {
            ...item,
            quantity:item.quantity + 1
          }
        : item
      )
    );

  }





  function decreaseQuantity(id:number){

    setCart(cart =>
      cart
      .map(item =>
        item.id === id
        ? {
            ...item,
            quantity:item.quantity - 1
          }
        : item
      )
      .filter(item => item.quantity > 0)
    );

  }





  function clearCart(){

    setCart([]);

  }





  const cartCount = useMemo(() => {

    return cart.reduce(
      (total,item)=> total + item.quantity,
      0
    );

  },[cart]);






  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartCount,
      }}
    >

      {children}

    </CartContext.Provider>

  );

}




export function useCart(){

  const context = useContext(CartContext);


  if(!context){
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }


  return context;

}