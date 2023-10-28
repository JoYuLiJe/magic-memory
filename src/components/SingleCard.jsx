// SingleCard.jsx
import React, { useState } from 'react';
import './SingleCard.css';

const SingleCard = ({ card, handleChoice, flipped }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (!isFlipped) {
      handleChoice(card);
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`single-card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="card-inner">
         <div className={`card-front ${isFlipped ? 'hidden' : ''}`}>
          <img src={card.src} alt="Card" />
        </div>
        <div className={`card-back ${isFlipped ? '' : 'hidden'}`}></div>
      </div>
    </div>
  );
};

export default SingleCard;
