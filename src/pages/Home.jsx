import React, { useState } from "react";
import "styles/home.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const Home = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div>
      <Navbar openSideMenu={openSideMenu} setOpenSideMenu={setOpenSideMenu} />
      Aqui está o home!!!!
      <div className={openSideMenu ? "openSideMenu" : "sideMenu"}></div>
      <Footer />
    </div>
  );
};

export default Home;
