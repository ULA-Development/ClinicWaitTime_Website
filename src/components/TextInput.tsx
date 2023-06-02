import React, { useState, useRef, Component } from "react";
import { ReactComponent as InputIcon } from "../assets/icons/envelope-solid.svg";
import "./TextInput.css";
import { set } from "firebase/database";

function TextInput(){
  const [focus, setFocus] = useState(false)
  const [text, setText] = useState('')

  const handleFocus = () => {
    // If text in field, don't loose focus
    if(focus == true && text == ''){
      setFocus(false)
    }else{
      setFocus(true)
    }
  }

  return (
    <div onClick={handleFocus} className="container">
      <input
        value={text}
        onBlur={handleFocus}
        onChange={(input) => setText(input.target.value)}
        type="text"
        id="id"
        className="input"
      />
      <div className={focus != true ? "background" : "background-focus"}>
        <span className="label">Password</span>
      </div>
      <InputIcon className="icon" />
    </div>
  );
};

export default TextInput;
