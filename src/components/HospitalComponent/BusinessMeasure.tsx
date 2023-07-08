import React from "react";
interface BusinessMeasureProps {
  busyness: number;
  greyBarColor: string;
}

const BusinessMeasure: React.FC<BusinessMeasureProps> = ({ busyness, greyBarColor }) => {
  const getBarColor = (busyness: number) => {
    // Business ranges between 1 and 6
    if(busyness <= 2){
      return '#ccdca4'
    }else if(busyness <= 4){
      return '#f1b84a'
    }else{
      return '#e1897b'
    }
  };

  const grayBarStyle = {
    backgroundColor: greyBarColor,
    width: "9px",
    height: "23px",
    margin: "0 1.5px",
    borderRadius: "10px",
  };

  const filledBarStyle = {
    backgroundColor: getBarColor(busyness),
    width: "9px",
    height: "23px",
    margin: "0 1.5px",
    borderRadius: "10px",
  };

  const bars = Array.from({ length: 6 }, (_, index) => (
    <div
      key={index}
      style={index < busyness ? filledBarStyle : grayBarStyle}
    ></div>
  ));

  return <div style={{ display: "flex" }}>{bars}</div>;
};

export default BusinessMeasure;
