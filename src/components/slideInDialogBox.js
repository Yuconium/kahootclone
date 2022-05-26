import '../index.css';
import Button from "./button.js";
import React, { useEffect, useState, useRef, Component }  from 'react';


function SlideInDialogBox({func, isOn, getBack}){



	let [isSend, setIsSend] = useState("");
    let [name, setName] = useState("");
 


    useEffect(() => {
    	console.log(name)
    }, [])


    return (
    	<div className={" w-screen h-screen  fixed top-0 z-10 flex justify-center flex-col transform duration-500 ease-in-out bg-pink-200 " + isOn	}>
			<div  className={"m-auto" }>
				<div className="flex justify-center sm:flex-col">
				<p className=""> Name: </p>
        		<input 
        			className="rounded-xl shadow3  transform duration-300 ease-in-out hover:scale-110 p-4   border-black border-2 "
        			value={name}
        			onChange={e => setName(e.target.value)}

        		/>
        		</div>
        		<div className="flex justify-center">
		      		<Button click={() => getBack()}
		      				text="Cancel"
		      		/>
					<Button click={() => {func(name);
						setIsSend(" You have send the Quiz! Congrulations!")}} 
		         			text="Send"
		         	/>

	         	</div>
	         	<p className="text-center"> {isSend} </p>
         	</div>
		</div>
        
    );

}



export default SlideInDialogBox;