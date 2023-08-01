import "./IconMarker.css";

interface IconMarkerProps {
  busyness: number;
  index: number;
  isActive: boolean;
}

const IconMarker = ({
  busyness,
  index,
  isActive,
}: IconMarkerProps) => {
  const getColor = () => {
    // busyness ranges between 1 and 6
    if (busyness <= 2) {
      return "#32aa55"; // "#4ac36e" is a brighter green
    } else if (busyness <= 4) {
      return "#Fbb22d"; // "#Fbb22d" is a brighter yellow
    } else {
      return "#D45b5b"; // "#D45b5b" is a brighter red
    }
  };

  return (
    <div className={isActive ? "icon-container-active" : "icon-container"}>
      <div
        className="marker"
        dangerouslySetInnerHTML={{
          __html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="40" height="60"><path fill="${getColor()}" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/></svg>`,
        }}
      />
      <div className="circle">
        <span className="number">{index + 1}</span>
      </div>
    </div>
  );
};

export default IconMarker;
