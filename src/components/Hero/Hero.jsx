import React from 'react'
import css from './Hero.module.css';

function Hero() {
  return (
    <div className={css.heroContainer}>
        <div className={css.heroTextContainer}>
            <h1>Welcome to Deelicious!</h1>
            <h2>We are happy to see you in our website! Browse between 500+ recipes, choose the best one for any occasion</h2>
            <h3>Jump in to our </h3>
        </div>
    </div>
  )
}

export default Hero