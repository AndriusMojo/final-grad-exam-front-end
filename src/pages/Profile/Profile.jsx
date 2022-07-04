import React, { useEffect, useState } from 'react'
import Container from '../../components/UI/Container/Container';
import Grid from '../../components/UI/Grid/Grid';
import { deleteFetch, getFetchWithToken } from '../../components/utils/FetchHelper';
import css from './Profile.module.css';

function Profile(props) {
  const [userArr, setUserArr] = useState([]);
  
    useEffect(() => {
        getUser();
    }, [])

async function getUser() {
    const userFromDb = await getFetchWithToken('users/user');
    setUserArr(userFromDb);
}
async function deleteHandler(id) {
  const delResult = await deleteFetch('recipes', id);
  if (delResult) {
    props.onDelete();
  }
}


  return (
    <div className={css.profilePage}>
      <Container>
      
        <div className={css.profile}>
            <img src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Clipart.png" alt="unisex profile image" />
            {userArr.data && userArr.data.map((uObj) => (
            <div key={uObj.nickname} className={css.profileTextInfo}>
              <h3>Name: ({uObj.name})   Surname: ({uObj.surname})</h3>
              <p>Email: {uObj.email}</p>
              <p>Nickname: {uObj.nickname}</p>
            </div>
            ))}
        </div>
        <div className={css.recipeBoxWrapper}>
        <Grid>
          {props.userRecipeArr.data && props.userRecipeArr.data.map((rObj) => (
                  <div key={rObj.id} className={css.recipeBox}>
                    <img src='https://source.unsplash.com/random/400x200/?dish' alt="nice food image" />
                    <div className={css.recipeBoxText}>
                      <h3>{rObj.title}</h3>
                      <p>{rObj.ingredients}</p>
                      <p>{rObj.process}</p>
                    </div>
                    <div className={css.buttonWrapper}>
                        <button onClick={() => deleteHandler(rObj.id)} className={css.deleteBtn}>Delete</button>
                        <button className={css.editBtn}>Edit</button>
                    </div>
                  </div>
              )
              )}
        </Grid>
        </div>
      </Container>
    </div>
  )
}

export default Profile;