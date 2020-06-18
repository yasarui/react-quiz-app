import React, {useState} from 'react';

const QuestionBox = ({question,answers,questionId,optionSelected}) =>{
    const [options,setOptions] = useState(answers);
    return(
        <div className="questionBox">
           <div className="question"> {question} </div>
           {options.map((option,index)=>{
               return <div onClick={()=>{setOptions([option]);optionSelected(option)}} key={index} className="answerBtn"> {option} </div>
           })}
        </div>
    )
}

export default QuestionBox;

