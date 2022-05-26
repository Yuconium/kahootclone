import '../index.css';

import Haekchen from "./haekchen.js";
import Icon from "./icon.js";



import React, { useEffect, useState,  Component }  from 'react';

const InputwithButton = ({border, text, index, position, save, boolean, deleteAnswer}) => {
	
	useEffect(() => {
		setInput(text)
	}, [text])


	let [input, setInput] = useState(text);
	let [isRight, setIsRight] = useState(boolean);
	let [source, setSource] = useState("https://assets.dryicons.com/uploads/icon/svg/12628/c8e87a4e-49ac-40ac-aa78-53ad749e91a0.svg" )
	

	function clickParent(){
		
		if (isRight == false) {
			setIsRight(true)
		}	else {
			setIsRight(false)
		}
		if (source != "https://assets.dryicons.com/uploads/icon/svg/12630/0be0f588-bd44-4436-bf6e-54498fbf74dd.svg") {
			setSource("https://assets.dryicons.com/uploads/icon/svg/12630/0be0f588-bd44-4436-bf6e-54498fbf74dd.svg" )
		}
		console.log(isRight);
	}

	return	(

		<div className="flex justify-center">

			<input 
				className={"rounded-xl tranform duration-300 ease-in-out hover:scale-110 p-1 m-1 " + border}
				value={input}
				onChange={ e => {setInput(e.target.value);
								 if (source != "https://assets.dryicons.com/uploads/icon/svg/12630/0be0f588-bd44-4436-bf6e-54498fbf74dd.svg") {
								 	setSource("https://assets.dryicons.com/uploads/icon/svg/12630/0be0f588-bd44-4436-bf6e-54498fbf74dd.svg" )
								 }
							
						 }
					}/>
			<Icon source={source} click={() => {
				save(position, index, input, isRight);
				setSource("https://assets.dryicons.com/uploads/icon/svg/12628/c8e87a4e-49ac-40ac-aa78-53ad749e91a0.svg")
				
			}}/>
			{
				(index != -1) ?
				<>
					<Haekchen clickParent={clickParent}/> 
					<Icon source={"https://assets.dryicons.com/uploads/icon/svg/12575/024d8844-be80-479e-be56-ea36293d6bc1.svg"} 
						  click={() => {
								deleteAnswer(position, index);
								setSource("https://assets.dryicons.com/uploads/icon/svg/12628/c8e87a4e-49ac-40ac-aa78-53ad749e91a0.svg")
					}}/>
				</>
				: null
			}

		</div>
		)
}


export default InputwithButton;