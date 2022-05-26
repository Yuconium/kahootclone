import '../index.css';

import Question from "../components/question.js";
import AnswerRow from "../components/answerRow.js";
import {getRequest} from "../components/functions.js";

import { useNavigate, useParams } from 'react-router-dom';


import React, { useEffect, useState,  Component }  from 'react';


function Quiz() {
  let navigate = useNavigate();
  let params = useParams();
  let [questionIndex, setIndex] = useState(0);
  let [pointCounter, setPointCounter] = useState(0);
  let hello = 1;
  let [quiz, setQuiz] = useState({});


  async function getRequest(URL){
    
    const Data = await fetch(URL)
      .then(response => response.json())
        .then(data => {
          
          return data
        });
  
    return Data;
  }


  useEffect(() => {
    setQuiz(await getRequest("http://localhost:8000/quiz/firstquiz"));
    console.log(quiz);
  }, [])



  const handleSetIndex = (isRight) => {
    if (isRight == true) {
      setPointCounter(pointCounter + 1)

    }
    setIndex(questionIndex + 1);
    console.log(pointCounter);
    console.log(isRight);
  }




  return (
    <div>
       <p> Hello </p>
      { questionIndex < quiz.questions.length  ?
        <>
          <Question question={quiz.questions[questionIndex  ]} index={questionIndex + 1} numberOfQuestions={quiz.questions.length}/>
          <AnswerRow answers={quiz.questions[questionIndex ].answers.slice(0, quiz.questions[questionIndex ].answers.length / 2)}
            getFurther={handleSetIndex} />
          <AnswerRow answers={quiz.questions[questionIndex ].answers.slice(quiz.questions[questionIndex].answers.length / 2, quiz.questions[questionIndex].answers.length) }
             getFurther={handleSetIndex} />
        </>
        :
        <p> Hello </p>
      }
    </div>
  );
}

export default Quiz;
