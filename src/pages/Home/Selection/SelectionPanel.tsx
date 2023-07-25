import React, { useState } from "react";
import "./SelectionPanel.css";
import MobileSelection from "./MobileSelection";

const SelectionPanel: React.FC = () => {
  const [resize, setResize] = useState(window.innerWidth <= 1030);
  window.addEventListener("resize", () => setResize(window.innerWidth <= 30)); //1030
  const [selectedRadioBtn, setSelectedRadioBtn] =
    React.useState("Walk-In Clinics"); //sets default selection
  const isRadioSelected = (value: string): boolean =>
    selectedRadioBtn === value;
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn(e.currentTarget.value);

  return (
    <div className={resize ? "" :"selection-panel"}>
      <h2 className="panel-heading">Select healthcare</h2>
      {resize ? (
          <MobileSelection />
      ) : (
        <div className = "selection-panel">
          <label>
            <input
              type="radio"
              name="selection-radio-btn"
              value="Walk-In Clinics"
              checked={isRadioSelected("Walk-In Clinics")}
              onChange={handleRadioClick}
              className="radio-button"
            />
            Walk-In Clinics
          </label>

          <label style={{ color: "grey", opacity: "50%" }}>
            <input
              type="radio"
              name="selection-radio-btn"
              value="Hospitals"
              checked={isRadioSelected("Hospitals")}
              onChange={handleRadioClick}
              className="radio-button"
              disabled={true}
            />
            Hospitals
          </label>

          <label style={{ color: "grey", opacity: "50%" }}>
            <input
              type="radio"
              name="selection-radio-btn"
              value="Specialists"
              checked={isRadioSelected("Specialists")}
              onChange={handleRadioClick}
              className="radio-button"
              disabled={true}
            />
            Specialists
          </label>

          <label style={{ color: "grey", opacity: "50%" }}>
            <input
              type="radio"
              name="selection-radio-btn"
              value="Family Physician"
              checked={isRadioSelected("Family Physician")}
              onChange={handleRadioClick}
              className="radio-button"
              disabled={true}
            />
            Family Physicians
          </label>
        </div>
      )}
    </div>
  );
};

export default SelectionPanel;
