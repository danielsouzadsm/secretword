import "./GameOver.css";

const GameOver = ({voltarInicio, score}) => {
  return (
    <>
      <div>
        <h2>Sua pontuação foi: <span>{score}</span></h2>
        <p>Você perdeu! Digita F </p>
        <button onClick={voltarInicio}>Reinicar Jogo!</button>
      </div>
    </>
  );
};

export default GameOver;
