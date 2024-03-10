import React, { useState } from "react";

const Card = ({ movie }) => {
  const [popup, setPopup] = useState(true);
  console.log(movie);
  return (
    <>
      {popup && <div className="popUpWrapper">asd</div>}
      <div className="card">
        <div className="imgWrapper">
          <img src={`${movie.image.image_url}`} alt="img" />
        </div>
        <h3>{movie.name}</h3>
        <p>
          {movie.time} phút {movie.year}
        </p>
      </div>
    </>
  );
};

export default Card;
