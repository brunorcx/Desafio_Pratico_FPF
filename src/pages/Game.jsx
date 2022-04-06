import React, { useRef, useState, useEffect } from "react";
import "styles/game.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const Game = () => {
  const enemyLifebarEl = useRef(null);
  const playerLifebarEl = useRef(null);
  const [enemyLife, setEnemyLife] = useState(100);
  const [playerLife, setPlayerLife] = useState(100);

  function playerAttack(enemyLife) {
    setEnemyLife(enemyLife - Math.floor(Math.random() * (10 - 5 + 1) + 5));
  }
  function playerSpecialAttack(enemyLife) {
    setEnemyLife(enemyLife - Math.floor(Math.random() * (20 - 10 + 1) + 10));
  }
  function healPlayer(playerLife) {
    setPlayerLife(playerLife + Math.floor(Math.random() * (15 - 5 + 1) + 5));
  }

  useEffect(() => {
    if (enemyLife < 0) {
      enemyLifebarEl.current.style.width = "0%";
      setEnemyLife(0);
    } else {
      enemyLifebarEl.current.style.width = enemyLife + "%";
    }
  }, [enemyLife]);

  useEffect(() => {
    if (playerLife < 0) {
      playerLifebarEl.current.style.width = "0%";
      setPlayerLife(0);
    } else if (playerLife > 100) {
      playerLifebarEl.current.style.width = "100%";
      setPlayerLife(100);
    } else {
      playerLifebarEl.current.style.width = playerLife + "%";
    }
  }, [playerLife]);

  return (
    <div>
      <Navbar />
      <main className="game-container">
        <div className="enemy">
          <div className="lifebar-container">
            <div className="lifebar-progress" ref={enemyLifebarEl}>
              {enemyLife}%
            </div>
          </div>
          <img
            src="sprites/dorver/dorver.gif"
            alt="monstro de quatro patas inimigo"
            title="Manveru, Dorimen at https://opengameart.org/content/dorver-monster"
          ></img>
        </div>
        <div className="player">
          <div className="player-info">
            <div className="lifebar-container">
              <div className="lifebar-progress" ref={playerLifebarEl}>
                {playerLife}%
              </div>
            </div>
            <img src="sprites/knight/knight2.gif" alt="jogador"></img>
          </div>
          <div className="player-controls-container">
            <button className="attack" onClick={() => playerAttack(enemyLife)}>
              Atacar
            </button>
            <button className="special-attack" onClick={() => playerSpecialAttack(enemyLife)}>
              Ataque Especial
            </button>
            <button className="heal" onClick={() => healPlayer(playerLife)}>
              Curar
            </button>
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
