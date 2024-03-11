import { useContext } from "react";
import { Context } from "../utils/context.jsx";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const MovieDetail = () => {
  const { state, dispatch } = useContext(Context);
  const { movie } = state;
  const closeHandler = () => {
    dispatch({
      type: "CLOSE",
    });
  };
  console.log(movie);
  return (
    <div className="popUpWrapper">
      <div className="detail">
        <div className="detailImg">
          <img src={`${movie.image.image_url}`} alt="img" />
        </div>
        <div className="detailMovie">
          <h3 className="title">{movie.name}</h3>
          <p className="subtitle">
            {movie.time} min {movie.year}
          </p>
          <p className="desc">{movie.introduce}</p>
          <div className="detailPlayBtn">
            <PlayArrowIcon />
            <span>Play movie</span>
          </div>
        </div>
        <div className="detailClose" onClick={closeHandler}>
          X
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
