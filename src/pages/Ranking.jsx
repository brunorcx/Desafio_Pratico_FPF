import React, { useEffect, useState } from "react";
import "styles/ranking.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { Get } from "helpers/HTTPMethods";

const Ranking = () => {
  //initialize state with dummy data
  const dummy = [
    {
      playerName: "Player 2",
      score: "200",
      date: new Date().toLocaleString(),
    },
    {
      playerName: "Player 1",
      score: "100",
      date: new Date().toLocaleString(),
    },
    {
      playerName: "Player 3",
      score: "300",
      date: new Date().toLocaleString(),
    },
  ];

  //sort dummy by score descending
  const [ranking, setRanking] = useState(dummy.sort((a, b) => b.score - a.score));

  // useEffect(() => {
  //   Get("ranking/")
  //     .then((result) => {
  //       setRanking(result);
  //     })
  //     .catch((err) => {});
  // }, []);

  return (
    <div>
      <Navbar />
      <main className="ranking-container">
        <h1>Ranking</h1>
        <div className="ranking-card">
          <div className="ranking-header">
            <h2 className="ranking-position">Posição</h2>
            <h2 className="ranking-name">Nome</h2>
            <h2 className="ranking-score">Pontuação</h2>
            <h2 className="ranking-date">Data</h2>
          </div>

          {ranking.map((player, index) => (
            <div className="ranking-player" key={index}>
              <div className="player-number">{index + 1}</div>
              <div className="player-name">{player.playerName}</div>
              <div className="player-score">{player.score}</div>
              <div className="player-date">{player.date}</div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Ranking;
