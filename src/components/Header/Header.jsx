import React from 'react'
import Navigation from '../Navigation/Navigation';
import css from './Header.module.css';


function Header(props) {

  return (
  <div id={css.header} className={css.header}>
      <Navigation categoriesArr={props.categoriesArr}  />
  </div>
  )
}

export default Header;

