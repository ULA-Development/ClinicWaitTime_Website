import { ReactNode, useState } from "react";
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
      <svg
        width="23"
        height="22"
        viewBox="0 0 23 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.95701 2.12015L11.0184 1.05875C11.4678 0.609324 12.1946 0.609324 12.6392 1.05875L21.9337 10.3484C22.3831 10.7979 22.3831 11.5246 21.9337 11.9692L12.6392 21.2637C12.1898 21.7131 11.4631 21.7131 11.0184 21.2637L9.95701 20.2023C9.5028 19.7481 9.51236 19.007 9.97613 18.5624L15.7374 13.0737H1.99646C1.36058 13.0737 0.848999 12.5621 0.848999 11.9262V10.3962C0.848999 9.76036 1.36058 9.24878 1.99646 9.24878H15.7374L9.97613 3.76007C9.50758 3.31543 9.49802 2.57436 9.95701 2.12015Z"
          fill="white"
        />
      </svg>
    </button>
  );
};

export default Button;
