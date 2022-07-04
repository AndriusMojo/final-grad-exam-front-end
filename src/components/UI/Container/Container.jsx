import React from 'react'
import css from './Container.module.css';

function Container(props) {
  return (
    <div className={`${css.container} ${props.className}`}>{props.children}</div>
  )
}

export default Container;