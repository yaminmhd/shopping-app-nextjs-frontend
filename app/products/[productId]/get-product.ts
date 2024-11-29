import {get} from "@/app/util/fetch";
import {Product} from "@/app/products/interfaces/product.interface";

export default async function getProduct(productId: number) {
  return get<Product>(`products/${productId}`)
}