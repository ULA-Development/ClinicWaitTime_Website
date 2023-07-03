import React from "react";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
const HomePage = () => {
  const isMobile = useSelector((state: any) => state.isMobile.value)
  return (
    <div>
      {isMobile ? <p>Mobile</p> : <p>Desktop</p>}
    </div>
  );
};

export default HomePage;
