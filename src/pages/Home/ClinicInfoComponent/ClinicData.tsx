import React from "react";
import "./ClinicData.css";
import { ReactComponent as WaitIcon } from "../../../assets/icons/chair-solid.svg";
import { ReactComponent as TravelIcon } from "../../../assets/icons/route-solid.svg";
import { wait } from "@testing-library/user-event/dist/utils";
interface ClinicDataProps {
  waitTime: number;
  travelTime: number;
  totalTime: number;
}
const ClinicData: React.FC<ClinicDataProps> = ({
  waitTime,
  travelTime,
  totalTime,
}) => {
  const formatTime = (num: number) => {
    const hours = Math.floor(num / 60)
    const minutes = Math.round(num % 60)
    if(hours === 1){
      return `${hours} hr ${minutes} min`
    }else if (hours > 1){
      return `${hours} hrs ${minutes} min`
    }else{
      return `${minutes} min`
    }

  }
  return (
    <div className="data-container">
      <div className="total-time">
        <span className="time-title">Total time until seen</span>
        <span style={{ fontSize: "36px" }}>{formatTime(totalTime)}</span>
      </div>
      <div className="time-breakdown">
        <div className="wait-time">
          <span className="time-title">Wait time</span>
          <div className="breakdown">
            <WaitIcon className="time-icon" />
            <span style={{ display: "inline", fontSize: "25px" }}>{formatTime(waitTime)}</span>
          </div>
        </div>
        <div className="travel-time">
          <span className="time-title">Travel time</span>
          <TravelIcon className="time-icon" />
          <span style={{ display: "inline", fontSize: "25px" }}>{formatTime(travelTime)}</span>
        </div>
      </div>
      <div style={{ marginTop: "40px" }}>
        <span>Hourly trends</span>
        <div className="trends">
          <div className="chart" style={{ height: "30px" }} />
          <div className="chart" style={{ height: "40px" }} />
          <div className="chart" style={{ height: "50px" }} />
          <div className="chart" style={{ height: "60px" }} />
          <div className="chart" style={{ height: "20px" }} />
        </div>
      </div>
    </div>
  );
};
export default ClinicData;
