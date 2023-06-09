import { useState } from "react";
import "./Dropdown-2.css";
import { ReactComponent as ChevronDown } from "../assets/icons/chevron-down-solid.svg";
import { ReactComponent as MinusSign } from "../assets/icons/minus-solid.svg";

interface DropdownProps {
  options: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [opened, setOpened] = useState(false);

  const getOptions = (): JSX.Element[] => {
    return options.map((option) => (
      <DropdownOption
        option={option}
        setSelectedOption={setSelectedOption}
        setOpened={setOpened}
        key={option}
      />
    ));
  };

  const handleButtonClick = () => {
    setOpened(!opened);
  };

  return (
    <div className="dropdown-wrapper">
      <div
        className={`dropdown-button ${opened ? "opened" : ""}`}
        onClick={handleButtonClick}
        onBlur={() => {
          setOpened(false);
        }}
        style={{ borderBottomLeftRadius: opened ? "0px" : "10px" }}
      >
        <p>{selectedOption || "Select a healthcare option"}</p>
        {opened ? (
          <MinusSign className="minus-sign" />
        ) : (
          <ChevronDown className="chevron-down" />
        )}
      </div>
      <div className={`dropdown-menu-option-panel ${opened ? "opened" : ""}`}>
        {getOptions()}
      </div>
    </div>
  );
};

interface DropdownOptionProps {
  option: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownOption: React.FC<DropdownOptionProps> = ({
  option,
  setSelectedOption,
  setOpened,
}) => {
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    setSelectedOption(option);
    setOpened(false);
  };
  return (
    <p
      className="dropdown-menu-option"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={handleClick}
    >
      {option}
    </p>
  );
};

export default Dropdown;