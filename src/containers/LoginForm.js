import React, { useState } from 'react'

import './LoginForm.scss'
import * as constants from '../utils/constants'

import axios from 'axios'

/* Login Form for the application */
const LoginForm = (props) => {
    const { SIGN_IN_LABEL, EMAIL, PASSWORD, REMEMBER_ME, FORGOT_PASSWORD, NO_ACCOUNT_LABEL, SIGN_UP, RESEND_EMAIL, EMAIL_ERROR_MSG, PWD_ERROR_MSG, NETWORK_ISSUE } = constants
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ validEmail, setValidEmail ] = useState(true)
    const [ validPwd, setValidPwd ] = useState(true)

    // setting the email and password field values on input change event
    const onChange = (e) => {
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        }else {
            setPassword(e.target.value)
            setValidPwd(e.target.value.length > 0)
        }
    }

    // validating the email and password fields length on input blur event
    const onInputBlur = (e) => {
        if(e.target.name === 'email'){
            setValidEmail(isValidEmail(email) && email.length > 0)
        }else if(e.target.name === 'password'){
            setValidPwd(password.length > 0)
        }
    }

    //validate the email entered
    const isValidEmail = (input) => {
        const emailRegEx = /(\w\.?)+@[\w\.-]+\.\w{2,4}/
        return emailRegEx.test(input)
    }

    // send the request to the server with email and password values on 'Sign in' button click
    const onSignInBtnClick = () => {
        if(email.length === 0){
            setValidEmail(isValidEmail(email) || false)
        }
        if(password.length === 0){
            setValidPwd(false)
        }
        validEmail && validPwd && axios.post('http://localhost:8000/api/login', {
            email: email,
            pwd: password
          })
          .then(function (response) {
            console.log(response);
            clearValues()
          })
          .catch(function (error) {
            console.log(error);
            window.alert(NETWORK_ISSUE)
            clearValues()
          });
    }

    // Clear the values after clicking on sign in button
    const clearValues = () => {
        setEmail('')
        setPassword('')
    }

    //Redirect to forgot password page
    const onForgotPwdClick = () => {
        props.history.push('/forgot_password')
    }

    return (
        <div className="outer-wrapper">
            <div className='login-form-wrapper'>
                <h2 className='sign-in-label'>{SIGN_IN_LABEL}</h2>
                <div className='email'>
                    <label aria-label={EMAIL} htmlFor="email"><h3>{EMAIL}</h3></label>
                    <input type="text" id="email" name="email" onChange={onChange} onBlur={onInputBlur} value={email} tabIndex="0"></input>
                    {!validEmail && <p className='error-msg' tabIndex="0">{EMAIL_ERROR_MSG}</p>}
                </div>
                <div className='password'>
                    <label  aria-label={PASSWORD} htmlFor="password"><h3>{PASSWORD}</h3></label>
                    <input type="password" id="password" name="password" onChange={onChange} onBlur={onInputBlur} value={password} tabIndex="0"></input>
                    {!validPwd && <p className='error-msg' tabIndex="0">{PWD_ERROR_MSG}</p>}
                </div>
                <div className='remember-me-wrapper'>
                    <span><input type='checkbox' id="rememberMe" className='remember-chkbox' tabIndex="0"></input></span>
                    <span><label className='remember-me-label'  aria-label={REMEMBER_ME} htmlFor="rememberMe">{REMEMBER_ME}</label></span>
                </div>
                <button className='sign-in-btn' onClick={onSignInBtnClick} tabIndex="0">{SIGN_IN_LABEL}</button>
                <div className='links'>
                    <button tabIndex="0" onClick={onForgotPwdClick}>{FORGOT_PASSWORD}</button>
                    <span className='child-links'><label tabIndex="0">{NO_ACCOUNT_LABEL}</label>
                        <button tabIndex="0">{SIGN_UP}</button>
                        </span>
                    <button tabIndex="0" className='child-links'>{RESEND_EMAIL}</button>
                </div>
            </div>
        </div>
    )
}

export default LoginForm