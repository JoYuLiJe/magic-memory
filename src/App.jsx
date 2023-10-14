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
              <img className="back" src="/img/crown.jpg" alt="card back" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;