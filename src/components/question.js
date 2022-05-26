import "../index.css";


const Question = (props) => {



	return (
		<div className="w-auto h-44 bg-red-400 rounded-b-3xl  ">
			<p className="text-center text-xl p-4">
				Question Nr.{props.index} von {props.numberOfQuestions} <br />
				<span className="text-5xl text-white p-5" >
					{props.question.text}
				</span>
			</p>
		</div>
	)
}


export default Question;
