import React, { useState } from 'react'
import './styles/Authorization.css'

const Authorization = () => {
  const [authorization, setAuthorization] = useState('Register')

  const [nameRegister, setNameRegister] = useState('')
  const [surnameRegister, setSurnameRegister] = useState('')
  const [emailRegister, setEmailRegister] = useState('')
  const [passwordRegister, setPasswordRegister] = useState('')
  const [confirmPasswordRegister, setConfirmPasswordRegister] = useState('')

  const [emailLogin, setEmailLogin] = useState('')
  const [passwordLogin, setPasswordLogin] = useState('')

  const [error, setError] = useState('')

  const switchToSignUp = () => {
    setAuthorization('Register')
    if (authorization != 'Register') setError('')
  }
  const switchToSignIn = () => {
    setAuthorization('Sign up')
    if (authorization != 'Sign up') setError('')
  }
  const handleValueNameRegister = (e) => setNameRegister(e.target.value)
  const handleSurnameRegister = (e) => setSurnameRegister(e.target.value)
  const handleEmailRegister = (e) => setEmailRegister(e.target.value)
  const handlePasswordRegister = (e) => setPasswordRegister(e.target.value)
  const handleConfirmPasswordRegister = (e) =>
    setConfirmPasswordRegister(e.target.value)

  const handleEmailLogin = (e) =>
    setEmailLogin(e.target.value)
  const handlePasswordLogin = (e) =>
    setPasswordLogin(e.target.value)

  const register = async () => {
    try {
      const newUser = {
        name: nameRegister,
        surname: surnameRegister,
        email: emailRegister,
        password: passwordRegister,
        confirmPassword: confirmPasswordRegister,
      }
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
      const data = await response.json()
      if (data.error) setError(data.error)
      else {
        alert(data.message)
        localStorage.setItem('user', JSON.stringify({email: data.email, name: data.name}))
        setError('')
        setNameRegister('')
        setSurnameRegister('')
        setEmailRegister('')
        setPasswordRegister('')
        setConfirmPasswordRegister('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const login = async () => {
    try {
        const user = {
          email: emailLogin,
          password: passwordLogin,
        }
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(user),
        })
        const data = await response.json()
        if (data.error) setError(data.error)
        else {
          alert(data.message)
          localStorage.setItem('user', JSON.stringify({email: data.email, name: data.name}))
          setError('')
          setEmailLogin('')
          setPasswordLogin('')
        }
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className="authorization">
      <form className="authorization-form">
        <div className="switch-type-authorization">
          <div
            style={{
              width: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <button onClick={switchToSignUp} type="button">
              Sign up
            </button>
          </div>
          <div
            style={{
              width: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <button onClick={switchToSignIn} type="button">
              Sign in
            </button>
          </div>
        </div>
        {authorization == 'Register' && (
          <div>
            <div className="inputes">
              <div>
                <div className="authorization-input-name">
                  <input
                    placeholder="Your name"
                    value={nameRegister}
                    onChange={handleValueNameRegister}
                  ></input>
                </div>
                <div className="authorization-input-surname">
                  <input
                    placeholder="Your surname"
                    value={surnameRegister}
                    onChange={handleSurnameRegister}
                  ></input>
                </div>
                <div className="authorization-input-email">
                  <input
                    placeholder="Your email"
                    type="email"
                    value={emailRegister}
                    onChange={handleEmailRegister}
                  ></input>
                </div>
                <div className="authorization-input-password">
                  <input
                    placeholder="Your password"
                    type="password"
                    value={passwordRegister}
                    onChange={handlePasswordRegister}
                  ></input>
                </div>
                <div className="authorization-input-password">
                  <input
                    placeholder="Confirm your password"
                    type="password"
                    value={confirmPasswordRegister}
                    onChange={handleConfirmPasswordRegister}
                  ></input>
                </div>
              </div>
            </div>
            {error != '' && (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div className="error">{error}</div>
              </div>
            )}
            <div className="div-btn-sign-up">
              <button className="btn-sign-up" type="button" onClick={register}>
                Зареєструватися
              </button>
            </div>
          </div>
        )}
        {authorization == 'Sign up' && (
          <div>
            <div className="inputes">
              <div>
                <div className="authorization-input-email">
                  <input
                    placeholder="Your email"
                    type="email"
                    value={emailLogin}
                    onChange={handleEmailLogin}
                  ></input>
                </div>
                <div className="authorization-input-password">
                  <input
                    placeholder="Your password"
                    type="password"
                    value={passwordLogin}
                    onChange={handlePasswordLogin}
                  ></input>
                </div>
              </div>
            </div>
            {error != '' && (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div className="error">{error}</div>
              </div>
            )}
            <div className="div-btn-sign-up">
              <button className="btn-sign-up" type="button" onClick={login}>
                Увійти
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default Authorization
