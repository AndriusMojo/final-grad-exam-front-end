import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../UI/authcontext/authContext';
import css from './Navigation.module.css';

function Navigation(props) {
	const [navVisible, setNavVisible] = useState(window.innerWidth > 840);
	const [searchVisible, setSearchVisible] = useState(window.innerWidth > 840);
	const authCtx = useContext(AuthContext);
	let navigate = useNavigate();
	useEffect(() => {
		function handleResize() {
			if (window.innerWidth > 840) {
				if (!navVisible) {
					setNavVisible(true);
				}
				if (!searchVisible) {
					setSearchVisible(true);
				}
			} else {
				if (navVisible) {
					setNavVisible(false);
				}
				if (searchVisible) {
					setSearchVisible(false);
				}
			}
		}
		window.addEventListener('resize', handleResize);
	});
    const logout = () => {
      localStorage.removeItem("token");
	  authCtx.logout();
      navigate('/login', {redirect: true})
    };

  return (
    <>
			<a id={css.navbarMenu} className={css.navbarMenu} href="#" onClick={(e) => {
				e.preventDefault();
				setNavVisible(prevVisible => !prevVisible);
			}}>=</a>
			<div className={css.logoContainer}>
				<Link to="/"><img src="https://www.pngkey.com/png/full/131-1314055_hands-cutlery-plate-food-icon-set-restaurant-vector.png" /></Link>
			</div>
			{navVisible && <ul id={css.navbar} className={css.navbar} onClick={() => { if (window.innerWidth <= 840) setNavVisible(false)}}>
				<li className={css.categoriesDropdown}>
					<a href="#">Category</a>
					<div className={css.categoriesList}>
						{props.categoriesArr.data && props.categoriesArr.data.map((cObj) => (
							<a href="#" key={cObj.id}>{cObj.title}</a>
						))};
					</div>
				</li>
				{authCtx.isUserLoggedIn && <li><Link className='tdn' to="/profile">Profile</Link></li>}
				<li><Link className='tdn' to="/">Home</Link></li>
				{!authCtx.isUserLoggedIn && <li><Link className='tdn' to="/login">Login</Link></li>}
				{!authCtx.isUserLoggedIn && <li><Link className='tdn' to="/register">Register</Link></li>}
				<li><Link className='tdn' to="/recipes">Recipes</Link></li>
				{authCtx.isUserLoggedIn && <li><Link className='tdn' to="/cruprecipe">Create your recipe</Link></li>}
			</ul>
			}
      		{authCtx.isUserLoggedIn && <button onClick={logout} className={css.logoutBtn}>Logout</button>}
			<div className={css.searchContainer}>
				<a id={css.searchButton} className={css.searchButton} href="#" onClick={(e) => {
				e.preventDefault();
				setSearchVisible(prevVisible => !prevVisible);
			}}>o</a>
				{searchVisible && <input type="text" id={css.search} className={css.searchInput} placeholder="Search in page..." /> }
			</div>
		<Outlet />
    </>
  )
}


export default Navigation;