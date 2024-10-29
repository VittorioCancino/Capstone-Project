import React from "react";
import ProductList from "./ProductList";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { GetAllProducts } from "../../api/ProductApi";
import { string } from "zod";

interface Product {
  Id: number;
  Material: number;
  Type: number;
  Large: number;
  Width: number;
  Thickness: number;
  Quantity: number;
  MaterialInfoId: number; // Cambiado de 'MaterialInfo.Id'
  MaterialInfoName: string; // Cambiado de 'MaterialInfo.Name'
  TypeInfoId: number; // Cambiado de 'TypeInfo.Id'
  TypeInfoName: string; // Cambiado de 'TypeInfo.Name'
}
const SampleCards = ({ filter }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const { data, error, isError, isLoading } = useQuery(
    "products",
    GetAllProducts,
    {
      onSuccess: (data) => {
        const mappedProducts = data.data.map((item) => ({
          Id: item.Id,
          Material: item.Material,
          Type: item.Type,
          Large: item.Large,
          Width: item.Width,
          Thickness: item.Thickness,
          Quantity: item.Quantity,
          MaterialInfoId: item["MaterialInfo.Id"], // Usando el campo correcto
          MaterialInfoName: item["MaterialInfo.Name"], // Usando el campo correcto
          TypeInfoId: item["TypeInfo.Id"], // Usando el campo correcto
          TypeInfoName: item["TypeInfo.Name"], // Usando el campo correcto
        }));
        setProducts(mappedProducts);
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // Log para ver el filter y los nombres que se comparan
  console.log("Filter:", filter);
  console.log(
    "Product Names:",
    products.map((product) => product.MaterialInfoName)
  );

  const filteredProducts = filter
    ? products.filter((product) => product.MaterialInfoName === filter)
    : products;

  return (
    <div>
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default SampleCards;
