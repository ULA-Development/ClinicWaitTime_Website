import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { dbHandler } from "../../data/firebase";
import HereMapComponent from "./Map";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dbHandler.fetchClinics().then((clinics: any) => {
      setData(clinics);
      setLoading(false); // set loading to false once data is fetched
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // or a spinner component
  }

  return (
    <div>
      <Header selectedItem={"Home"} />
      <HereMapComponent hospitals={data}></HereMapComponent>
    </div>
  );
};

export default HomePage;
