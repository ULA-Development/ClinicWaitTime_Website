import { useState } from "react";
import "./Dropdown-2.css";

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

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setOpened(false);
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-dash-lg"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-down"
            viewBox="0 0 16 16"
          >
            <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
          </svg>
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
      style={{
        backgroundColor: hover ? "#DCDCDC" : "white",
      }}
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
