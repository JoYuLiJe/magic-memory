import { useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard.jsx'


const cardImages = [
{"src":"/img/tiger.jpg"},
{"src":"/img/lion.jpg"},
{"src":"/img/pumba.jpg"},
{"src":"/img/timon.jpg"},
{"src":"/img/lepoard.jpg"},
{"src":"/img/cat.jpg"},
]

// const cardFrontImage = [
//   {"src":"/img/crown.jpg"}
// ]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [clicks, setClicks] = useState(0);

  //randomize cards
  const shuffleCards = () =>  {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards);
    setTurns(0);

    // Reset the click count to 0
    setClicks(0);
  }

  //handle a choice funct, make prop then pass to single card
  const handleChoice = (card) => {
    if (!choiceOne) {
      setChoiceOne(card);
    } else {
      setChoiceTwo(card);
      setClicks(clicks + 1);
    }
    

    if (choiceOne) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
    
  }

  return (
    <div className="App">
      <h1>Magic Memory</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>Clicks: {clicks}</p> {/* Display the click count */}
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}/>
        ))}
      </div>
    </div>
  );
};

export default App;