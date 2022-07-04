import React from 'react'
import css from './Footer.module.css';

function Footer() {
  return (
      <div className={css.footer}>
        <p><a href="tel:+37061234567">Contact us - Phone: +37061234567</a></p>
        <p><a href="mailto:am@gmail.com">Email: am@gmail.com</a></p>
        <p><a href="https://www.google.lt/maps/place/Mindaugo+g.+7,+Vilnius+03225" target="_blank">Address: Mindaugo g. 7, Vilnius LT-03224</a></p>
        <p>Author: Andrius Mozuras</p>
		  </div>
  )
}

export default Footer;