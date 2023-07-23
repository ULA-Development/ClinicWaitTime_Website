import { ReactNode, useState, useRef, useEffect } from "react";
import icon from "../assets/icons/arrow-right-solid.svg";
import "./Button.css";

interface Props {
  children: ReactNode;
  onClick: () => void;
  style?: React.CSSProperties;
  noImg?: boolean;
}

const Button = ({ children, onClick, style, noImg = false }: Props) => {
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
      style={style}
    >
      <div className="button-content" ref={buttonRef}>
        {children}{" "}
        {noImg === false ? (
          <img
            src={icon}
            alt="Icon"
            width={"20px"}
            height={"20px"}
            style={{ filter: "invert(100%)", marginLeft: "5px" }}
          />
        ) : null}
      </div>
    </button>
  );
};

export default Button;
