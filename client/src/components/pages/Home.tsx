import React, { useState } from "react";
import SampleCards from "../Cards/SampleCards";
import Navbar from "../Navbar/Navbar";
import SideBar from "../Sidebar/Sidebar";
import AreasList from "../Areas/AreasList";
import StoreList from "../Stores/StoresList";
import GroupList from "../Groups/GroupList";
import MaterialList from "../Materials/MaterialList";

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
      default:
        return <SampleCards filter={filter} />;
    }
  };

  return (
    <>
      <Navbar setFilter={setFilter} />
      <div className="flex mt-24">
        <SideBar setFilterComponent={setFilterComponent} />
        <div className="flex-grow ml-8 mr-8">{renderComponent()}</div>
      </div>
    </>
  );
}

export default Home;