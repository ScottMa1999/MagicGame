import React, { useState } from 'react'
import SingleCard from './SingleCard';

export default function ({ cards, handleChoice, firstChoice, secondChoice, disabled }) {

  return (
    <div className="Card">
      {
        cards &&
        cards.map( card => (
          <SingleCard card={card} 
                      key={card.id} 
                      handleChoice={handleChoice}
                      flipped={card === firstChoice || card === secondChoice || card.match}
                      disabled={disabled}/>
        ))
      }
    </div>
  )
}
