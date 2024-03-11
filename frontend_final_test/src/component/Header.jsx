import SearchIcon from "@mui/icons-material/Search";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { useContext } from "react";
import { Context } from "../utils/context.jsx";
import axios from "axios";
const Header = () => {
  const { input, setInput, setData } = useContext(Context);
  const searchHandler = async () => {
    await axios
      .get(
        `https://web75-final-test-ngbduy.onrender.com/movies/?search=${input}`
      )
      .then((res) => {
        setData(res.data.movies);
      })
      .catch((err) => console.log(err));
  };
  return (
    <header>
      <DehazeIcon />
      <img src="./src/assets/MOVIEUI.png" type="image" alt="logo" />
      <div className="searchBox">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <SearchIcon onClick={searchHandler} style={{ cursor: "pointer" }} />
      </div>
    </header>
  );
};

export default Header;
