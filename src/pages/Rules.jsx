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
        <p>O jogador deverá ter 4 botões de interação a seguir:</p>
        <div className="actions-4-container">
          <div className="card-1">
            <h2>Ataque Básico</h2>
            <p>
              O jogador irá causar um dano no inimigo que será reduzido dos pontos de vida do mesmo, deve ser um
              valor aleatório entre 5 e 10.
            </p>
          </div>
          <div className="card-2">
            <h2>Ataque Especial</h2>
            <p>
              O jogador irá causar um dano no inimigo que será reduzido dos pontos de vida do mesmo, deve ser um
              valor aleatório entre 10 e 20.
            </p>
            <p>
              O ataque especial necessita de no mínimo 2 turnos após utilização e deverá estar desabilitado
              enquanto não carregado, ou seja, o botão não pode ser acionado por 2 turnos após sua utilização.
            </p>
            <p>
              Ao acionar o ataque especial o inimigo tem 50% de chance de não atacar no próximo turno, e deve ser
              apresentado um indicativo de que o inimigo está atordoado.
            </p>
          </div>
          <div className="card-3">
            <h2>Curar</h2>
            <p>
              O jogador receberá um aumento nos seus pontos de vida que deverá ser um valor randômico entre 5 e 15.
            </p>
          </div>
          <div className="card-4">
            <h2>Desistir</h2>
            <p>O jogo deverá ser terminado e ir para tela de inicio do jogo</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Rules;
