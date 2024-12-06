export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageURL: string | null;
}

export interface ProductsResponse {
  data: Product[];
}