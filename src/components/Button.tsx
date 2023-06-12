import { ReactNode, useState, useRef, useEffect } from "react";
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
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (button) {
      const buttonHeight = button.offsetHeight;
      const fontSize = buttonHeight * 1; // Adjust the multiplier as needed
      button.style.fontSize = `${fontSize}px`;
    }
  }, []);
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
      <div className="button-content" ref={buttonRef}>
        {children}{" "}
        <img
          src={icon}
          alt="Icon"
          width={width / 18 + "px"}
          height={height / 2.75 + "px"}
          style={{ filter: "invert(100%)" }}
        />
      </div>
    </button>
  );
};

export default Button;
