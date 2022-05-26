import "../index.css";

import React, { useEffect, useState,  Component }  from 'react';



const AnswerButton = (props) => {
  let color = "bg-green-400";
  return (
    <div className={color + " rounded border-4 hover:bg-green-500 hover:border-white border-black flex-auto w-52 h-42"} onClick={
     () => {
       props.getFurther(props.answer.isRight)
     }
    }>
      <p className="py-16 text-center text-xl " > {props.answer.text} </p>
    </div>
  )
}


export default AnswerButton
