import { useState } from 'react'
import './App.css'

const cardImages = [
{"src":"/img/tiger.jpg"},
{"src":"/img/lion.jpg"},
{"src":"/img/pumba.jpg"},
{"src":"/img/timon.jpg"},
{"src":"/img/lepoard.jpg"},
{"src":"/img/cat.jpg"},
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

   // Initialize cards with the back image visible
  const initializeCards = () => {
    const initialCards = cardImages.map((card) => ({ ...card, id: Math.random(), isFlipped: false }));
    setCards(initialCards);
  };

  //randomize cards
  const shuffleCards = () =>  {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }

   // Handle card click
  const handleCardClick = (clickedCard) => {
   // Toggle the isFlipped state of the clicked card
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === clickedCard.id ? { ...card, isFlipped: !card.isFlipped } : card
    )
  );

  // Increment the turns
  setTurns((prevTurns) => prevTurns + 1);
};


  return (
    <div className="App">
      <h1>Magic Memory</h1>
      <button onClick={initializeCards}>New Game</button>
      <button onClick={shuffleCards}>Shuffle Cards</button>
    
      <div className="card-grid">
        {cards.map(card => (
          <div key={card.id}
            className={`card ${card.isFlipped ? 'flipped' : ''}`}
            onClick={() => handleCardClick(card)}>
            <div>
              <img className="front" src={card.isFlipped ? card.src : '/img/crown.jpg'}  alt="card front"/>
              <img className="back" src="/img/crown.jpg" alt="card back" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;