import { atom } from "jotai";
import { basketAtom, productsAtom } from "./atoms";

export const totalPriceAtom = atom<number>((get) => {
  const basket = get(basketAtom);
  const products = get(productsAtom);
  let totalPrice = 0;

  products.forEach((product) => {
    const count = basket.filter((p) => p.id === product.id).length;
    let price = 0;

    if (product.specialPrice) {
      const { quantity, price: specialPrice } = product.specialPrice;
      const normalPriceCount = count % quantity;
      const specialPriceCount = (count - normalPriceCount) / quantity;

      price =
        specialPriceCount * specialPrice + normalPriceCount * product.price;
    } else {
      price = count * product.price;
    }

    totalPrice += price;
  });

  return totalPrice;
});

export const totalPriceSummaryAtom = atom<{
  totalPrice: number;
  totalPriceWithoutDiscount: number;
  discounts: string[];
}>((get) => {
  const basket = get(basketAtom);
  const products = get(productsAtom);
  let totalPrice = 0;
  let totalPriceWithoutDiscount = 0;
  const discounts: string[] = [];

  products.forEach((product) => {
    const count = basket.filter((p) => p.id === product.id).length;
    let price = 0;

    if (product.specialPrice) {
      const { quantity, price: specialPrice } = product.specialPrice;
      const normalPriceCount = count % quantity;
      const specialPriceCount = (count - normalPriceCount) / quantity;

      price =
        specialPriceCount * specialPrice + normalPriceCount * product.price;

      // Add discount summary to list of discounts
      const discountQuantity = count - normalPriceCount;
      if (discountQuantity > 0) {
        const discountDescription = `${quantity} x ${specialPrice}€ (x${
          discountQuantity / quantity
        })`;
        discounts.push(`${product.name}: ${discountDescription}`);
      }
    } else {
      price = count * product.price;
    }

    totalPrice += price;
    totalPriceWithoutDiscount += count * product.price;
  });

  return { totalPrice, totalPriceWithoutDiscount, discounts };
});
