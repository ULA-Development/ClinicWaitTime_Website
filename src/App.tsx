import React from "react";
import TextInput from "./components/TextInput";
import Button from "./components/Button";
import Dropdown from "./components/Dropdown-2";

function App() {
  return (
    <div className="dropdown" style={{ width: "400px", height: "70px" }}>
      <Dropdown
        options={[
          "Walk-In Clinic",
          "Hospital",
          "Specialist",
          "Family Physician",
        ]}
      />
    </div>
  );
}

export default App;
