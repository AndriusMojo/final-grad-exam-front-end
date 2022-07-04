import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import CreateUpdateRecipe from "./pages/CreateUpdateRecipe/CreateUpdateRecipe";
import Recipes from "./pages/Recipes/Recipes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useEffect, useState } from "react";
import AuthContext from "./components/UI/authcontext/authContext";
import { getFetch, getFetchWithToken } from "./components/utils/FetchHelper";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem('token'));
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [recipeArr, setRecipeArr] = useState([]);
  const [userRecipeArr, setUserRecipeArr] = useState([]);

  useEffect(() => {
      getCategories();
      getRecipe();
      getUserRecipe();
  }, [])

async function getCategories() {
  const categoriesFromDb = await getFetch('categories');
  setCategoriesArr(categoriesFromDb);
}
async function getRecipe() {
  const recipesFromDb = await getFetch('recipes');
  setRecipeArr(recipesFromDb);
}
async function getUserRecipe() {
  const recipesFromDb = await getFetchWithToken('recipes/user');
  setUserRecipeArr(recipesFromDb);
}


function login() {
  const token = localStorage.getItem('token');
  if (token.length === 0) {
    setIsUserLoggedIn(false);
  } 
  if (token.length) {
    setIsUserLoggedIn(true);
  }
}

function logout() {
  localStorage.removeItem('token')
  setIsUserLoggedIn(false);
}

const ctxValue = {
  isUserLoggedIn,
  login,
  logout,
};

  return (
    <div className="App">
      <AuthContext.Provider value={ctxValue}>
        <BrowserRouter>
          <Header categoriesArr={categoriesArr} />
            <Routes>
              <Route path="/" element={<Home recipeArr={recipeArr} />} />
              <Route path="/cruprecipe" element={<PrivateRoute> <CreateUpdateRecipe categoriesArr={categoriesArr} /> </PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute> <Profile onDelete={getUserRecipe} userRecipeArr={userRecipeArr} /> </PrivateRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/recipes" element={<Recipes recipeArr={recipeArr} categoriesArr={categoriesArr} />} />
            </Routes>
            <Footer />
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
