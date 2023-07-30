import { ReactNode, useState, useRef, useEffect } from "react";
import icon from "../assets/icons/arrow-right-solid.svg";
import "./Button.css";
import { AnyTxtRecord } from "dns";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  noImg?: boolean;
  typeOf?: any
}

const Button = ({ children, onClick = () => null, style, noImg = false, typeOf = "button" }: Props) => {
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
      type={typeOf}
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
