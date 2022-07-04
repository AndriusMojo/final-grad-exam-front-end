import React from 'react'
import RecipesWrapper from '../../components/RecipesWrapper/RecipesWrapper';
import css from './Recipes.module.css';

function Recipes(props) {
  return (
    <div className={css.recipesPage}>
        <div className={css.recipesText}>
          <h2>Here you can see all of our shared recipes</h2>
          <h4>Hopefully you'll find what you're looking for</h4>
        </div>
      <RecipesWrapper recipeArr={props.recipeArr} />
    </div>
  )
}

export default Recipes;