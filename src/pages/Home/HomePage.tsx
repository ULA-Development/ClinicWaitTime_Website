import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { dbHandler } from "../../data/firebase";
import HereMapComponent from "./Map";

const HomePage = () => {
  // const isMobile = useSelector((state: any) => state.isMobile.value);
  const [data, setData] = useState([]);
  useEffect(() => {
    dbHandler.fetchClinics().then((clinics: any) => {
      setData(clinics);
    });
  }, []);

  return (
    <div>
      <Header selectedItem={"Home"} />
      <HereMapComponent hospitals={data}></HereMapComponent>
    </div>
  );
};

export default HomePage;
