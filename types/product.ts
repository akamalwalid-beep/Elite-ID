export type Product = {
  id: number;

  title: string;

  slug: string;

  country: string;

  price: number;

  currency: string;

  rating: number;

  featured: boolean;

  image: string;

  description?: string;

  stock: number;

  views: number;

  createdAt?: string | Date;

  updatedAt?: string | Date;
};