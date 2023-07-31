import React, { useEffect, useState } from "react";
import { HospitalWithTime } from "../../assets/globals";
import ClinicOption from "./ClinicComponent/ClinicOption";
import { busynessSetter } from "../../assets/globals";

type ClinicListProps = {
  topHospitals: HospitalWithTime[];
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
  setShowMore,
  topHospitals
}: ClinicListProps) => {

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
    <div style={{backgroundColor:"transparent", top: "20px"}}>
      {displayedHospitals.map((hospital: any, index: number) => (
        <div key={index} onClick={() => handleSelectClinic(index)} style={{paddingTop: "15px"}}>
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
          marginTop: "10px",
          justifyContent: "center",
        }}
      > 
        {(topHospitals.length <= 5 ) ? null : moreButtons()}
          
      </div>
    </div>
  );
};

export default ClinicListComponent;
