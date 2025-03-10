import { useState, useRef } from "react";
import "./GameStart.css";

const GameStart = ({
  verificarLetra,
  pickedWord,
  pickedCategory,
  letters,
  letrasCertas,
  letrasErrada,
  chances,
  score,
}) => {

  const [letter, setLetter] = useState('');
  const letterInputRef = useRef(null)
 
  const handleSubmit = e => {
    e.preventDefault();
    verificarLetra(letter);
    setLetter('')
    letterInputRef.current.focus();

  }
  

  return (
    <>
      <div className="game">
        <p className="pointer">
          <span>Pontuação:{score}</span>
        </p>
        <h1>adivinhe a palavra:</h1>
        <h3 className="tip">
          Dica da palavra: <span>{pickedCategory}</span>
        </h3>
        <p>Você ainda tem {chances} tentativas</p>
        <div className="wordContainer">
          {letters.map( (letra, i) =>
            letrasCertas.includes(letra) ? (
              <span key={i} className="letters">
                {letra}
              </span>
            ) : (
              <span key={i} className="blankSquare"></span>
            )
          )}
        </div>
        
        <div className="latterContainer">
          <p>Tente adivinhar a palavra</p>
          <form onSubmit={handleSubmit}>
            <input id='a'
              type="text"
              name="letter"
              maxLength={1}
              required
              onChange={ e => setLetter(e.target.value)}
              value={letter}
              ref={letterInputRef}
            />
            <button>Jogar!</button>
          </form>
        </div>
        <div className="wrongeLettersContainer">
          <p>Letras utilizadas:</p>
          {letrasErrada.map((letra, i) => (
            <span key={i}>{letra}, </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default GameStart;
