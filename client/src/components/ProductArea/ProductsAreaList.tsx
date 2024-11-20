import React from "react";
import ProductAreaInfo from "./ProductAreainfo";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { GetAllProductAreas } from "../../api/ProductAreaApi";
import AddDeleteButton from "./AddDeleteButton";

interface ProductArea {
  Id: number
  ProductId: number,
  AreaId: number,
  UID: string
}




const ProductList = ({ filter }) => {

  const [products, setProducts] = useState<ProductArea[]>([]);
  const [filterComponent, setFilterComponent] = useState<string | null>(null);
  const [filterCatch, setFilter] = useState<{ ProductId?: number; AreaId?: number }>({});

  filter = filterCatch;

  const { data, error, isError, isLoading } = useQuery(
    "productareas",
    GetAllProductAreas,
    {
      onSuccess: (data) => {
        setProducts(data.data);
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
      !filter.ProductId || product.ProductId === filter.ProductId;
    const matchesGroup =
      !filter.AreaId || product.AreaId === filter.AreaId;

    return matchesMaterial && matchesGroup;
  });

  return (
    <div>
      <h1 className="text-4xl underline text-center mt-6">Inventario</h1>
      <div className="relative mt-8 mb-8">
        <div className="flex items-center space-x-4">
          <AddDeleteButton setFilter={setFilter} />

        </div>
      </div>
      <ProductAreaInfo products={filteredProducts} />

    </div>
  );
};

export default ProductList;
