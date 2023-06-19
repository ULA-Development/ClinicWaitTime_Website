import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as EmailIcon } from "../assets/icons/envelope-solid.svg";
import { ReactComponent as PasswordIcon } from "../assets/icons/lock-solid.svg";
import { ReactComponent as NameIcon } from "../assets/icons/user-solid.svg";
import InvisEyeIcon from "../assets/icons/eye-slash-solid.svg";
import { ReactComponent as NPIIcon } from "../assets/icons/slack-hash.svg";
import VisEyeIcon from "../assets/icons/eye-solid.svg";
import { ReactComponent as ReferIcon } from "../assets/icons/user-friends-solid.svg";
import { ReactComponent as ErrorIcon } from "../assets/icons/exclamation-circle-solid.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search-solid.svg";
import "./TextInput.css";
import { set } from "firebase/database";

interface Props {
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
  setReset
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [focus, setFocus] = useState(value !== "");
  const [iconClass, setIconClass] = useState("icon");
  const [visibleText, setVisibleText] = useState(!type.includes("Password"));
  const inputInfo = () => {
    switch (type) {
      case "Search": {
        return {
          placeholder: "Location",
          icon: <SearchIcon className={iconClass} />,
        };
      }
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
    if(reset === true){
      setFocus(false)
      onChange("")
      inputRef.current?.blur()
      setReset(false)
    }
  }, [reset])

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

  return (
    <div
      className={
        errorMessage === null
          ? focus === false
            ? "container"
            : "container focus"
          : "container error"
      }
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
