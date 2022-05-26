import "../index.js"


import React, { useEffect, useState, useRef, Component }  from 'react';


function Haekchen({clickParent}) {

	let [input, setOffOrOn] = useState("bg-pink-400");

	function click(){
		clickParent()
		if (input == "bg-green-400"){
			setOffOrOn("bg-pink-400")
		}	else {
			setOffOrOn("bg-green-400")
		}
	}


	return (
		<div className={"border-2 cursor-pointer rounded-full w-6 h-6 my-auto hover:scale-150 transform duration-500 ease-in-out border-yellow-400 " + input}
			 onClick={
			 	() => click()
			 }>
		
		</div>
			
	)


}

export default Haekchen;