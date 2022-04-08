import React, { useState } from "react";
import "styles/home.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className="total-home">
      <Navbar openSideMenu={openSideMenu} setOpenSideMenu={setOpenSideMenu} />
      <div className={openSideMenu ? "openSideMenu" : "sideMenu"}>AAAAAAAAAAAAA</div>
      <main className="home-container">
        <img src="home.jpg" alt="imagem de armadura de cavaleiro" title="Photo by Nik Shuliahin on Unsplash"></img>
        <h1>Bem-vindo ao Jogo Batalha Única</h1>
      </main>
      <div className="intro">
        <h2>Leia as regras antes de jogar, você pode acessá-las no topo da página</h2>
        <p>Já leu? Então o que está esperando?</p>
        <Link to="/Game">Jogue agora!</Link>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
