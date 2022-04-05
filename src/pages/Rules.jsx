import React from "react";
import "styles/rules.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const Rules = () => {
  return (
    <div>
      <Navbar />
      <main className="rules-container">
        <h1>Regras do Jogo</h1>
        <p>Preste atenção nas regras para conseguir uma boa pontuação!</p>
        <div className="card-container">
          <div className="center-card">
            <p>
              O jogo deverá ser de turnos, sendo cada turno uma interação do jogador e uma interação automática do
              inimigo.
            </p>
            <p>
              O jogador e o inimigo deverão ter uma barra de vida, ambos terão a mesma quantidade de pontos de vida
              (100).
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Rules;
