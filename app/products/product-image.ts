import {API_URL} from "@/app/constants/api";

export const getProductImage = (productId: number) => {
  return `${API_URL}/images/products/${productId}.jpg`
}