import { ReactNode, useState, useRef, useEffect } from "react";
import icon from "../assets/icons/arrow-right-solid.svg";
import "./Button.css";

interface Props {
  children: ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick}: Props) => {
  const [clicked, setClicked] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  return (
    <button
      className={`Button ${clicked ? "Button-clicked" : ""}`}
      onClick={() => {
        onClick();
        setClicked(true);
      }}
      onAnimationEnd={() => setClicked(false)}
    >
      <div className="button-content" ref={buttonRef}>
        {children}{" "}
        <img
          src={icon}
          alt="Icon"
          width={"20px"}
          height={"20px"}
          style={{ filter: "invert(100%)", marginLeft: "5px" }}
        />
      </div>
    </button>
  );
};

export default Button;