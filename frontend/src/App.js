import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter
import Signup from './Component/Signup.js';
import Login from './Component/Login.js';
import Cnadidatesignup from './Component/Candidatesignup.js';
import Votecandidate from './Component/Votecandidate.js';
import Votecount from './Component/Votecount.js';
import MainMenu from './Component/MainMenu.js';
import Removevote from './Component/Removevote.js';
import Editcandidate from './Component/Editcandidate.js';
import Candidatelogin from './Component/Candidatelogin.js';
import Logout from './Component/Logout.js';
import Profile from './Component/Profile.js';


function App() {
  const voterData = {
    name: 'Abhishek Kumar',
    aadhaar: '1234-5678-9123',
    age: 25,
    address: '123 Main Street, New Delhi, India',
    image: 'https://via.placeholder.com/150', // Replace with actual URL
  };

  return (
    <Router>
      <Routes>
        <Route  path="/" element={<MainMenu/>} /> 
        <Route  path="/signup" element={<Signup/>} /> 
        <Route  path="/login" element={<Login />} />
        <Route  path="/candidatesignup" element={<Cnadidatesignup/>} />
        <Route  path="/vote" element={<Votecandidate/>} />
        <Route  path="/votecount" element={<Votecount/>} />
        <Route  path="/editvote" element={<Removevote/>} />
        <Route  path="/editcandidate" element={<Editcandidate/>} />
        <Route  path="/logincandidate" element={<Candidatelogin/>} />
        <Route  path="/logout" element={<Logout/>} />
        <Route  path="/profile" element={<Profile />} />
        {/* <Route  path="/login/signup" element={<Login />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
