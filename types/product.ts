export type Product = {
  id: number;

  title: string;

  slug: string;

  country: string;

  price: number;

  currency: string;

  image: string;

  description?: string;

  stock: number;

  views: number;

  rating: number;


  featured?: boolean;

  topRated?: boolean;

  bestSeller?: boolean;

  rare?: boolean;


  features?: string[];


  createdAt?: Date;

  updatedAt?: Date;
};