"use server";

import {get} from "@/app/util/fetch";
import {Product} from "@/app/products/interfaces/product.interface";

export default async function getProducts() {
  return get<Product[]>("products", ["products"], new URLSearchParams({status: 'available'}))
}