import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        navigate('/');
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        if (authUser) {
          navigate('/');
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__background">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />
        <div className="login__gradient" />
      </div>

      <div className="login__body">
        <>
          <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
          <form>
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" onClick={isSignUp ? register : signIn}>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
            
            <h4>
              <span className="login__gray">
                {isSignUp ? 'Already have an account? ' : 'New to Netflix? '}
              </span>
              <span className="login__link" onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? 'Sign in now.' : 'Sign up now.'}
              </span>
            </h4>
          </form>
        </>
      </div>
    </div>
  );
}

export default Login;
