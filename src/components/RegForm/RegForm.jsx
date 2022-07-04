import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { sendRegLogFetch } from '../utils/FetchHelper';
import css from './RegForm.module.css';

const initErrors = {
    name: '',
    surname: '',
    nickname: '',
    email: '',
    password: '',
  }

function RegForm() {
    const [name, setName] = useState('');
    const [surname, setSurname ] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('')
    const [isError, setIsError] = useState(false);
    const [errorObj, setErrorObj] = useState(initErrors);
    let navigate = useNavigate();
  
    useEffect(() => {
      const isErrorEmpty = Object.values(errorObj).every((el) => el === '')
      if (!isErrorEmpty) {
          setIsError(true);
      }
  }, [name, surname, nickname, email, password, errorObj])
async function sendFetch() {
    const registerObj = {
      name: name,
      surname: surname,
      nickname: nickname,  
      email: email,
      password: password,
    };
    const resp = await sendRegLogFetch('register', registerObj)
    if (resp.success === true) {
      navigate('/login', { replace: true });
      }
      if (resp.success === false) {
      return false;
      }
}

async function registerHandler(e) {
  setIsError(false);
  setErrorObj(initErrors);
  e.preventDefault();
  sendFetch();
  if (name.trim() === '') {
    setErrorObj(prevState => ({...prevState, name: 'Name input can`t be blank' }));
  }
  if (surname.trim() === '') {
    setErrorObj(prevState => ({...prevState, surname: 'Surname input can`t be blank' }));
  }
  if (nickname.trim() === '') {
    setErrorObj(prevState => ({...prevState, nickname: 'Nickname input can`t be blank' }));
  }
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
        <h1>Register</h1>
        <form onSubmit={registerHandler}>
            {isError && <h3 className={css.err}>Please check the form</h3>} 
            <input onChange={(e) => setName(e.target.value)} size={40} type="text" placeholder="Enter you name here" name='name'/>
            {errorObj.name && <p>{errorObj.name}</p>}
            <input onChange={(e) => setSurname(e.target.value)} size={40} type="text" placeholder="Enter you surname here" name='surname'/>
            {errorObj.surname && <p>{errorObj.surname}</p>}
            <input onChange={(e) => setNickname(e.target.value)} size={40} type="text" placeholder="Enter you nickname here" name='nickname'/>
            {errorObj.nickname && <p>{errorObj.nickname}</p>}
            <input onChange={(e) => setEmail(e.target.value)} size={40} type="email" placeholder="Enter you email here" name='email'/>
            {errorObj.email && <p>{errorObj.email}</p>}
            <input onChange={(e) => setPassword(e.target.value)} size={40} type='password' placeholder="Enter your password here" name='password'/>
            {errorObj.password && <p>{errorObj.password}</p>}
            <button className={css.formBtn} type='submit'>Sign Up</button>
        </form>
    </div>
  )
}

export default RegForm