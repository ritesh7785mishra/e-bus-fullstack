import React from "react";
import "./ImageGrid.css";

const ImageGrid = () => {
  const randomClass = () => {
    const number = Math.floor(Math.random() * 10) + 1;

    if (number % 5 == 0) {
      return "big";
    } else if (number % 3 == 0) {
      return "horizontal";
    } else {
      return "vertical";
    }
  };
  return (
    <div className="formBox imageGrid">
      <div className={randomClass()}>{randomClass()}</div>
      <div className={randomClass()}>{randomClass()}</div>
      <div className={randomClass()}>{randomClass()}</div>
      <div className={randomClass()}>{randomClass()}</div>
      <div className={randomClass()}>{randomClass()}</div>
      <div className={randomClass()}>{randomClass()}</div>
      <div className={randomClass()}>{randomClass()}</div>
      <div className={randomClass()}>{randomClass()}</div>
      <div className={randomClass()}>{randomClass()}</div>
    </div>
  );
};

export default ImageGrid;
