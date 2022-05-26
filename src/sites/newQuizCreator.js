import '../index.css';


import InputwithButton from "../components/inputsave.js";
import Icon from "../components/icon.js";
import Button from "../components/button.js";
import SlideInDialogBox from "../components/slideInDialogBox.js";

import getRequest from "../components/functions.js";


import { useNavigate } from 'react-router-dom';


import React, { useEffect, useState, useRef, Component }  from 'react';



let changeQuiz = [{
	    id: 1,
	   
	    question: "Wie geht es dir?",
	    answers: [
	      {   
	        answer: "mir geht es sehr gut",
	        isRight: false
	      },{
	        answer: "mir geht es gut",
	        isRight: false
	      },{
	        answer: "mir geht es schlecht",
	        isRight: false
	      },{
	        answer: "mir geht es sehr schlecht",
	        isRight: false
	      },
	    ]}
	  ];

function NewQuizCreator() {


	let [dialog, setDialog] = useState("translate2");
	
	let navigate = useNavigate();
	let [newQuiz, setNewQuiz] = useState(changeQuiz);
 	let [word, setWord] = useState("");

  	function handleInputSave(questionIndex, answerIndex, newText, newBoolean){
	    let oldQuiz = newQuiz;
	    if (answerIndex === -1){
	      oldQuiz[questionIndex].question = newText;
	    } else {
	      oldQuiz[questionIndex].answers[answerIndex].answer = newText;
	      oldQuiz[questionIndex].answers[answerIndex].isRight = newBoolean;

	    }

	    setNewQuiz(oldQuiz);
	    console.log(newQuiz);
  	}


  	function deleteQuestion(questionIndex){
  		let oldQuiz = newQuiz.slice();
  		oldQuiz.splice(questionIndex, 1);
  		setNewQuiz(oldQuiz);
  	}

  	function deleteAnswer(questionIndex, answerIndex) {
  		let oldQuiz = newQuiz.slice();
  		oldQuiz[questionIndex].answers.splice(answerIndex, 1);
  		console.log(oldQuiz)
  		setNewQuiz(oldQuiz);
  		console.log(newQuiz);
  	}
    
  	function addQuestion(questionIndex){
  		console.log(newQuiz);
  		console.log(newQuiz.slice(0, questionIndex));
  		setNewQuiz(newQuiz.slice(0, questionIndex).concat({
			id: newQuiz.length + 1,
		
			question: "Was ist deine Lieblingsfarbe?",
			answers: [
				{
					answer: "Blau",
					isRight: true
				},
				{
					answer: "Rot",
					isRight: false
				},
				{
					answer: "Gelb",
					isRight: false
				},
				{
					answer: "Pink",
					isRight: false
				}
			]												
		}).concat(newQuiz.slice(questionIndex, newQuiz.length)));
		console.log(newQuiz.slice(0, questionIndex));
		console.log(newQuiz);

  	}

  	function addAnswer(questionIndex){
  		if (newQuiz[questionIndex].answers.length <= 5){
	  		let oldQuiz = newQuiz.slice();
	  		console.log(oldQuiz[questionIndex].answers);
	  		oldQuiz[questionIndex].answers.push({
	  			answer: "Im very good",
	  			isRight: true
	  		});
	  		console.log(oldQuiz[questionIndex].answers);
	  		setNewQuiz(oldQuiz);
  		}
  	}

 


  	async function sendQuiz(Quiz, Name){


  		let sendedQuiz = {
  			Name: Name,
  			results: [],
  			questions: Quiz
  		};
  		console.log(Quiz);
  		console.log(JSON.stringify(sendedQuiz));
		const isDuplicate = await getRequest("http://localhost:8000/echo/" + Name);

		console.log(isDuplicate);

  		/* Check if the Name is already in the database */ 
		if (isDuplicate.message == "false"){

	  		await fetch(
	  			"http://localhost:8000/postQuiz", {
	  				method: "POST",
	  				
	  				headers: { 'Content-Type': 'application/json' },	
	  				body: JSON.stringify(sendedQuiz	)
	  			}).then(response => response.json())
	  			.then(data => {
				  console.log('Success:', data);
				})
				.catch((error) => {
				  console.error('Error:', error);
				});
  		}
  	}

  	function transitionBack(){
  		setDialog("translate2");
  		console.log(newQuiz);
  	}

  	useEffect(() => {
  		console.log(newQuiz)
  	}, [])

	return (
		<>
		<SlideInDialogBox 
							  func={(Name) => sendQuiz(newQuiz, Name)} 
							  isOn={dialog}
							  getBack={transitionBack}
		/>
		<div className="flex justify-center  flex-col">
			
			<div className="flex flex-col md:mx-56 lg:mx-80 justify-center ">
				{
					newQuiz.map(
						
						(Question, questionIndex) => (
								<>
									<Icon key={Question.id}
										  source={"https://assets.dryicons.com/uploads/icon/svg/12630/0be0f588-bd44-4436-bf6e-54498fbf74dd.svg"} 
										  click={() => addQuestion(questionIndex)} 
										  type="middle" 
										  extra="mt-5 mb-5"/>

									<div key={Question.id}
										className=" border-yellow-200 border-8 m-3 flex justify-center flex-col p-3 bg-pink-200 shadow3 rounded-lg">
										
										
										<InputwithButton border="border-black border-2 p-4"
														 text={Question.question}
														 index={-1}
														 position={questionIndex}
														 save={(questionIndex, answerIndex, newText, newBoolean) => handleInputSave(questionIndex, answerIndex, newText, newBoolean)}
														 boolean = {false} 
														 deleteAnswer={(questionIndex, answerIndex) => deleteAnswer(questionIndex, answerIndex)}
										/>
										{
											Question.answers.map(
												(answer, answerIndex) => (
														<InputwithButton border=""
																		 text={answer.answer}
																		 index={answerIndex}
																		 position={questionIndex}
																		 save={(questionIndex, answerIndex, newText, newBoolean) => handleInputSave(questionIndex, answerIndex, newText, newBoolean)}
																		 boolean = {answer.isRight}
																		 deleteAnswer={(questionIndex, answerIndex) => deleteAnswer(questionIndex, answerIndex)}
														/>
													)
												)
										}
										
										<Icon key={Question.id}
											  source={"https://assets.dryicons.com/uploads/icon/svg/12630/0be0f588-bd44-4436-bf6e-54498fbf74dd.svg"} 
										 	  click={() => addAnswer(questionIndex)} 
										 	  type="middle" 
										 	  param={questionIndex}/>
										< Icon key={Question.id}
											   source={"https://assets.dryicons.com/uploads/icon/svg/12575/024d8844-be80-479e-be56-ea36293d6bc1.svg"}
											   click={() => deleteQuestion(questionIndex)}
											   type="middle"
										/>
									</div>

								</>
							)
						)
				}
				<Icon 		
					  source={"https://assets.dryicons.com/uploads/icon/svg/12630/0be0f588-bd44-4436-bf6e-54498fbf74dd.svg"} 
					  click={() => addQuestion(newQuiz.length)} 
					  type="middle" 
					  extra="mt-5 mb-5"/>
			</div>
			<div className="flex justify-center">
				<Button click={() => navigate("/")}
						text="Back" />
				<Button click={() => {

					if (dialog == "translate2"){
					setDialog("translate1")
					} else {
						setDialog("translate2")
					}
				}}
						text="Finish" />		
			</div>

		</div>
		</>

		)
}

export default NewQuizCreator;