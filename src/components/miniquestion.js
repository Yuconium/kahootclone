import '../index.css';




import React, { useEffect, useState,  Component }  from 'react';


const MiniQuestion = (props) =>  {




  return (
    <div 
      className="text-sm flex flex-col justify-center p-3 w-32 transform ease-in-out duration-1000 shadow3  translateX rounded-xl border-4 border-blue-200"
    
    >
      <div className="rounded-xl truncate border-2 border-pink-200 p-1 ">
        {props.question.question}
      </div>
      <div>
      {
        props.question.answers.map(
          object =>
            <div className={"border-2 truncate rounded-xl border-blue-200 p-1"}>
             {object.answer}
            </div>
          )
        
      }
      </div>
      <div onClick={() => props.function(props.question.question, props.question.answers)} className="rounded-xl duration-300 cursor-pointer bg-green-600 mx-5 mt-1 text-center transform ease-in-out hover:scale-150 ">
        change
      </div>


    </div>
  )
}


export default MiniQuestion ;
