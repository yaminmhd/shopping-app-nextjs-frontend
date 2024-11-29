"use server";

import {post} from "@/app/util/fetch";

export default async function checkout(productId: number) {
  return post('checkout/session', {productId});
}