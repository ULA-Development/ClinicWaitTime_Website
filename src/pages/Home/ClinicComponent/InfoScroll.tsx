import React, { useState } from "react";
import "./InfoScroll.css";

interface InfoScrollProps {
  texts: string[];
}

const InfoScroll: React.FC<InfoScrollProps> = ({ texts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < texts.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === texts.length - 1;

  return (
    <div className="info-scroll-container">
      <div className="info-scroll-buttons">
        <button
          className={`info-scroll-button prev ${
            isPrevDisabled ? "invisible" : ""
          }`}
          onClick={handlePrev}
          disabled={isPrevDisabled}
        >
          &lt;
        </button>
        <p className="info-scroll-text">{texts[currentIndex]}</p>
        <button
          className={`info-scroll-button next ${
            isNextDisabled ? "invisible" : ""
          }`}
          onClick={handleNext}
          disabled={isNextDisabled}
        >
          &gt;
        </button>
      </div>
      <div className="info-scroll-circles">
        {texts.map((_, index) => (
          <div
            key={index}
            className={`info-scroll-circle ${
              index === currentIndex ? "active" : ""
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default InfoScroll;
