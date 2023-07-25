import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./MobileSelection.css"
import { useState } from "react";

const MobileSelection = () => {
  const options = [
    "Walk-In Clinics",
    // "Specialists",
    // "Hospitals",
    // "Family Physicians",
  ];
  const [focus, setFocus] = useState(false)
  return (
    <Dropdown
      options={options}
      value={options[0]}
      onFocus={() => setFocus(!focus)}
      onChange={() => setFocus(!focus)}
      placeholder="Select an option"
      controlClassName={focus ? "control-focus" : "control"}
      menuClassName="menu"
      className="main"
    />
  );
};
export default MobileSelection;
