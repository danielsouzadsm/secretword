import "./TelaPrint.css";

const TelaPrint = ({ comecar }) => {
  return (
    <div className="iniciar">
      <h1>Secret Word</h1>
      <p>Click no botão a baixo para começar a jogar!</p>
      <button onClick={comecar}>COMEÇAR O JOGO!</button>
    </div>
  );
};

export default TelaPrint;