import React from 'react'
import RegForm from '../../components/RegForm/RegForm';
import css from './Register.module.css';

function Register() {
  return (
    <div className={css.registerPage}>
      <RegForm />
    </div>
  )
}

export default Register;