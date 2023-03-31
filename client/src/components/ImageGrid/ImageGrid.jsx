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
    <div class="row">
      <div class="column">
        <img src="wedding.jpg" />
        <img src="rocks.jpg" />
        <img src="falls2.jpg" />
        <img src="paris.jpg" />
        <img src="nature.jpg" />
        <img src="mist.jpg" />
        <img src="paris.jpg" />
      </div>
      <div class="column">
        <img src="underwater.jpg" />
        <img src="ocean.jpg" />
        <img src="wedding.jpg" />
        <img src="mountainskies.jpg" />
        <img src="rocks.jpg" />
        <img src="underwater.jpg" />
      </div>
      <div class="column">
        <img src="wedding.jpg" />
        <img src="rocks.jpg" />
        <img src="falls2.jpg" />
        <img src="paris.jpg" />
        <img src="nature.jpg" />
        <img src="mist.jpg" />
        <img src="paris.jpg" />
      </div>
      <div class="column">
        <img src="underwater.jpg" />
        <img src="ocean.jpg" />
        <img src="wedding.jpg" />
        <img src="mountainskies.jpg" />
        <img src="rocks.jpg" />
        <img src="underwater.jpg" />
      </div>
    </div>
  );
};

export default ImageGrid;
