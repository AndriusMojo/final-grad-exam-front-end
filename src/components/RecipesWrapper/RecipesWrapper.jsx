import React from 'react'
import RecipeCard from '../RecipeCard/RecipeCard';
import Container from '../UI/Container/Container';
import Grid from '../UI/Grid/Grid';
import css from './RecipesWrapper.module.css';

function RecipesWrapper(props) {

  return (
    <div className={css.recipesWrapper}>
    <Container>
        <Grid>
            {props.recipeArr.data && props.recipeArr.data.map((rObj) => (
                <RecipeCard key={rObj.id} title={rObj.title} imgLink='https://via.placeholder.com/400x200.png' />
            )
            )}
        </Grid>
    </Container>
    </div>
  )
}

export default RecipesWrapper;