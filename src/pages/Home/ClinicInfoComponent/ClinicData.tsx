import { HospitalWithTime } from "../../../assets/globals";
import { ReactComponent as WaitIcon } from "../../../assets/icons/chair-solid.svg";
import { ReactComponent as TravelIcon } from "../../../assets/icons/route-solid.svg";
import "./ClinicData.css";

type Location = {
  lat: number;
  lng: number;
};

interface ClinicDataProps {
  data: HospitalWithTime;
  currLocation: Location;
  hourlyData: any;
}
const ClinicData = ({ data, currLocation, hourlyData }: ClinicDataProps) => {
  const directionUrl = `https://www.google.com/maps/dir/?api=1&origin=${currLocation.lat},${currLocation.lng}&destination=${data.location.lat},${data.location.lng}`;
  const formatTime = (num: number) => {
    const hours = Math.floor(num / 60);
    const minutes = Math.round(num % 60);
    if (hours === 1) {
      return `${hours} hr ${minutes} min`;
    } else if (hours > 1) {
      return `${hours} hrs ${minutes} min`;
    } else {
      return `${minutes} min`;
    }
  };
  return (
    <div className="data-container">
      <div className="total-time">
        <span className="time-title">Total time until seen</span>
        <span style={{ fontSize: "36px" }}>{formatTime(data.totalTime)}</span>
      </div>
      <div className="time-breakdown">
        <div className="wait-time">
          <span className="time-title">Wait time</span>
          <div className="breakdown">
            <WaitIcon className="time-icon" />
            <span style={{ display: "inline", fontSize: "25px" }}>
              {formatTime(data.totalWaitTime)}
            </span>
          </div>
        </div>
        <div className="travel-time">
          <span className="time-title">Travel time</span>
          <TravelIcon className="time-icon" />
          <span style={{ display: "inline", fontSize: "25px" }}>
            {formatTime(data.travelTime)}
          </span>
        </div>
      </div>
      <div style={{ marginTop: "30px", color: "white" }}>
        <span>Hourly trends</span>
        <span style={{ color: "#bdbfbe", fontSize: "15px" }}>
          Not currently available
        </span>
        {/* <div className="trends">
          <div className="chart" style={{ height: `${hourlyData[0]}px` }} />
          <div className="chart" style={{ height: `${hourlyData[1]}px` }} />
          <div className="chart" style={{ height: `${hourlyData[2]}px` }} />
          <div className="chart" style={{ height: `${hourlyData[3]}px` }} />
          <div className="chart" style={{ height: `${hourlyData[4]}px` }} />
        </div> */}
      </div>
      <div
        className="directions-button"
        onClick={() => window.open(directionUrl, "_blank")}
      >
        Get directions
      </div>
    </div>
  );
};
export default ClinicData;
