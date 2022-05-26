import "../index.js";




function Button({click, text}) {




  return (
    <div
      className="bg-yellow-200 w-44 cursor-pointer m-3 text-center p-1 shadow3 rounded-xl hover:bg-yellow-700 transform duration-300 ease-in-out hover:scale-150 "
      onClick={() => click()}
    >
      {text}
    </div>
  )
}


export default Button;
