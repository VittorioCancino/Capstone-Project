import React from "react";
import ProductInfo from "./Productsinfo";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { GetAllProducts } from "../../api/ProductApi";
import AddDeleteButton from "./AddDeleteButton";

interface Product {
  Id: number;
  Material: number;
  Type: number;
  Large: number;
  Width: number;
  Thickness: number;
  Quantity: number;
  MaterialInfoName: string;
  GroupInfoName: string;
}




const ProductList = ({ filter }) => {

  const [products, setProducts] = useState<Product[]>([]);
  const [filterComponent, setFilterComponent] = useState<string | null>(null);
  const [filterCatch, setFilter] = useState<{ MaterialInfoName?: string; GroupInfoName?: string }>({});

  filter = filterCatch;

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
          MaterialInfoName: item["MaterialInfo.Name"],
          GroupInfoName: item["GroupInfo.Name"],
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

  const filteredProducts = products.filter((product) => {
    const matchesMaterial =
      !filter.MaterialInfoName || product.MaterialInfoName === filter.MaterialInfoName;
    const matchesGroup =
      !filter.GroupInfoName || product.GroupInfoName === filter.GroupInfoName;

    return matchesMaterial && matchesGroup;
  });

  return (
    <div>
      <h1 className="text-4xl underline text-center mt-6">Productos</h1>
      <div className="relative mt-8 mb-8">
        <div className="flex items-center space-x-4">
          <AddDeleteButton setFilter={setFilter} />
        </div>
      </div>
      <ProductInfo products={filteredProducts} />
    </div>
  );
};

export default ProductList;
