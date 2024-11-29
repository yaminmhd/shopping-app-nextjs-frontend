"use server";

import {getHeaders, post} from "../../util/fetch";
import {revalidateTag} from "next/cache";
import {API_URL} from "@/app/constants/api";

export default async function createProduct(formData: FormData) {
  const response = await post("products", formData);
  const productImage = formData.get("image")
  if(productImage instanceof File && !Object.values(response.error).some(Boolean)) {
    await uploadProductImage(response.data.id, productImage);
  }
  revalidateTag("products");
  return response;
}

async function uploadProductImage(productId: number, file: File) {
  const formData = new FormData();
  formData.append("image", file);
  await fetch(`${API_URL}/products/${productId}/image`, {
    body: formData,
    method: 'POST',
    headers: getHeaders()
  })
}
