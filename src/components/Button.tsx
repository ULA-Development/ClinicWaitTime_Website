import { ReactNode, useState } from "react";
import icon from "../assets/icons/arrow-right-solid.svg";
import "./Button.css";

interface Props {
  children: ReactNode;
  onClick: () => void;
  width?: number;
  height?: number;
}

const Button = ({ children, onClick, width = 541.6, height = 76.5 }: Props) => {
  const [clicked, setClicked] = useState(false);
  return (
    <button
      className={`Button ${clicked ? "Button-clicked" : ""}`}
      onClick={() => {
        onClick();
        setClicked(true);
      }}
      onAnimationEnd={() => setClicked(false)}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {children}{" "}
      <img
        src={icon}
        alt="Icon"
        width="23"
        height="22"
        style={{ filter: "invert(100%)" }}
      />
    </button>
  );
};

export default Button;
