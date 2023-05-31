import { ReactNode, useState } from "react";
import { ReactComponent as RightArrow} from "../assets/icons/arrow-right-solid.svg"
import { Interface } from "readline";
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
      <RightArrow/>
    </button>
  );
};

export default Button;
