import React from "react";
import ProductGrid from "./ProductGrid";

const SampleCards = ({ filter }) => {
  const productList = [
    {
      Id: 1,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSA15x30cm35mc",
      Available: 20,
      Inventory: 100,
      MinStock: 10,
      LastRestock: "2024-10-01",
    },

    {
      Id: 2,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSAVACIO30X30cm80mc",
      Available: 15,
      Inventory: 80,
      MinStock: 5,
      LastRestock: "2024-09-15",
    },
    {
      Id: 1,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSA15x30cm35mc",
      Available: 20,
      Inventory: 100,
      MinStock: 10,
      LastRestock: "2024-10-01",
    },

    {
      Id: 2,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSAVACIO30X30cm80mc",
      Available: 15,
      Inventory: 80,
      MinStock: 5,
      LastRestock: "2024-09-15",
    },
    {
      Id: 1,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSA15x30cm35mc",
      Available: 20,
      Inventory: 100,
      MinStock: 10,
      LastRestock: "2024-10-01",
    },

    {
      Id: 2,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSAVACIO30X30cm80mc",
      Available: 15,
      Inventory: 80,
      MinStock: 5,
      LastRestock: "2024-09-15",
    },
    {
      Id: 1,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSA15x30cm35mc",
      Available: 20,
      Inventory: 100,
      MinStock: 10,
      LastRestock: "2024-10-01",
    },

    {
      Id: 2,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSAVACIO30X30cm80mc",
      Available: 15,
      Inventory: 80,
      MinStock: 5,
      LastRestock: "2024-09-15",
    },
    {
      Id: 1,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSA15x30cm35mc",
      Available: 20,
      Inventory: 100,
      MinStock: 10,
      LastRestock: "2024-10-01",
    },

    {
      Id: 2,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSAVACIO30X30cm80mc",
      Available: 15,
      Inventory: 80,
      MinStock: 5,
      LastRestock: "2024-09-15",
    },
    {
      Id: 1,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSA15x30cm35mc",
      Available: 20,
      Inventory: 100,
      MinStock: 10,
      LastRestock: "2024-10-01",
    },

    {
      Id: 2,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSAVACIO30X30cm80mc",
      Available: 15,
      Inventory: 80,
      MinStock: 5,
      LastRestock: "2024-09-15",
    },
    {
      Id: 1,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSA15x30cm35mc",
      Available: 20,
      Inventory: 100,
      MinStock: 10,
      LastRestock: "2024-10-01",
    },

    {
      Id: 2,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSAVACIO30X30cm80mc",
      Available: 15,
      Inventory: 80,
      MinStock: 5,
      LastRestock: "2024-09-15",
    },
    {
      Id: 1,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSA15x30cm35mc",
      Available: 20,
      Inventory: 100,
      MinStock: 10,
      LastRestock: "2024-10-01",
    },

    {
      Id: 2,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSAVACIO30X30cm80mc",
      Available: 15,
      Inventory: 80,
      MinStock: 5,
      LastRestock: "2024-09-15",
    },
    {
      Id: 1,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSA15x30cm35mc",
      Available: 20,
      Inventory: 100,
      MinStock: 10,
      LastRestock: "2024-10-01",
    },

    {
      Id: 2,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSAVACIO30X30cm80mc",
      Available: 15,
      Inventory: 80,
      MinStock: 5,
      LastRestock: "2024-09-15",
    },
    {
      Id: 1,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSA15x30cm35mc",
      Available: 20,
      Inventory: 100,
      MinStock: 10,
      LastRestock: "2024-10-01",
    },

    {
      Id: 2,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSAVACIO30X30cm80mc",
      Available: 15,
      Inventory: 80,
      MinStock: 5,
      LastRestock: "2024-09-15",
    },
    {
      Id: 1,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSA15x30cm35mc",
      Available: 20,
      Inventory: 100,
      MinStock: 10,
      LastRestock: "2024-10-01",
    },

    {
      Id: 2,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSAVACIO30X30cm80mc",
      Available: 15,
      Inventory: 80,
      MinStock: 5,
      LastRestock: "2024-09-15",
    },
    {
      Id: 1,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "Tela",
      Available: 20,
      Inventory: 100,
      MinStock: 10,
      LastRestock: "2024-10-01",
    },

    {
      Id: 2,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "Piedra",
      Available: 15,
      Inventory: 80,
      MinStock: 5,
      LastRestock: "2024-09-15",
    },
    {
      Id: 1,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "PPNBOLSA15x30cm35mc",
      Available: 20,
      Inventory: 100,
      MinStock: 10,
      LastRestock: "2024-10-01",
    },

    {
      Id: 2,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "Rocas",
      Available: 15,
      Inventory: 80,
      MinStock: 5,
      LastRestock: "2024-09-15",
    },
    {
      Id: 1,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "Bolsa",
      Available: 20,
      Inventory: 100,
      MinStock: 10,
      LastRestock: "2024-10-01",
    },

    {
      Id: 2,
      Image: "/bolsa-de-plastico-en-caida-libre.jpeg",
      Title: "Bobina",
      Available: 15,
      Inventory: 80,
      MinStock: 5,
      LastRestock: "2024-09-15",
    },
  ];

  const filteredProducts = filter
    ? productList.filter((product) => product.Title === filter)
    : productList;

  return (
    <div>
      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default SampleCards;
