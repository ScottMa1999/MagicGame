import { useEffect, useState } from "react";
import { v4 } from "uuid";
import Card from "./component/Card";

const cardImages = [
  { "src":"/img/helmet-1.png", "match":false},
  { "src":"/img/potion-1.png", "match":false},
  { "src":"/img/ring-1.png", "match":false},
  { "src":"/img/scroll-1.png", "match":false},
  { "src":"/img/shield-1.png", "match":false},
  { "src":"/img/sword-1.png", "match":false}
]

function App() {

  // *********** STATES *********** //
  const [ cards, setCards ] = useState([]);
  const [ turn, setTurns ] = useState(0);
  const [ firstChoice, setFirstChoice ] = useState(null);
  const [ secondChoice, setSecondChoice ] = useState(null);
  const [ disabled, setDisabled ] = useState(false);

  // *********** FUNCTIONS *********** //
  function shuffleCards() {

    // #1: combining sources from two arrays
    // #2: sort the arrays in random order
    // #3: add an unique id to each image
    // #4: reseting card states
    // #5: reseting turns

    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map( (card) => ({
        ...card, id:v4()
      }))
    
      setCards(shuffledCards);
      setTurns(0);
  }

  function resetChoices() {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  }


  const handleChoice = (card) => {

    firstChoice ? setSecondChoice(card) : setFirstChoice(card)
    setTurns(previous => previous + 1);

  }

  // *********** useEffect *********** //
  useEffect(() => {
    
    // when two choices are fully fullfilled
    if (firstChoice && secondChoice) {

      setDisabled(true);

      if (firstChoice.src === secondChoice.src) {
        console.log("Match!")
        
        // reset states for the matched cards
        setCards( previous => previous.map( card => {
          if (card.src === firstChoice.src) {
            return {...card, match:true}
          }
          else {
            return card
          }
        }))
        resetChoices();
      }

      if (firstChoice.src !== secondChoice.src) {
        console.log("Unmatch")
        setTimeout(() => {
          resetChoices();
        },1000);
      }
    }

  },[firstChoice,secondChoice])


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <Card cards={cards} 
            handleChoice={handleChoice}
            firstChoice={firstChoice}
            secondChoice={secondChoice}
            disabled={disabled}/>
      <h2>{turn}</h2>
    </div>
  );
}

export default App;
