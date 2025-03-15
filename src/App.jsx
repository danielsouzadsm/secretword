import "./App.css";
import { useCallback, useState, useEffect } from "react";
import { wordList } from "./data/word";
import TelaPrint from "./components/TelaPrint";
import GameStart from "./components/GameStart";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [letrasCertas, setLetrasCertas] = useState([]);
  const [letrasErrada, setLetrasErrada] = useState([]);
  const [chances, setChances] = useState(5);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = () => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];

    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    return { word, category };
  };

  const comecar = () => {
    limparStages();
    const { word, category } = pickWordAndCategory();
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  };

  const verificarLetra = letter => {
    const normalizarLetra = letter.toLowerCase();
    if (
      letrasCertas.includes(normalizarLetra) ||
      letrasErrada.includes(normalizarLetra)
    ) {
      return;
    }

    if (letters.includes(normalizarLetra)) {
      setLetrasCertas(() => [...letrasCertas, normalizarLetra]);
      return;
    } else {
      setLetrasErrada(() => [...letrasErrada, normalizarLetra]);
      setChances(chancesPerdidas => chancesPerdidas - 1);
      return;
    }
  };
  const limparStages = () => {
    setLetrasCertas([]);
    setLetrasErrada([]);
  };

  useEffect(() => {
    if (chances <= 0) {
      limparStages();
      setGameStage(stages[2].name);
      return;
    }
  }, [chances]);

  useEffect(() => {
    const letraSemDublicado = [...new Set(letters)];
    
    if (letrasCertas.length === letraSemDublicado.length  && gameStage === stages[1].name) {
      setScore(atualScore => atualScore + 100);
      comecar();
      setChances(5);
      return;
    }
  }, [letrasCertas, comecar, gameStage]);

  

  const voltarInicio = () => {
    setScore(0);
    setChances(5);
    limparStages();
    setGameStage(stages[0].name);
    return;
  };
  

  return (
    <>
      <div className="app">
        {gameStage === "start" && <TelaPrint comecar={comecar} />}
        {gameStage === "game" && (
          <GameStart
            verificarLetra={verificarLetra}
            pickedWord={pickedWord}
            pickedCategory={pickedCategory}
            letters={letters}
            letrasCertas={letrasCertas}
            letrasErrada={letrasErrada}
            chances={chances}
            score={score}
          />
        )}
        {gameStage === "end" && (
          <GameOver voltarInicio={voltarInicio} score={score} />
        )}
      </div>
    </>
  );
}

export default App;
