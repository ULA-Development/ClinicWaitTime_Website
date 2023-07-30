import React, { useEffect, useState } from "react";
import { HospitalWithTime } from "../../assets/globals";
import ClinicOption from "./ClinicComponent/ClinicOption";
import { busynessSetter } from "../../assets/globals";

type ClinicListProps = {
  handleSelectClinic: (index: number) => void;
  selectedClinic: Number;
  displayedHospitals: any;
  setShowMore: (arg0: any) => void;
  showMore: boolean;
};

const ClinicListComponent = ({
  handleSelectClinic,
  selectedClinic,
  displayedHospitals,
  showMore,
  setShowMore
}: ClinicListProps) => {

  // useEffect(() => {
  //   if (showMore) {
  //     setDisplayedHospitals(displayedHospitals);
  //   } else {
  //     setDisplayedHospitals(displayedHospitals.slice(0, 5));
  //   }
  // }, [showMore, displayedHospitals]);
  const moreButtons = () => {
    if(showMore){
      return (<button
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
      </button>)
    }else{
      return (     <button
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
      </button>)
    }
  }
  return (
    <div>
      {displayedHospitals.map((hospital: any, index: number) => (
        <div key={index} onClick={() => handleSelectClinic(index)} style={{marginBottom:"15px"}}>
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
        {(displayedHospitals.length <= 5 && showMore === true) ? null : moreButtons()}
          
      </div>
    </div>
  );
};

export default ClinicListComponent;
