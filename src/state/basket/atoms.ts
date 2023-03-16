import uuid from "uuidv4";

import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

export interface SpecialPrice {
  quantity: number;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  specialPrice?: SpecialPrice;
}

const products: Product[] = [
  {
    id: "A",
    name: "Product A",
    price: 50,
    specialPrice: { quantity: 3, price: 130 },
  },
  {
    id: "B",
    name: "Product B",
    price: 30,
    specialPrice: { quantity: 2, price: 45 },
  },
  { id: "C", name: "Product C", price: 20 },
  { id: "D", name: "Product D", price: 15 },
];

export const basketAtom = atom<Product[]>([]);

export const productsAtom = atom<Product[]>(products);

export const productByIdAtomFamily = atomFamily((id) =>
  atom(
    (get) => {
      const products = get(productsAtom);
      return products.find((p) => p.id === id);
    },
    (get, set, product: Product) => {
      const products = get(productsAtom);
      const index = products.findIndex((p) => p.id === product.id);
      if (index === -1) {
        throw new Error("Product not found");
      }
      const newProducts = [...products];
      newProducts[index] = product;
      set(productsAtom, newProducts);
    }
  )
);

export const addNewProductAtom = atom(
  null,
  (get, set, product: Omit<Product, "id">) => {
    const products = get(productsAtom);
    set(productsAtom, [...products, { id: uuid(), ...product }]);
  }
);
