import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Watch from './pages/Watch';
import MyList from './pages/MyList';
import Search from './pages/Search';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        setUser(userAuth);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Router>
      <div className="App">
        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/mylist" element={<MyList />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
