import React, { useState } from "react";
import Header from "../../components/Header/Header";
import TextInput from "../../components/TextInput";
import SmallFooter from "../../components/SmallFooter";
import Button from "../../components/Button";
import { ReactComponent as SignupIcon } from "../../assets/icons/folder-plus-solid.svg";
import { dbHandler } from "../../data/firebase";
import "./register.css";
import { useSelector } from "react-redux";
import { getCoordinates } from "../../data/mapdata";

const RegisterPage = () => {
  const isMobile = useSelector((state: any) => state.isMobile.value);
  const [resetInput, setResetInput] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [addressText, setAddressText] = useState("");
  const [phoneText, setPhoneText] = useState("");
  const [websiteText, setWebsiteText] = useState("");

  const [nameText, setNameText] = useState("");
  const [numDoctorsText, setNumDoctorsText] = useState("");
  const [capacityText, setCapacityText] = useState("");
  const [avgWaitTimeText, setAvgWaitTimeText] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState<null | string>(null);
  const [addressErrorMessage, setAddressErrorMessage] = useState<null | string>(
    null
  );
  const [phoneErrorMessage, setPhoneErrorMessage] = useState<null | string>(
    null
  );
  const [websiteErrorMessage, setWebsiteErrorMessage] = useState<null | string>(
    null
  );
  const [emailErrorMessage, setEmailErrorMessage] = useState<null | string>(
    null
  );
  const [numDoctorsErrorMessage, setNumDoctorsErrorMessage] = useState<
    null | string
  >(null);
  const [capacityErrorMessage, setCapacityErrorMessage] = useState<
    null | string
  >(null);
  const [avgWaitTimeErrorMessage, setAvgWaitTimeErrorMessage] = useState<
    null | string
  >(null);

  const handleRegister = () => {
    // check if nameText contains letters and spaces only
    if (!/^[a-zA-Z\s-]+$/.test(nameText)) {
      setNameErrorMessage("Name can only contain letters");
      return;
    }
    if (addressText.length === 0) {
      setAddressErrorMessage("Address cannot be empty");
      return;
    }
    if (nameText.length === 0) {
      setNameErrorMessage("Name cannot be empty");
      return;
    }
    if (!/^[0-9]+$/.test(numDoctorsText) && numDoctorsText !== "") {
      setNumDoctorsErrorMessage("Number of doctors must be a number");
      return;
    }
    if (!/^[0-9]+$/.test(capacityText) && capacityText !== "") {
      setCapacityErrorMessage("Capacity must be a number");
      return;
    }
    if (!/^[0-9]+$/.test(avgWaitTimeText) && avgWaitTimeText !== "") {
      setAvgWaitTimeErrorMessage("Average wait time must be a number");
      return;
    }

    try {
      getCoordinates(addressText).then((coords) => {
        if (coords === undefined) {
          setAddressErrorMessage("Address not found");
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
          setPhoneErrorMessage("Phone number must be 10 digits");
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

        dbHandler.createClinic(clinicData);
        alert("Clinic created successfully");
        setResetInput(true);
      });
    } catch (error) {
      setAddressErrorMessage("Address not found");
    }
  };
  return (
    <div>
      <Header selectedItem={"Signup"} />
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
              errorMessage={nameErrorMessage}
              setError={setNameErrorMessage}
              reset={resetInput}
              setReset={setResetInput}
            />
            <TextInput
              value={addressText}
              onChange={setAddressText}
              type="Full Address"
              errorMessage={addressErrorMessage}
              setError={setAddressErrorMessage}
              reset={resetInput}
              setReset={setResetInput}
            />
            <TextInput
              value={emailText}
              onChange={setEmailText}
              type="Email"
              errorMessage={emailErrorMessage}
              setError={setEmailErrorMessage}
              reset={resetInput}
              setReset={setResetInput}
            />
            <TextInput
              value={phoneText}
              onChange={setPhoneText}
              type="Phone"
              errorMessage={phoneErrorMessage}
              setError={setPhoneErrorMessage}
              reset={resetInput}
              setReset={setResetInput}
            />
            <TextInput
              value={websiteText}
              onChange={setWebsiteText}
              type="Website"
              errorMessage={websiteErrorMessage}
              setError={setWebsiteErrorMessage}
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
                errorMessage={numDoctorsErrorMessage}
                setError={setNumDoctorsErrorMessage}
                reset={resetInput}
                setReset={setResetInput}
              />
              <TextInput
                value={capacityText}
                onChange={setCapacityText}
                type="capacity"
                errorMessage={capacityErrorMessage}
                setError={setCapacityErrorMessage}
                reset={resetInput}
                setReset={setResetInput}
              />
              <TextInput
                value={avgWaitTimeText}
                onChange={setAvgWaitTimeText}
                type="avgWaitTime"
                errorMessage={avgWaitTimeErrorMessage}
                setError={setAvgWaitTimeErrorMessage}
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
