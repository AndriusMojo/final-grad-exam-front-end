import React from 'react'
import Hero from '../../components/Hero/Hero';
import RecipesWrapper from '../../components/RecipesWrapper/RecipesWrapper';
import css from './Home.module.css';

function Home(props) {
  

  return (
    <div>
      <Hero />
      <div className={css.recipesWrapper}>
      <RecipesWrapper recipeArr={props.recipeArr} />
      </div>
    </div>
  )
}

export default Home;