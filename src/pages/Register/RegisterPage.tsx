import React, { useState } from "react";
import { ReactComponent as SignupIcon } from "../../assets/icons/folder-plus-solid.svg";
import Header from "../../components/Header/Header";
import TextInput from "../../components/TextInput";
import SmallFooter from "../../components/SmallFooter";
import Button from "../../components/Button";
import { dbHandler } from "../../data/firebase";
import { getCoordinates } from "../../data/mapdata";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  window.addEventListener("resize", () =>
    setIsMobile(window.innerWidth <= 700)
  );
  const [resetInput, setResetInput] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [addressText, setAddressText] = useState("");
  const [phoneText, setPhoneText] = useState("");
  const [websiteText, setWebsiteText] = useState("");
  const [starsText, setStarsText] = useState("");
  const [hoursText, setHoursText] = useState("");
  const [nameText, setNameText] = useState("");
  const [numDoctorsText, setNumDoctorsText] = useState("");
  const [capacityText, setCapacityText] = useState("");
  const [avgWaitTimeText, setAvgWaitTimeText] = useState("");

  const handleRegister = () => {
    // check if nameText contains letters and spaces only
    if (!/^[a-zA-Z\s-]+$/.test(nameText)) {
      alert("Name can only contain letters");
      return;
    }
    if (addressText.length === 0) {
      alert("Address cannot be empty");
      return;
    }
    if (nameText.length === 0) {
      alert("Name cannot be empty");
      return;
    }
    if (!/^[0-9]+$/.test(numDoctorsText) && numDoctorsText !== "") {
      alert("Number of doctors must be a number");
      return;
    }
    if (!/^[0-9]+$/.test(capacityText) && capacityText !== "") {
      alert("Capacity must be a number");
      return;
    }
    if (!/^[0-9]+$/.test(avgWaitTimeText) && avgWaitTimeText !== "") {
      alert("Average wait time must be a number");
      return;
    }

    getCoordinates(addressText)
      .then((coords) => {
        if (coords === undefined) {
          alert("Address not found");
          return;
        }
        const occupancy = {
          current: 0,
          capacity: capacityText !== "" ? Number(capacityText) : 0,
          avgWaitTime: avgWaitTimeText !== "" ? Number(avgWaitTimeText) : 0,
          numDoctors: numDoctorsText !== "" ? Number(numDoctorsText) : 0,
        };

        let coordsString = coords.lat + "|" + coords.lng;
        coordsString = coordsString.replace(/\./g, "*");
        let clinicData: any = {
          name: nameText,
          address: addressText,
          coords: coordsString,
          occupancy: occupancy,
          phoneNumber: "Not currently available",
          email: "Not currently available",
          website: "Not currently available",
        };
        if (
          phoneText.length !== 10 &&
          !/^[0-9]+$/.test(phoneText) &&
          phoneText !== ""
        ) {
          alert("Phone number must be 10 digits");
          return;
        }
        if (phoneText !== "") {
          const phoneNumber =
            "(" +
            phoneText.slice(0, 3) +
            ") " +
            phoneText.slice(3, 6) +
            "-" +
            phoneText.slice(6, 10);
          clinicData.phoneNumber = phoneNumber;
        }
        if (emailText !== "") {
          clinicData.email = emailText;
        }
        if (websiteText !== "") {
          clinicData.website = websiteText;
        }
        clinicData.rating = Number(starsText);
        clinicData.hours = hoursText;
        dbHandler.createClinic(clinicData);
        alert("Clinic created successfully");
        setResetInput(true);
      })
      .catch(() => alert("Address not found!"));
  };
  return (
    <div>
      <Header />
      <div className="content-container-register">
        <div
          className="content-register"
          style={isMobile ? { width: "95%" } : { width: "515px" }}
        >
          <div className="title">
            <SignupIcon className="sign-in-logo" />
            <span className="title">Register new clinic</span>
          </div>
          <div className="input-fields-register">
            <TextInput
              value={nameText}
              onChange={setNameText}
              type="Name"
              reset={resetInput}
              setReset={setResetInput}
            />
            <TextInput
              value={addressText}
              onChange={setAddressText}
              type="Full Address"
              reset={resetInput}
              setReset={setResetInput}
            />
            <TextInput
              value={emailText}
              onChange={setEmailText}
              type="Email"
              reset={resetInput}
              setReset={setResetInput}
            />
            <TextInput
              value={phoneText}
              onChange={setPhoneText}
              type="Phone"
              reset={resetInput}
              setReset={setResetInput}
            />
            <TextInput
              value={websiteText}
              onChange={setWebsiteText}
              type="Website"
              reset={resetInput}
              setReset={setResetInput}
            />
            <TextInput
              value={hoursText}
              onChange={setHoursText}
              type="hoursOperation"
              reset={resetInput}
              setReset={setResetInput}
            />
            <TextInput
              value={starsText}
              onChange={setStarsText}
              type="stars"
              reset={resetInput}
              setReset={setResetInput}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TextInput
                value={numDoctorsText}
                onChange={setNumDoctorsText}
                type="numDoctors"
                reset={resetInput}
                setReset={setResetInput}
              />
              <TextInput
                value={capacityText}
                onChange={setCapacityText}
                type="capacity"
                reset={resetInput}
                setReset={setResetInput}
              />
              <TextInput
                value={avgWaitTimeText}
                onChange={setAvgWaitTimeText}
                type="avgWaitTime"
                reset={resetInput}
                setReset={setResetInput}
              />
            </div>
          </div>
          <div
            style={
              isMobile
                ? { width: "100%" }
                : { width: "70%", alignSelf: "center" }
            }
          >
            <Button onClick={() => handleRegister()}>
              Register new clinic
            </Button>
          </div>
        </div>
      </div>
      <SmallFooter />
    </div>
  );
};

export default RegisterPage;
