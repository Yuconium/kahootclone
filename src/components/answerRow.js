import "../index.css";
import AnswerButton from "./answer.js";



import React, { useEffect, useState,  Component }  from 'react';


function AnswerRow(props) {





  return (
    <div className="flex flex-wrap">
      {
        props.answers.map(object => (
          <AnswerButton answer={object} getFurther={props.getFurther} />
        ))
      }
    </div>
  )
}


export default AnswerRow;
