import React, { useState } from 'react'

export default function SingleCard({ card, handleChoice, flipped, disabled  }) {

  function handleClick() {

    if (!disabled) {
      handleChoice(card);
    }
    
  }

  return (
    <div className="card">
      <div className={ flipped ? "flipped" : "" }>
        <img src={card.src} className="card-front" alt='card-front' />
        <img src="/img/cover.png" className="card-back" alt='card-back' onClick={handleClick}/>
      </div>
   </div>
  )
}
