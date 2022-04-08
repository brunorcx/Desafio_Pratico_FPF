import React, { useRef, useState, useEffect } from "react";
import "styles/game.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { Post } from "helpers/HTTPMethods";
const Game = () => {
  //General

  const [gameStyle, setGameStyle] = useState({
    backgroundImage: "url(" + "backgrounds/background_glacial_mountains.png" + ")",
  });
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
  const [disableSpecialAttack, setDisableSpecialAttack] = useState(false);
  const [disableButons, setDisableButons] = useState(false);
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
      setDisableSpecialAttack(true);
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

  useEffect(() => {
    let randomNumber = Math.floor(Math.random() * (4 - 1 + 1) + 1);
    if (randomNumber === 1) {
      setGameStyle({
        backgroundImage: "url(" + "backgrounds/background_glacial_mountains.png" + ")",
      });
    } else if (randomNumber === 2) {
      setGameStyle({
        backgroundImage: "url(" + "backgrounds/alpine-dry.png" + ")",
      });
    } else if (randomNumber === 3) {
      setGameStyle({
        backgroundImage: "url(" + "backgrounds/desert-dry.png" + ")",
      });
    } else if (randomNumber === 4) {
      setGameStyle({
        backgroundImage: "url(" + "backgrounds/rocky-dry.png" + ")",
      });
    }
  }, []);
  //Player effect
  useEffect(() => {
    if (playerLife <= 0) {
      playerLifebarEl.current.style.width = "0%";
      setPlayerLife(0);
      toast(<CalculateScore giveUp={false} />, {
        id: "score",
        duration: Infinity,
      });
      toast.error("Você perdeu!", {
        id: "lost",
      });
      setDisableButons(true);
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
        toast(<CalculateScore giveUp={false} />, {
          id: "score",
          duration: Infinity,
        });
        toast.success("Você venceu!", {
          id: "victory",
        });
        setDisableButons(true);
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
        setDisableSpecialAttack(false);
      }
    }
  }, [enemyLife, turns.current]);

  const LogTurn = (turn) => {
    //create empty object
    let playerStyle = "";
    let enemyStyle = "";
    if (playerAttackType.current === "Ataque Básico") {
      playerStyle = Colors.attack;
    } else if (playerAttackType.current === "Ataque Especial") {
      playerStyle = Colors.specialAttack;
    } else if (playerAttackType.current === "Curar") {
      playerStyle = Colors.heal;
    }
    if (enemyAttackType.current === "Ataque Básico") {
      enemyStyle = Colors.attack;
    } else if (enemyAttackType.current === "Ataque Especial") {
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

  const CalculateScore = ({ giveUp }) => {
    const [nome, setValue] = useState("");
    let score = Math.round((playerLife * 1000) / turns.current);
    if (giveUp === true) score = 0;

    async function SaveRank(e) {
      e.preventDefault();
      const Player = new FormData();
      Player.append("playerName", nome);
      Player.append("date", new Date().toLocaleString());
      Player.append("score", score);
      toast.dismiss("score");

      toast.promise(Post("/ranking", Player), {
        loading: "Carregando...",
        success: "Salvo com sucesso!",
        error: "Erro ao salvar!",
      });
    }

    //timestamp new Date().getTime();

    return (
      <form className="score" method="post" encType="multipart/form-data">
        <h1>Pontuação: {score}</h1>
        <input
          type="text"
          value={nome}
          onInput={(e) => setValue(e.target.value)}
          maxLength="15"
          placeholder="Nome"
        ></input>
        <button type="submit" onClick={(e) => SaveRank(e)}>
          Salvar
        </button>
      </form>
    );
  };

  return (
    <div>
      <Navbar />
      <main className="game-container">
        <div className="background-image" style={gameStyle}>
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
              <button className="attack" onClick={() => playerAttack(enemyLife)} disabled={disableButons}>
                Atacar
              </button>
              <button
                className="special-attack"
                onClick={() => playerSpecialAttack(enemyLife)}
                disabled={disableButons ? disableButons : disableSpecialAttack}
              >
                Ataque Especial
              </button>
              <button className="heal" onClick={() => healPlayer(playerLife)} disabled={disableButons}>
                Curar
              </button>
              <button
                className="give-up"
                onClick={() => {
                  toast(<CalculateScore giveUp={true} />, {
                    id: "score",
                    duration: Infinity,
                  });
                  toast("Fim de jogo!");
                  setDisableButons(true);
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                }}
                disabled={disableButons}
              >
                Desistir
              </button>
            </div>
          </div>
        </div>
        <div className="game-log">
          <LogTurn />
        </div>
      </main>
      <Footer />
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
        containerStyle={{
          top: 200,
        }}
      />
    </div>
  );
};

export default Game;
