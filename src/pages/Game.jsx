import React, { useRef } from "react";
import "styles/game.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const Game = () => {
  const enemyLifebarEl = useRef(null);
  return (
    <div>
      <Navbar />
      <main className="game-container">
        <div className="enemy">
          <div className="lifebar-container">
            <div className="lifebar-progress" ref={enemyLifebarEl}>
              100%
            </div>
          </div>
          <img
            src="sprites/dorver/dorver.gif"
            alt="monstro de quatro patas inimigo"
            title="Manveru, Dorimen at https://opengameart.org/content/dorver-monster"
          ></img>
          <button
            onClick={() => {
              enemyLifebarEl.current.style.width = "50%";
            }}
          ></button>
        </div>
        <div className="player"></div>
        <div className="game-log"></div>
      </main>
      <Footer />
    </div>
  );
};

export default Game;
