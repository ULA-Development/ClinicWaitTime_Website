import React from "react";

interface BusinessMeasureProps {
  business: number;
}

const BusinessMeasure: React.FC<BusinessMeasureProps> = ({ business }) => {
  const grayBarStyle = {
    backgroundColor: "#ccc",
    width: "10px",
    height: "40px",
    margin: "0 2px",
    borderRadius: "4px",
  };

  const getBarColor = (business: number) => {
    const green = [0, 175, 0];
    const red = [175, 0, 0];
    const ratio = business / 100;
    const color = green.map((value, index) =>
      Math.round(value + (red[index] - value) * ratio)
    );
    return `rgb(${color.join(",")})`;
  };

  const filledBarStyle = {
    backgroundColor: getBarColor(business),
    width: "10px",
    height: "40px",
    margin: "0 2px",
    borderRadius: "4px",
  };

  const numFilledBars = Math.ceil(business / 16.7);

  const bars = Array.from({ length: 6 }, (_, index) => (
    <div
      key={index}
      style={index < numFilledBars ? filledBarStyle : grayBarStyle}
    ></div>
  ));

  return <div style={{ display: "flex" }}>{bars}</div>;
};

export default BusinessMeasure;
