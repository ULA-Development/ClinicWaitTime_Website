import React from "react";
import { ReactComponent as Full } from "../../assets/icons/star-solid.svg";
import { ReactComponent as Empty } from "../../assets/icons/star-regular.svg";
import { ReactComponent as Half } from "../../assets/icons/star-half-alt-solid.svg";
import "./StarRating.css";

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  // Rating ranges between 0-5 and can have .5
  const stars = () => {
    const stars: any = [];
    // Get filled stars
    for (var i = 0; i < Math.floor(rating); i++) {
      stars.push({
        starType: <Full className="star" />,
        id: i,
      });
    }
    //Add half star if needed
    if (rating % 1 !== 0) {
      stars.push({
        starType: <Half className="star" />,
        id: 5 - rating,
      });
    }
    // Add remaining empty stars
    for (var i = Math.ceil(rating); i < 5; i++) {
      stars.push({
        starType: <Empty className="star" />,
        id: i,
      });
    }
    return stars;
  };

  return (
    <div className="star-rating">
      {stars().map((item: any) => (
        <div key={item.id}>{item.starType}</div>
      ))}
    </div>
  );
};

export default StarRating;
