import React, { useState, useRef } from "react";
import "./Counter.css";

function Counter(props) {
  const [curValue, setCurValue] = useState(5);
  const inputRef = useRef(null);
  let startFlag = false;
  const timerRef = useRef(null);

  if (startFlag === false) startFlag = props.startFlag;

  console.log(startFlag);

  const changeValue = (newValue) => {
    setCurValue(newValue !== 100 ? newValue : 99);
  };

  const handleValueChange = (newValue, isField) => {
    newValue = parseInt(newValue, 10);

    if (!newValue) {
      if (isField) {
        newValue = "";
      } else {
        newValue = 0;
      }
    }
    if (newValue < 0) {
      newValue = 1;
    }

    if (!isField) {
      inputRef.current.style.transform =
        newValue > curValue ? "translateY(-100%)" : "translateY(100%)";
      inputRef.current.style.opacity = 0;

      setTimeout(() => {
        inputRef.current.style.transitionDuration = "0s";
        inputRef.current.style.transform =
          newValue > curValue ? "translateY(100%)" : "translateY(-100%)";
        inputRef.current.style.opacity = 0;
        changeValue(newValue);

        setTimeout(() => {
          inputRef.current.style.transitionDuration = "0.3s";
          inputRef.current.style.transform = "translateY(0)";
          inputRef.current.style.opacity = 1;
        }, 20);
      }, 250);
    } else {
      changeValue(newValue);
    }
  };

  const handleCountdown = () => {
    if (curValue >= 0) {
      handleValueChange(curValue - 1);
    }
  };

  if (startFlag === true && curValue >= 0) {
    console.log(curValue);
    setInterval(() => {
      handleCountdown();
    }, 1000);
  }

  return (
    <div className="counter">
      <div className="input-wrapper">
        <input
          className="input"
          onChange={(e) => {
            e.preventDefault();
            handleValueChange(e.target.value, true);
          }}
          ref={inputRef}
          type="text"
          value={curValue}
        />
      </div>
    </div>
  );
}

export default Counter;
