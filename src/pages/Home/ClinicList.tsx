import React, { useEffect, useState } from "react";
import { HospitalWithTime } from "../../assets/globals";
import ClinicOption from "./ClinicComponent/ClinicOption";
import { busynessSetter } from "../../assets/globals";

type ClinicListProps = {
  handleSelectClinic: (index: number) => void;
  hospitals: HospitalWithTime[];
  selectedClinic: Number;
};

const ClinicListComponent = ({
  handleSelectClinic,
  hospitals,
  selectedClinic,
}: ClinicListProps) => {
  const [showMore, setShowMore] = useState(false);
  const [displayedHospitals, setDisplayedHospitals] = useState<
    HospitalWithTime[]
  >([]);

  useEffect(() => {
    if (showMore) {
      setDisplayedHospitals(hospitals);
    } else {
      setDisplayedHospitals(hospitals.slice(0, 5));
    }
  }, [showMore, hospitals]);
  return (
    <div>
      {displayedHospitals.map((hospital: any, index: number) => (
        <div key={index} onClick={() => handleSelectClinic(index)}>
          <ClinicOption
            name={hospital.info.name}
            number={String(index + 1)}
            distance={hospital.routeDistance}
            busyness={busynessSetter(hospital.totalTime)}
            rating={hospital.info.rating}
            isActive={selectedClinic === index}
          />
        </div>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignContent: "center",
          position: "absolute",
          left: "35%",
        }}
      >
        {showMore ? (
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "white",
              color: "grey",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => setShowMore(false)}
          >
            Show Less
          </button>
        ) : (
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "white",
              color: "grey",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => setShowMore(true)}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default ClinicListComponent;
