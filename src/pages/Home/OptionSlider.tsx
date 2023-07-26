import React from "react";
import "./OptionSlider.css";
type OptionSliderProps = {
  active: string;
  setActive: (arg0: string) => void;
};
const OptionSlider = ({ active, setActive }: OptionSliderProps) => {
  return (
    <div className="slider-container">
        
      <div
        onClick={() => setActive("list")}
        className="option-slider"
      >
        List
      </div>
      <div
        onClick={() => setActive("map")}
        className="option-slider"
      >
        Map
      </div>
      <div className={active === "list" ? "slide-out" : "slide-in"}/>
    </div>
  );
};
export default OptionSlider;
