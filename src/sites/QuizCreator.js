import '../index.css';

import MiniQuestion from "../components/miniquestion.js";
import InputwithButton from "../components/inputsave.js";


import React, { useEffect, useState, useRef, Component }  from 'react';



function QuizCreator() {
  let position = 0;
  let quiz = [
  {
    id: 1,
    question: "This is adsfsdf example question",
    answers: [
      {   
        answer: "answer nr.1sadsdadasdadasdadasdfdfgsdfsadfsdfsdfsdfsdf",
        isRight: false
      },{
        answer: "answer nr.2dsfsdfsdfsafadfsdfsdfsdfsdf",
        isRight: true
      },{
        answer: "answer nr.fsdfsdfsdfsdfsdfsdfsdfsdf3",
        isRight: false
      },{
        answer: "answerfsdfsdfsdfsdfsdfsdfsdfdsffsdfdsfsdf nr.4",
        isRight: false
      },
    ]},
  {
    id: 2,
    question: "This is sfsdfa example question",
    answers: [
      {
        answer: "answer nr.1sadsdadasdadasdadasdfdfgsdfsadfsdfsdfsdfsdf",
        isRight: false
      },{
        answer: "answer nr.3dsfsdfsdfsafadfsdfsdfsdfsdf",
        isRight: true
      },{
        answer: "answer nr.fsdfsdfsdfsdfsdfsdfsdfsdf3",
        isRight: false
      },{
        answer: "answerfsdfsdfsdfsdfsdfsdfsdfdsffsdfdsfsdf nr.4",
        isRight: false
      },
    ]},
  {
    id: 3,
    question: "Tsdfsdhis is a example question",
    answers: [
      {
        answer: "answer nr.1sadsdadasdadasdadasdfdfgsdfsadfsdfsdfsdfsdf",
        isRight: false
      },{
        answer: "answer nr.1dsfsdfsdfsafadfsdfsdfsdfsdf",
        isRight: true
      },{
        answer: "answer nr.fsdfsdfsdfsdfsdfsdfsdfsdf3",
        isRight: false
      },{
        answer: "answerfsdfsdfsdfsdfsdfsdfsdfdsffsdfdsfsdf nr.4",
        isRight: false
      },
    ]},
  {
    id: 4,
    question: "Thsdfsfis is a example question",
    answers: [
      {
        answer: "answer nr.1sadsdadasdadasdadasdfdfgsdfsadfsdfsdfsdfsdf",
        isRight: false
      },{
        answer: "answer nr.2dsfsdfsdfsafadfsdfsdfsdfsdf",
        isRight: true
      },{
        answer: "answer nr.fsdfsdfsdfsdfsdfsdfsdfsdf3",
        isRight: false
      },{
        answer: "answerfsdfsdfsdfsdfsdfsdfsdfdsffsdfdsfsdf nr.4",
        isRight: false
      },
    ]}
  ];
  

  let [newQuiz, setNewQuiz] = useState(quiz);

  let [changeQuiz, setChangeQuiz] = useState({
    question: newQuiz[0].question,
    answers: newQuiz[0].answers
  });

  let [arrayPosition, setArrayPosition] = useState(0);
  
  let [reload, setReload] = useState(0);

  
  useEffect(() => {
    console.log(newQuiz.length);
    console.log(arrayPosition)
  }, [arrayPosition])


  function move(direction) {
    position += direction;

    console.log(arrayPosition);
  }

  function handleInputSave(questionIndex, answerIndex, newText){
    let oldQuiz = newQuiz;
    if (answerIndex === -1){
      oldQuiz[questionIndex].question = newText;
    } else {
      oldQuiz[questionIndex].answers[answerIndex] = newText;
    }

    setNewQuiz(oldQuiz);

  }

  function handleChangeQuestion(newQuestion, newAnswers) {

    setChangeQuiz({
      question: newQuestion,
      answers: newAnswers
    })
    
  }
  
  function handleArrayPosition(number) {
    if (arrayPosition == newQuiz.length - 1 && number == 1 || arrayPosition == 0 && number == -1){
      number = 0
    }
    setArrayPosition(arrayPosition + number)
  }


  return (
    <div>
      <div className="flex justify-center p-3">
        <div className="w-32 flex ">
        {
          newQuiz.map((Question, index) => (

            <MiniQuestion key={Question.id} question={Question} function={(newQuestion, newAnswers) => handleChangeQuestion(newQuestion, newAnswers)} />

          ))
        }
        
        </div>
      </div>
      <div className="flex justify-center">
        <div
          className=" w-12 cursor-pointer m-3 text-center transform ease-in-out duration-500 hover:scale-150 active:scale-110 p-1 shadow3 rounded-xl "
          onClick={() => move(-128)}
        >
          <img  className="transform rotate-180" src="https://img.icons8.com/fluency/48/000000/arrow.png"/>
        </div>
        <div
          className=" w-12 cursor-pointer m-3 text-center  transform ease-in-out duration-500 hover:scale-150 p-1 shadow3 rounded-xl "
          onClick={() => move(128)}
        >
          <img   src="https://img.icons8.com/fluency/48/000000/arrow.png"/>
        </div>
      </div>


      <div className="flex  m-5 justify-center">
        <div className="text-center bg-yellow-200 rounded-xl border-2 border-black">
          <div 
             className="text-sm p-5  flex flex-col rounded-xl border-4 border-blue-200"
    
           >
   
            <InputwithButton border="border-black border-2" 
                             text = {changeQuiz.question} 
                             index={-1} 
                             position={arrayPosition}
                             save={(questionIndex, answerIndex, newText) => handleInputSave(questionIndex, answerIndex, newText)}

              />
            
            <div className="flex flex-col justify-center p-1 ">
             {
                
                changeQuiz.answers.map(
                  (object, Index) => (
                     <InputwithButton border="" 
                                      text = {object.answer} 
                                      index={Index} 
                                      position={arrayPosition}
                                      save={(questionIndex, answerIndex, newText) => handleInputSave(questionIndex, answerIndex, newText)}

                       />
                  )
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default QuizCreator;
