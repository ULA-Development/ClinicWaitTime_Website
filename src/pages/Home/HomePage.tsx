import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import { dbHandler } from "../../data/firebase";
import { useSelector } from "react-redux";

const HomePage = () => {
  const isMobile = useSelector((state: any) => state.isMobile.value)
  useEffect(() => {
    dbHandler.fetchClinics()
  }, [])
  return (
    <div>
      {isMobile ? <p>Mobile</p> : <p>Desktop</p>}
    </div>
  );
};

export default HomePage;
