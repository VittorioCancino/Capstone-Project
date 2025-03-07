import React, { useState } from "react";
import ProductList from "../Products/ProductsList";
//import Navbar from "../Navbar/Navbar";
import SideBar from "../Sidebar/Sidebar";
import AreasList from "../Areas/AreasList";
import StoreList from "../Stores/StoresList";
import GroupList from "../Groups/GroupList";
import MaterialList from "../Materials/MaterialList";
import ProductAreaList from "../ProductArea/ProductsAreaList";

function Home() {

  const [filter, setFilter] = useState(null);
  const [filterComponent, setFilterComponent] = useState<string | null>(null);

  const renderComponent = () => {
    switch (filterComponent) {
      case "Areas":
        return <AreasList />;
      case "Stores":
        return <StoreList />;
      case "Groups":
        return <GroupList />;
      case "Materials":
        return <MaterialList />;
      case "Products":
        return <ProductList filter={filter} />;
      default:
        return <ProductAreaList filter={filter} />;
    }
  };

  return (
    <>
      <div className="flex">
        <SideBar setFilterComponent={setFilterComponent} />
        <div className="flex-grow ml-16 mr-16">{renderComponent()}</div>
      </div>
    </>
  );
}

export default Home;