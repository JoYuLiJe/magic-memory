import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard.jsx';

import crownImage from './img/crown.jpg';

const cardImages = [
  { id: 1, src: '/img/tiger.jpg', matched: false },
  { id: 2, src: '/img/lion.jpg', matched: false },
  { id: 3, src: '/img/pumba.jpg', matched: false },
  { id: 4, src: '/img/timon.jpg', matched: false },
  { id: 5, src: '/img/leopard.jpg', matched: false },
  { id: 6, src: '/img/cat.jpg', matched: false },
  { id: 7, src: '/img/tiger.jpg', matched: false }, // Duplicate of the tiger card
  { id: 8, src: '/img/lion.jpg', matched: false }, // Duplicate of the lion card
  { id: 9, src: '/img/pumba.jpg', matched: false }, // Duplicate of the pumba card
  { id: 10, src: '/img/timon.jpg', matched: false }, // Duplicate of the timon card
  { id: 11, src: '/img/leopard.jpg', matched: false }, // Duplicate of the leopard card
  { id: 12, src: '/img/cat.jpg', matched: false }, // Duplicate of the cat card
];


function App() {
  // State to manage cards
  const [cards, setCards] = useState(cardImages);

  // State to keep track of clicks and choices
  const [clicks, setClicks] = useState(0);
  const [choices, setChoices] = useState({ choiceOne: null, choiceTwo: null });

  //randomize cards
  const shuffleCards = () =>  {
    const shuffledCards = [...cardImages].sort(() => Math.random() - 0.5);
    const cardsWithIds = shuffledCards.map((card, index) => ({
      ...card,
      id: index + 1,
    }));

    setCards(cardsWithIds);

    // Reset the click count to 0
    setClicks(0);
  };

  //handle a choice funct, make prop then pass to single card
  const handleChoice = (card) => {
    const { choiceOne, choiceTwo } = choices;

    // If both choices have been made, return
    if (choiceOne && choiceTwo) {
      return;
    }

    if (!choiceOne) {
      setChoices({ choiceOne: card, choiceTwo });
    } else {
      setChoices({ choiceOne, choiceTwo: card });
      setClicks(clicks + 1);
    }
  };

  // Update card state when choiecs match
  useEffect(() => {
  if (choices.choiceOne && choices.choiceTwo) {
    const { choiceOne, choiceTwo } = choices;
    if (choiceOne.src ===choiceTwo.src) {
      setCards((prevCards) => 
      prevCards.map((c) => 
      c.id === choiceOne.id || c.id === choiceTwo.id ? { ...c, matched: true } : c
      )
      );
    } else {
      // Handle the case where choices do not match (reset them, etc.)
      setTimeout(() => {
        // Reset choices
        setChoices({ choiceOne: null, choiceTwo: null });

        // Reset the cards to not flipped state
        setCards((prevCards) => 
        prevCards.Cards.map((c) =>
        c.id === choiceOne.id || c.id === choiceTwo.id ? { ...c, matched: false } : c
        )
        );
      }, 1000); // Add your desired dealy in milliseconds
    }
  }
}, [choices]);

// Render the crown image
const renderCrownImage = () => {
  if (cards.every((card) => card.matched)) {
    return (
      <div className="crown-image-container">
        <img src={crownImage} alt="Crown" />
      </div>
    );
  }
  return null;
};


  return (
    <div className="App">
      <h1>Magic Memory</h1>
      <button onClick={shuffleCards}>New Game</button>
      {renderCrownImage()} {/*Display the crown image */}
      <p>Clicks: {clicks}</p> {/* Display the click count */}
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choices.choiceOne || card === choices.choiceTwo || card.matched}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

