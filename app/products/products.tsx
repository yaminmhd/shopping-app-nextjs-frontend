import getProducts from "@/app/products/actions/get-products";
import ProductsGrid from "@/app/products/product-grid";

const Products = async () => {
  const products = await getProducts();
  return (
    <ProductsGrid products={products}/>
  );
}

export default Products