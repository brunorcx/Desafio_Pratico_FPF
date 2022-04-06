import React, { useRef } from "react";
import "styles/game.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const Game = () => {
  const enemyLifebarEl = useRef(null);
  const playerLifebarEl = useRef(null);
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
        <div className="player">
          <div className="player-info">
            <div className="lifebar-container">
              <div className="lifebar-progress" ref={playerLifebarEl}>
                100%
              </div>
            </div>
            <img src="sprites/knight/knight2.gif" alt="jogador"></img>
          </div>
          <div className="player-controls-container">
            <button className="attack">Atacar</button>
            <button className="special-attack">Ataque Especial</button>
            <button className="heal">Curar</button>
            <button className="give-up">Desistir</button>
          </div>
        </div>
        <div className="game-log"></div>
      </main>
      <Footer />
    </div>
  );
};

export default Game;
