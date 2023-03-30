import React, { useContext } from "react";
import "./Card.css";
import deleteIcon from "../../assets/delete-bin-7-line.png";
import { Context } from "../../Context";

function Card({ id, name, conductorId }) {
  const { handleConductorDelete } = useContext(Context);
  return (
    <div className="card">
      {/* <img className='card__mainImg' src={image?image:headShot} alt="" /> */}
      <h4 className="card__name">{name}</h4>
      <p className="card__designation">ID:{id}</p>
      <p className="card__designation">ConductorID:{conductorId}</p>
      <button
        onClick={() => {
          handleConductorDelete(id);
        }}
        className="card__deleteBtn"
      >
        <img className="card__deleteImg" src={deleteIcon} alt="" />
      </button>
    </div>
  );
}

export default Card;
