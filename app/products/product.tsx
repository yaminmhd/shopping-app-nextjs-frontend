"use client"

import {Card, CardActionArea, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Product as IProduct} from "@/app/products/interfaces/product.interface";
import Image from "next/image";
import {getProductImage} from "@/app/products/product-image";
import {useRouter} from "next/navigation";

interface ProductProps {
  product: IProduct
}

const Product = ({product}: ProductProps) => {
  const router = useRouter()
  return (
    <CardActionArea onClick={() => router.push(`/products/${product.id}`)}>
      <Card className="p-4">
        <Stack gap={3}>
          <Typography variant="h4">{product.name}</Typography>
          {product.imageExists && (
            <Image
              src={getProductImage(product.id)}
              width="0"
              height="0"
              alt={product.name}
              sizes="100vw"
              className="w-full h-auto object-cover"
            />
          )}
          <Typography>{product.description}</Typography>
          <Typography>{product.price}</Typography>
        </Stack>
      </Card>
    </CardActionArea>
  )
}

export default Product