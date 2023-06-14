import React from "react";
import "./StarRating.css";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const filledStars = Math.round((rating / 100) * 6); // Calculate the number of filled stars based on the rating

  return (
    <div className="star-rating">
      {[...Array(6)].map((_, index) => (
        <span
          key={index}
          className={`star ${index < filledStars ? "filled" : ""}`}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
