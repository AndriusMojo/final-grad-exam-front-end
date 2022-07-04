import React from 'react'
import css from './RecipeCard.module.css';

function RecipeCard(props) {
  return (
    <div className={css.recipeCard}>
        <img src='https://source.unsplash.com/random/400x200/?dish' alt="nice food image" />
        <div className={css.recipeCardTitle}>
            <p>{props.title}</p>
        </div>
    </div>
  )
}

export default RecipeCard;