import getProduct from "@/app/products/[productId]/get-product";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import {getProductImage} from "@/app/products/product-image";
import Grid from "@mui/material/Grid2";
import {Stack} from "@mui/material";
import Checkout from "@/app/checkout/checkout";

interface SingleProductProps {
  params: { productId: string }
}

export default async function SingleProduct({params}: SingleProductProps) {
  const product = await getProduct(+params.productId)
  return (
    <Grid container marginBottom="2rem" rowGap={3}>
      {product.imageExists && (
        <Grid size={{md: 6, xs: 12}}>
          <Image src={getProductImage(product.id)} alt={product.name} width="0" height="0"
                 className="w-full sm:w-3/4 h-auto"
                 sizes={"100vw"}/>
        </Grid>
      )}
      <Grid size={{md: 6, xs: 12}}>
        <Stack gap={3}>
          <Typography variant="h2">
            {product.name}
          </Typography>
          <Typography>{product.description}</Typography>
          <Typography variant={"h4"}>${product.price}</Typography>
          <Checkout productId={product.id}/>
        </Stack>
      </Grid>
    </Grid>
  )
}