"use client"

import {Product as IProduct} from "@/app/products/interfaces/product.interface";
import Grid from "@mui/material/Grid2";
import Product from './product';
import {useEffect} from "react";
import {io, Socket} from "socket.io-client";
import {API_URL} from "@/app/constants/api";
import revalidateProducts from "@/app/products/actions/revalidate-products";
import getAuthentication from "@/app/auth/actions/get-authentication";

interface ProductGridProps {
  products: IProduct[]
}

export default function ProductsGrid({products}: ProductGridProps) {
  useEffect(() => {
    let socket: Socket;
    const createSocket = async () => {
      socket = io(API_URL!, {
        auth: {
          Authentication: await getAuthentication()
        }
      });
      socket.on('product_updated', () => {
        revalidateProducts()
      })
    }

    createSocket()

    return () => {
      socket?.disconnect()
    }
  }, [])
  return (
    <Grid container spacing={3} sx={{height: '85vh', overflow: 'scroll'}}>
      {products.map((product) => (
        <Grid key={product.id} size={{xs: 12, sm: 6, lg: 4}}>
          <Product product={product}/>
        </Grid>
      ))}
    </Grid>
  );
}