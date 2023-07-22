import React from "react";

interface CustomMarkerProps {
  index: number;
  busyness: number;
  isActive: boolean;
  UserLocation: {
    lat: number;
    lng: number;
  };
  hospital: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

const CustomMarker: React.FC<CustomMarkerProps> = ({
  index,
  busyness,
  isActive,
}) => {
  let backgroundColor;
  if (busyness <= 2) {
    backgroundColor = "green"; // Brighter green
  } else if (busyness <= 4) {
    backgroundColor = "#ffb74d"; // Brighter yellow
  } else {
    backgroundColor = "red"; // Brighter red
  }
  const size = isActive ? "40px" : "30px";

  return (
    <div
      style={{
        backgroundColor,
        width: size,
        height: size,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        cursor: "pointer",
      }}
    >
      {index + 1}{" "}
      {/* Displaying the index inside the marker, with 1-based indexing */}
    </div>
  );
};

export default CustomMarker;
