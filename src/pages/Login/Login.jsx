import React from 'react'
import LogForm from '../../components/LogForm/LogForm';
import css from './Login.module.css';

function Login() {
  return (
    <div className={css.loginPage}>
      <LogForm />
    </div>
  )
}

export default Login;