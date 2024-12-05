export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  imageURL: string | null;
  createdAt: Date;
}

export interface ProductsResponse {
  data: Product[];
}