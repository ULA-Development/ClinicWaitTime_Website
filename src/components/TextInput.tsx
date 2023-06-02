import React, { useState, useEffect } from "react";
import { ReactComponent as EmailIcon } from "../assets/icons/envelope-solid.svg";
import { ReactComponent as PasswordIcon } from "../assets/icons/lock-solid.svg";
import { ReactComponent as NameIcon } from "../assets/icons/user-solid.svg";
import { ReactComponent as EyeIcon } from "../assets/icons/eye-slash-solid.svg";
import { ReactComponent as NPIIcon } from "../assets/icons/slack-hash.svg";
import { ReactComponent as ReferIcon } from "../assets/icons/user-friends-solid.svg";
import "./TextInput.css";

interface Props {
  onChange: (arg0: string) => void;
  value: string;
  type: string;
}

const TextInput = ({ onChange, value, type }: Props) => {
  const [focus, setFocus] = useState(false);
  const [inputInfo, setInputInfo] = useState({
    placeholder: "Email",
    icon: <EmailIcon />,
    type: "text",
  });

  useEffect(function loadData() {
    switch (type) {
      case "Name": {
        setInputInfo({
          placeholder: "Name",
          icon: <NameIcon className="icon"/>,
          type: "text",
        });
        break;
      }
      case "Password": {
        setInputInfo({
          placeholder: "Password",
          icon: <PasswordIcon className="icon"/>,
          type: "password",
        });
        break;
      }
      case "Confirm Password": {
        setInputInfo({
          placeholder: "Confirm password",
          icon: <PasswordIcon className="icon"/>,
          type: "password",
        });
        break;
      }
      case "NPI": {
        setInputInfo({
          placeholder: "NPI",
          icon: <NPIIcon className="icon"/>,
          type: "text",
        });
        break;
      }
      case "Referral": {
        setInputInfo({
          placeholder: "Referral code (optional)",
          icon: <ReferIcon className="icon"/>,
          type: "text",
        });
        break;
      }
      default: {
        setInputInfo({
          placeholder: "Email",
          icon: <EmailIcon className="icon"/>,
          type: "text",
        });
        break;
      }
    }
  }, []);

  const handleFocus = () => {
    console.log(value);
    // If text in field, don't loose focus
    if (focus == true && value == "") {
      setFocus(false);
    } else {
      setFocus(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <div className={focus != true ? "container" : "container focus"}>
      <div className={focus != true ? "background" : "background focus"}>
        <span className="label">{inputInfo.placeholder}</span>
      </div>
      {inputInfo.icon}
      {inputInfo.type === "password" ? (
        <EyeIcon className="visible-eye" />
      ) : null}
      <input
        value={value}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleFocus}
        type={inputInfo.type}
        id={type}
        className="input"
        autoComplete="off"
      />
    </div>
  );
};

export default TextInput;
