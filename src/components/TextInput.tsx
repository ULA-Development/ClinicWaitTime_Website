import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as EmailIcon } from "../assets/icons/envelope-solid.svg";
import { ReactComponent as PasswordIcon } from "../assets/icons/lock-solid.svg";
import { ReactComponent as NameIcon } from "../assets/icons/user-solid.svg";
import { ReactComponent as NPIIcon } from "../assets/icons/slack-hash.svg";
import { ReactComponent as ReferIcon } from "../assets/icons/user-friends-solid.svg";
import { ReactComponent as ErrorIcon } from "../assets/icons/exclamation-circle-solid.svg";
import { ReactComponent as LocationIcon } from "../assets/icons/map-marker-alt-solid.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/phone-solid.svg";
import { ReactComponent as WebsiteIcon } from "../assets/icons/globe-solid.svg";
import { ReactComponent as CapaIcon } from "../assets/icons/database-solid.svg";
import { ReactComponent as DocIcon } from "../assets/icons/user-doctor-solid.svg";
import { ReactComponent as ClockIcon } from "../assets/icons/clock-regular.svg";
import VisEyeIcon from "../assets/icons/eye-solid.svg";
import InvisEyeIcon from "../assets/icons/eye-slash-solid.svg";
import "./TextInput.css";

interface TextInputProps {
  onChange: (arg0: string) => void;
  value: string;
  type: string;
  errorMessage: string | null;
  setError: (arg0: any) => void;
  reset?: boolean;
  setReset: (arg0: boolean) => void;
}

const TextInput = ({
  onChange,
  value,
  type,
  errorMessage = null,
  setError,
  reset = false,
  setReset,
}: TextInputProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  window.addEventListener("resize", () =>
    setIsMobile(window.innerWidth <= 700)
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(value !== "");
  const [iconClass, setIconClass] = useState("icon");
  const [visibleText, setVisibleText] = useState(!type.includes("Password"));
  const inputInfo = () => {
    switch (type) {
      case "Name": {
        return {
          placeholder: "Name",
          icon: <NameIcon className={iconClass} />,
        };
      }
      case "Password": {
        return {
          placeholder: "Password",
          icon: <PasswordIcon className={iconClass} />,
        };
      }
      case "Phone": {
        return {
          placeholder: "Phone",
          icon: <PhoneIcon className={iconClass} />,
        };
      }
      case "Website": {
        return {
          placeholder: "Website",
          icon: <WebsiteIcon className={iconClass} />,
        };
      }
      case "Full Address": {
        return {
          placeholder: "Address",
          icon: <LocationIcon className={iconClass} />,
        };
      }
      case "numDoctors": {
        return {
          placeholder: "NumDoctors",
          icon: <DocIcon className={iconClass} />,
        };
      }
      case "capacity": {
        return {
          placeholder: "Capacity",
          icon: <CapaIcon className={iconClass} />,
        };
      }
      case "avgWaitTime": {
        return {
          placeholder: "AvgWaitTime",
          icon: <ClockIcon className={iconClass} />,
        };
      }

      case "Confirm Password": {
        return {
          placeholder: "Confirm password",
          icon: <PasswordIcon className={iconClass} />,
        };
      }
      case "NPI": {
        return {
          placeholder: "NPI",
          icon: <NPIIcon className={iconClass} />,
        };
      }
      case "Referral": {
        return {
          placeholder: "Referral code",
          icon: <ReferIcon className={iconClass} />,
        };
      }
      default: {
        return {
          placeholder: "Email",
          icon: <EmailIcon className={iconClass} />,
        };
      }
    }
  };
  const ErrorMessage = () => {
    return (
      <div className="error-container">
        <ErrorIcon className="error-icon" />
        <span className="error-message">{errorMessage}</span>
      </div>
    );
  };

  useEffect(() => {
    if (reset === true) {
      setFocus(false);
      onChange("");
      inputRef.current?.blur();
      setReset(false);
    }
  }, [reset]);

  useEffect(
    function handleError() {
      if (errorMessage != null) {
        setIconClass("icon error");
        onChange("");
        setFocus(false);
      } else {
        setIconClass("icon");
      }
    },
    [errorMessage]
  );
  function handleFocus() {
    if (errorMessage !== null && focus === false) {
      setError(null);
    }
    if (value === "" && focus === true) {
      setFocus(false);
    } else {
      setFocus(true);
    }
  }

  function handleChange(input: React.ChangeEvent<HTMLInputElement>) {
    const { value } = input.target;
    onChange(value);
  }

  return (
    <div
      className={
        errorMessage === null
          ? focus === false
            ? "container"
            : "container focus"
          : "container error"
      }
      style={isMobile ? { width: "100%" } : { width: "515px" }}
    >
      <span
        className={
          errorMessage === null
            ? focus === false
              ? "label"
              : "label focus"
            : "label error"
        }
      >
        {inputInfo().placeholder}
      </span>
      {inputInfo().icon}
      <input
        value={value}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleFocus}
        type={visibleText ? "text" : "password"}
        ref={inputRef}
        id={type}
        className={errorMessage === null ? "input " : "input error"}
        autoComplete="off"
      />
      {type === "Password" || type === "Confirm Password" ? (
        <img
          src={visibleText ? VisEyeIcon : InvisEyeIcon}
          alt="Icon"
          className="visible-eye"
          onClick={() => {
            setVisibleText(!visibleText);
          }}
        />
      ) : null}
      {errorMessage && <ErrorMessage />}
    </div>
  );
};

export default TextInput;
