import React, { useRef, useState, useEffect } from "react";
import "styles/game.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { Link } from "react-router-dom";

const Game = () => {
  const enemyLifebarEl = useRef(null);
  const playerLifebarEl = useRef(null);
  const turns = useRef(0);
  const stun = useRef(false);
  const wait2Turns = useRef(0);
  const [enemyLife, setEnemyLife] = useState(100);
  const [playerLife, setPlayerLife] = useState(100);
  const [disableButon, setDisableButon] = useState(false);

  //Player actions
  function playerAttack(enemyLife) {
    setTimeout(() => {
      setEnemyLife(enemyLife - Math.floor(Math.random() * (10 - 5 + 1) + 5));
      turns.current++;
    }, 500);
  }
  function playerSpecialAttack(enemyLife) {
    setTimeout(() => {
      setEnemyLife(enemyLife - Math.floor(Math.random() * (20 - 10 + 1) + 10));
      //50% chance to stun
      if (Math.floor(Math.random() * 2) === 0) {
        stun.current = true;
      }
      setDisableButon(true);
      turns.current++;
      wait2Turns.current = turns.current;
    }, 500);
  }
  function healPlayer(playerLife) {
    setTimeout(() => {
      setPlayerLife(playerLife + Math.floor(Math.random() * (15 - 5 + 1) + 5));
      turns.current++;
    }, 500);
  }
  //Enemy actions
  function enemyAttack(playerLife) {
    setPlayerLife(playerLife - Math.floor(Math.random() * (12 - 6 + 1) + 6));
  }
  function enemySpecialAttack(playerLife) {
    setPlayerLife(playerLife - Math.floor(Math.random() * (16 - 8 + 1) + 8));
  }

  //Player actions
  useEffect(() => {
    if (playerLife <= 0) {
      playerLifebarEl.current.style.width = "0%";
      setPlayerLife(0);
      alert("Você perdeu!");
    } else if (playerLife > 100) {
      playerLifebarEl.current.style.width = "100%";
      setPlayerLife(100);
    } else {
      playerLifebarEl.current.style.width = playerLife + "%";
    }
  }, [playerLife]);

  //Enemy actions
  useEffect(() => {
    if (turns.current > 0) {
      if (enemyLife <= 0) {
        enemyLifebarEl.current.style.width = "0%";
        setEnemyLife(0);
        alert("Você venceu!");
      } else {
        enemyLifebarEl.current.style.width = enemyLife + "%";
        setTimeout(() => {
          if (stun.current) {
            alert("Inimigo está atordoado e não consegue atacar!");
            stun.current = false;
          } else {
            //Attack
            if (turns.current % 3 === 0) {
              enemySpecialAttack(playerLife);
            } else {
              enemyAttack(playerLife);
            }
          }
        }, 500);
      }
      if (turns.current === wait2Turns.current + 3) {
        setDisableButon(false);
      }
    }
  }, [enemyLife, turns.current]);

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
            <button
              className="special-attack"
              onClick={() => playerSpecialAttack(enemyLife)}
              disabled={disableButon}
            >
              Ataque Especial
            </button>
            <button className="heal" onClick={() => healPlayer(playerLife)}>
              Curar
            </button>
            <button
              className="give-up"
              onClick={() => {
                alert("Fim de jogo");
                window.location.reload();
              }}
            >
              Desistir
            </button>
          </div>
        </div>
        <div className="game-log"></div>
      </main>
      <Footer />
    </div>
  );
};

export default Game;
