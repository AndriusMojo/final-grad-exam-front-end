import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../UI/authcontext/authContext';
import { sendRegLogFetch } from '../utils/FetchHelper';
import css from './LogForm.module.css';

  const initErrors = {
    email: '',
    password: '',
  }

function LogForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('')
    const [isError, setIsError] = useState(false);
    const [errorObj, setErrorObj] = useState(initErrors);
    const authCtx = useContext(AuthContext);
    let navigate = useNavigate();
  
    useEffect(() => {
      const isErrorEmpty = Object.values(errorObj).every((el) => el === '')
      if (!isErrorEmpty) {
          setIsError(true);
      }
  }, [email, password, errorObj])
async function sendFetch() {
    const loginObj = {
      email: email,
      password: password,
    };
    const resp = await sendRegLogFetch('login', loginObj)
    console.log('resp ===', resp);
    if (resp.success === true) {
      localStorage.setItem('token', resp.data);
      authCtx.login();
      navigate('/profile', { replace: true });
      }
      if (resp.success === false) {
      console.log(`err: 'Incorrect email or password'`);
      return false;
      }
}

async function loginHandler(e) {
  setIsError(false);
  setErrorObj(initErrors);
  e.preventDefault();
  sendFetch();
  if (email.trim() === '') {
    setErrorObj(prevState => ({...prevState, email: 'Email input can`t be blank' }));
  }
  if (password.trim() === '') {
    setErrorObj(prevState => ({...prevState, password: 'Password input can`t be blank' }));
  }
  if (isError) {
    return
}
}

  return (
    <div className={css.formWrapper}>   
        <h1>Login</h1>
        <form onSubmit={loginHandler}>
            {isError && <h3 className={css.err}>Please check the form</h3>} 
            <input onChange={(e) => setEmail(e.target.value)} size={40} type="email" placeholder="Enter you email here" name='email'/>
            {errorObj.email && <p>{errorObj.email}</p>}
            <input onChange={(e) => setPassword(e.target.value)} size={40} type='password' placeholder="Enter your password here" name='password'/>
            {errorObj.password && <p>{errorObj.password}</p>}
            <button className={css.formBtn} type='submit'>Sign In</button>
        </form>
    </div>
  )
}

export default LogForm;