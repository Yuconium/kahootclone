import '../index.css';



import React, { useEffect, useState,  Component }  from 'react';


function Icon({source, click, type, param, extra}){


	return (
			<div 
				className={(type == "middle") ? "w-6 cursor-pointer flex mt-2 justify-center m-auto " + extra : "w-6 cursor-pointer flex justify-center ml-2 mr-2 m-3"}
				onClick={() => {
						
							console.log("is undefined");
							click();
						

						}
				}>
				<img 
					src={source}
					className="transform duration-300 hover:scale-150"
					alt="plus"
					 
					/>	
			</div>

	)


}


export default Icon;