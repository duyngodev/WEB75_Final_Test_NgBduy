import SearchIcon from "@mui/icons-material/Search";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { useContext } from "react";
import { Context } from "../utils/context.jsx";
import axios from "axios";
const Header = () => {
  const { input, setInput, data, setData } = useContext(Context);
  const searchHandler = async () => {
    await axios
      // .get(
      //   `https://web75-final-test-ngbduy.onrender.com/movies/?search=${input}`
      // )
      .get(`http://localhost:5000/movies/?search=${input}}`)
      .then((res) => {
        console.log(res);
        setData(res.data.movies);
      })
      .catch((err) => console.log(err));
  };
  console.log(data);
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
