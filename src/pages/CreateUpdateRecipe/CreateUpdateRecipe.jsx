import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Container from '../../components/UI/Container/Container';
import { sendCreateFetch } from '../../components/utils/FetchHelper';
import css from './CreateUpdateRecipe.module.css';

const initErrors = {
  title: '',
  category_id: '',
  ingredients: '',
  process: '',
  img_url: '',
}

function CreateUpdateRecipe(props) {
  const [title, setTitle] = useState('');
  const [category_id, setCategoryId ] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [process, setProcess] = useState('');
  const [img_url, setImgUrl ] = useState('')
  const [isError, setIsError] = useState(false);
  const [errorObj, setErrorObj] = useState(initErrors);
  let navigate = useNavigate();

  useEffect(() => {
    const isErrorEmpty = Object.values(errorObj).every((el) => el === '')
    if (!isErrorEmpty) {
        setIsError(true);
    }
}, [title, category_id, ingredients, process, img_url, errorObj])

async function sendFetch() {
  const createRecipeObj = {
    title: title,
    category_id: category_id,
    ingredients: ingredients,  
    process: process,
    img_url: img_url,
  };
  const resp = await sendCreateFetch('createRecipe', createRecipeObj)
  if (resp.success === true) {
      navigate('/profile', { replace: true });
    }
    if (resp.success === false) {
    return false;
    }
}

async function createRecipeHandler(e) {
  e.preventDefault();
setIsError(false);
setErrorObj(initErrors);
sendFetch();
if (title.trim() === '') {
  setErrorObj(prevState => ({...prevState, title: 'Title input can`t be blank' }));
}
if (category_id.trim() === '') {
  setErrorObj(prevState => ({...prevState, category_id: 'Category input can`t be blank' }));
}
if (ingredients.trim() === '') {
  setErrorObj(prevState => ({...prevState, ingredients: 'ingredients input can`t be blank' }));
}
if (process.trim() === '') {
  setErrorObj(prevState => ({...prevState, process: 'Process input can`t be blank' }));
}
if (img_url.trim() === '') {
  setErrorObj(prevState => ({...prevState, img_url: 'Img Url input can`t be blank' }));
}
if (isError) {
  return
}
}


const cancelCreateHandler = () => {
  navigate('/profile')
}

  return (
    <div className={css.crupRecipePage}>
      <Container>
              <h1>Create your recipe</h1>
          <form onSubmit={createRecipeHandler} className={css.createRecipeForm}>
              <label htmlFor="recipeTitle">Title</label>
              <input onChange={(e) => setTitle(e.target.value)} id="recipeTitle" name="recipeTitle" type="text" />
              <label htmlFor="recipeCategory">Category</label>
              <select onChange={(e) => setCategoryId(e.target.value)} id="recipeCategory" name="recipeCategory">
                {props.categoriesArr.data && props.categoriesArr.data.map((cObj) => (
                  <option key={cObj.id} value={cObj.id}>{cObj.title}</option>
                  ))}
              </select>
              <label htmlFor="recipeIngredients">Ingredients:</label>
              <textarea onChange={(e) => setIngredients(e.target.value)} id="recipeIngredients" name="recipeIngredients"></textarea>
              <label htmlFor="recipeDirections">Production process:</label>
              <textarea onChange={(e) => setProcess(e.target.value)} id="recipeDirections" name="recipeDirections"></textarea>
              <label htmlFor="recipeImage">Image url</label>
              <input onChange={(e) => setImgUrl(e.target.value)} id="recipeImage" name="img_link" type="text" />
              <button type="submit" className={css.saveBtn}>Save</button>
              <button onClick={cancelCreateHandler} type="button" className={css.cancelBtn}>Cancel</button>
          </form>
      </Container>
    </div>
  )
}

export default CreateUpdateRecipe;