import React, { useState } from "react";
import SampleCards from "../Cards/SampleCards";
import Navbar from "../Navbar/Navbar";

function Home() {

  const [filter, setFilter] = useState(null);

  return (
    <>
      <Navbar setFilter={setFilter} />
      <div className="mt-24 ml-24 mr-24">
        <SampleCards filter={filter} />
      </div>
    </>
  );
}

export default Home;
