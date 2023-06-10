import React, { useState, useEffect } from "react";
import { ReactComponent as EmailIcon } from "../assets/icons/envelope-solid.svg";
import { ReactComponent as PasswordIcon } from "../assets/icons/lock-solid.svg";
import { ReactComponent as NameIcon } from "../assets/icons/user-solid.svg";
import { ReactComponent as EyeIcon } from "../assets/icons/eye-slash-solid.svg";
import { ReactComponent as NPIIcon } from "../assets/icons/slack-hash.svg";
import { ReactComponent as ReferIcon } from "../assets/icons/user-friends-solid.svg";
import {ReactComponent as ErrorIcon } from "../assets/icons/exclamation-circle-solid.svg"
import "./TextInput.css";

interface Props {
  onChange: (arg0: string) => void;
  value: string;
  type: string;
  errorMessage: string | null;
  setError: (arg0: any) => void;
}

const TextInput = ({ onChange, value, type, errorMessage = null, setError}: Props) => {
  const [focus, setFocus] = useState(false);
  const [iconClass, setIconClass] = useState('icon')
  const inputInfo = () => {
    switch (type) {
      case "Name": {
        return {
          placeholder: "Name",
          icon: <NameIcon className={iconClass} />,
          type: "text",
        }
      }
      case "Password": {
        return{
          placeholder: "Password",
          icon: <PasswordIcon className={iconClass} />,
          type: "password",
        }
      }
      case "Confirm Password": {
        return {
          placeholder: "Confirm password",
          icon: <PasswordIcon className={iconClass} />,
          type: "password",
        }
      }
      case "NPI": {
        return{
          placeholder: "NPI",
          icon: <NPIIcon className={iconClass} />,
          type: "text",
        }
      }
      case "Referral": {
        return{
          placeholder: "Referral code (optional)",
          icon: <ReferIcon className={iconClass} />,
          type: "text",
        }
      }
      default: {
        return{
          placeholder: "Email",
          icon: <EmailIcon className={iconClass} />,
          type: "email",
        }
      }
    }
  }
  const ErrorMessage = () => {
    return (
      <div className="error-container">
        <ErrorIcon className='error-icon'/>
        <span className="error-message">{errorMessage}</span>
      </div>
    )
  }

  function handleFocus() {
    if(errorMessage != null && focus == false){
      setError(null)
    }
    if (focus == true && value == "") {
      setFocus(false);
    } else {
      setFocus(true);
    }
  };

  function handleChange(input: React.ChangeEvent<HTMLInputElement>){
    const { value } = input.target;
    onChange(value);
  };

  useEffect(function handleError() {
    if(errorMessage != null){
      setIconClass('icon error')
      onChange('')
      setFocus(false)
    }else{
      setIconClass('icon')
    }
  }, [errorMessage]);

  return (
    <div className={errorMessage === null ? (focus === false ? "container" : "container focus") : 'container error' }>
      <span className={errorMessage === null ? (focus === false ? "label" : "label focus") : 'label error' }>{inputInfo().placeholder}</span>
      {inputInfo().icon}
      {inputInfo().type === "password" ? (
        <EyeIcon className="visible-eye" />
      ) : null}
      <input
        value={value}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleFocus}
        type={inputInfo().type}
        id={type}
        className={errorMessage === null ? 'input ': "input error"}
        autoComplete="off"
      />
      {errorMessage === null ? null : <ErrorMessage/>}
    </div>
  );
};

export default TextInput;
