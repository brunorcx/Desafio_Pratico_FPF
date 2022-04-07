import React, { useRef, useState, useEffect } from "react";
import "styles/game.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import toast, { Toaster } from "react-hot-toast";

const Game = () => {
  //General
  const turns = useRef(0);
  const Colors = {
    attack: "rgba(238, 105, 105, 0.7)",
    specialAttack: "rgba(229, 238, 105, 1)",
    heal: "rgba(105, 238, 105, 0.7)",
    giveUp: "rgba(105, 105, 238, 0.7)",
  };
  //Player behavior
  const playerLifebarEl = useRef(null);
  const [playerLife, setPlayerLife] = useState(100);
  const playerAttackType = useRef("");
  const [disableButon, setDisableButon] = useState(false);
  const wait2Turns = useRef(0);
  const playerDamage = useRef(0);
  //Enemy behavior
  const enemyLifebarEl = useRef(null);
  const [enemyLife, setEnemyLife] = useState(100);
  const enemyAttackType = useRef("");
  const enemyDamage = useRef(0);
  const stun = useRef(false);

  //Player actions
  function playerAttack(enemyLife) {
    setTimeout(() => {
      playerDamage.current = Math.floor(Math.random() * (10 - 5 + 1) + 5);
      setEnemyLife(enemyLife - playerDamage.current);
      turns.current++;
      playerAttackType.current = "Ataque Básico";
    }, 500);
  }
  function playerSpecialAttack(enemyLife) {
    setTimeout(() => {
      playerDamage.current = Math.floor(Math.random() * (20 - 10 + 1) + 10);
      setEnemyLife(enemyLife - playerDamage.current);
      //50% chance to stun
      if (Math.floor(Math.random() * 2) === 0) {
        stun.current = true;
      }
      setDisableButon(true);
      turns.current++;
      wait2Turns.current = turns.current;
      playerAttackType.current = "Ataque Especial";
    }, 500);
  }
  function healPlayer(playerLife) {
    setTimeout(() => {
      playerDamage.current = Math.floor(Math.random() * (15 - 5 + 1) + 5);
      setPlayerLife(playerLife + playerDamage.current);
      turns.current++;
      playerAttackType.current = "Curar";
    }, 500);
  }
  //Enemy actions
  function enemyAttack(playerLife) {
    enemyDamage.current = Math.floor(Math.random() * (12 - 6 + 1) + 6);
    setPlayerLife(playerLife - enemyDamage.current);
    enemyAttackType.current = "Ataque Básico";
  }
  function enemySpecialAttack(playerLife) {
    enemyDamage.current = Math.floor(Math.random() * (16 - 8 + 1) + 8);
    setPlayerLife(playerLife - enemyDamage.current);
    enemyAttackType.current = "Ataque Especial";
  }

  //Player effect
  useEffect(() => {
    if (playerLife <= 0) {
      playerLifebarEl.current.style.width = "0%";
      setPlayerLife(0);
      toast.error("Você perdeu!", {
        id: "lost",
      });
    } else if (playerLife > 100) {
      playerLifebarEl.current.style.width = "100%";
      setPlayerLife(100);
    } else {
      if (playerLife < 20) {
        playerLifebarEl.current.style.background = Colors.attack;
      } else if (playerLife < 50 && playerLife > 20) {
        playerLifebarEl.current.style.background = Colors.specialAttack;
      } else if (playerLife >= 50) {
        playerLifebarEl.current.style.background = Colors.heal;
      }
      playerLifebarEl.current.style.width = playerLife + "%";
    }
  }, [playerLife]);

  //Enemy effect
  useEffect(() => {
    if (turns.current > 0) {
      if (enemyLife <= 0) {
        enemyLifebarEl.current.style.width = "0%";
        setEnemyLife(0);
        toast.success("Você venceu!", {
          id: "victory",
        });
      } else {
        if (enemyLife < 20) {
          enemyLifebarEl.current.style.background = Colors.attack;
        } else if (enemyLife < 50) {
          enemyLifebarEl.current.style.background = Colors.specialAttack;
        }
        enemyLifebarEl.current.style.width = enemyLife + "%";
        setTimeout(() => {
          if (stun.current) {
            toast("Inimigo está atordoado e não consegue atacar!", {
              id: "stun",
              icon: "✨",
              style: {
                background: Colors.specialAttack,
              },
              duration: 2000,
            });
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

  const LogTurn = (turn) => {
    //create empty object
    let playerStyle = "";
    let enemyStyle = "";
    if (playerAttackType.current === "Ataque Básico") {
      playerStyle = Colors.attack;
    }
    if (playerAttackType.current === "Ataque Especial") {
      playerStyle = Colors.specialAttack;
    } else if (playerAttackType.current === "Curar") {
      playerStyle = Colors.heal;
    }
    if (enemyAttackType.current === "Ataque Básico") {
      enemyStyle = Colors.attack;
    }
    if (enemyAttackType.current === "Ataque Especial") {
      enemyStyle = Colors.specialAttack;
    }

    return (
      <div className="turns">
        <h1>Log</h1>
        <h2>Turno: {turns.current}</h2>
        <div className="card-container">
          <div className="center-card">
            <p style={{ background: playerStyle }}>
              Jogador usou "{playerAttackType.current}" ({playerAttackType.current === "Curar" ? "+" : "-"}
              {playerDamage.current} pontos de vida)
            </p>
            <p style={{ background: enemyStyle }}>
              Inimigo usou "{enemyAttackType.current}" (-{enemyDamage.current} pontos de vida)
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
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
            <img src="sprites/knight/knight-idle.gif" alt="jogador"></img>
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
                // alert("Fim de jogo");
                toast("Fim de jogo!");
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              }}
            >
              Desistir
            </button>
          </div>
        </div>
        <div className="game-log">
          <LogTurn />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Game;
