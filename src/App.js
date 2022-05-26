import logo from './logo.svg';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";

import Home from "./sites/home.js";
import Quiz from "./sites/Quiz.js";
import Results from "./sites/Results.js";
import NewQuizCreator from "./sites/newQuizCreator.js";
import Test from "./sites/Test.js";

import React, { useEffect, useState,  Component }  from 'react';



function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />


        <Route path="/quiz/:id" element={<Quiz />} />


        <Route path="/results" element={<Results />} />


        <Route path="/newQuiz" element={<NewQuizCreator />} />
        <Route path="/test" element={<Test />} />

      
      </Routes>
    </Router>
  )
}

export default App;
