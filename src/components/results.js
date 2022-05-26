import '../index.css';
import React, { useEffect, useState,  Component }  from 'react';

function Results(props) {


  return (

    <div className="flex justify-center  w-auto h-auto ">
      <div className="bg-white-500 w-64 bg-yellow-500 rounded-3xl shadow3">

        {
          props.results.map(win => (
            <div class="flex m-3 rounded-2xl h-12 justify-between bg-green-200 shadow3 p-3">
              <p>
                {win.name}
              </p>
              <p>
                {win.count}
              </p>
            </div>
          ))
        }
      </div>
    </div>
  )
}


export default Results
