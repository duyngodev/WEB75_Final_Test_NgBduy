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
        <h3>{movie.name}</h3>
        <p>
          {movie.time} phút {movie.year}
        </p>
      </div>
    </div>
  );
};

export default Card;
