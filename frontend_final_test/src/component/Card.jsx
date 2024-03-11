import React, { useContext } from "react";
import { Context } from "../utils/context.jsx";

const Card = ({ movie }) => {
  const { dispatch } = useContext(Context);
  const clickHandler = () => {
    dispatch({
      type: "OPEN",
      payload: movie,
    });
  };
  return (
    <div onClick={clickHandler}>
      <div className="card">
        <div className="imgWrapper">
          <img src={`${movie.image.image_url}`} alt="img" />
        </div>
        <h3 style={{ fontSize: "0.9rem" }}>{movie.name}</h3>
        <p style={{ fontSize: "0.8rem" }}>
          {movie.time} phút {movie.year}
        </p>
      </div>
    </div>
  );
};

export default Card;
