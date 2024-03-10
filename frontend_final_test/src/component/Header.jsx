import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import DehazeIcon from "@mui/icons-material/Dehaze";
const Header = () => {
  return (
    <header>
      <DehazeIcon />
      <img
        src="./src/assets/MOVIEUI.png"
        type="image"
        alt="logo"
       
        
      />
      <SearchIcon />
    </header>
  );
};

export default Header;
