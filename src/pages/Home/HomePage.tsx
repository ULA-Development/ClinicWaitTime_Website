import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import { dbHandler } from "../../data/firebase";

const HomePage = () => {
  useEffect(() => {
    dbHandler.fetchClinics()
  }, [])
  
  return (
    <div>
      <Header selectedItem={"Home"} />
      Home
    </div>
  );
};

export default HomePage;
