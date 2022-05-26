  import '../index.css';
import React, { useEffect, useState,  Component }  from 'react';
import { useNavigate } from 'react-router-dom';



function Home() {
  let navigate = useNavigate();
  let [id, setId] = useState("");



  return (
    <div >
      <div className="flex  justify-center ">
        <div className="bg-pink-200 shadow3 mt-8 p-3 text-center border-yellow-200 border-8 rounded-lg">



          <div className="flex justify-center m-3">
          <p>
            Passwort: &nbsp;
          </p>
          <input
            className="rounded-xl p-1"
            value={id}
            onChange={e =>  

                setId(e.target.value)

            }
          />
          </div>

          <div
            className=" bg-yellow-200 cursor-pointer rounded-xl hover:bg-yellow-700 transform duration-300 ease-in-out hover:scale-150 shadow3"
            onClick={() => (id != "") ? navigate("/quiz/" + id) : undefined}
          >
            Solve It!
          </div>


        </div>

      </div>
      <div className="absolute inset-x-0 bottom-0 flex">
        <div
          className="bg-yellow-200 w-44 cursor-pointer m-3 text-center p-1 shadow3 rounded-xl hover:bg-yellow-700"
          onClick={() => navigate("/newQuiz")}
        >
          create new Quiz!
        </div>
        <div
          className="bg-yellow-200 cursor-pointer  w-32 text-center shadow3 m-3 p-1 rounded-xl hover:bg-yellow-700"
        >
          Contact
        </div>
      </div>
    </div>
  )
}

export default Home;
