import { useState } from 'react'
import './App.css'

const cardImages = [
{"src":"/img/helmet-1.png"},
{"src":"/img/potion-1.png"},
{"src":"/img/ring-1.png"},
{"src":"/img/scroll-1.png"},
{"src":"/img/shield-1.png"},
{"src":"/img/sword-1.png"},
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
  const shuffelCards = () =>  {
    const shuffeledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random()-0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffeledCards)
    setTurns(0)
  }

  return (
    <div className="App">
      <h1>Magic Memory</h1>
      <button onClick={shuffelCards}>New Game</button>
    
      <div className="card-grid">
        {cards.map(card => (
          <div className="card" key={card.id}>
            <div>
              <img className="front" src={card.src} alt="card front" />
              <img className="back" src="/img/cover.png" alt="card back" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App