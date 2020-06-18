import React from 'react';
import quizService from '../api/quizService';
import QuestionBox from './QuestionBox';
import Result from './Result';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items:[],
            correctAnswers:0,
            questionsAnswered:0
        }
    }
    fetchQuizes(){
        quizService().then((data)=>{
            this.setState({
                items:data
            })
        })
    }
    checkAnswer(option,correct){
       if(option == correct){
           this.setState({
               correctAnswers:this.state.correctAnswers + 1
           })
       }
       this.setState({
           questionsAnswered:this.state.questionsAnswered + 1
       })
    }
    playAgain(){
        this.fetchQuizes();
        this.setState({
            correctAnswers:0,
            questionsAnswered:0
        })
    }
    componentDidMount(){
        this.fetchQuizes();
    }
    render(){
       const { items,questionsAnswered,correctAnswers } = this.state;
       return(
        <div className="container">
            <h1 className="title"> Quiz App </h1>
            {items.length > 0 && questionsAnswered < 5 && items.map(({question,answers,correct,questionId})=>{
                 return <QuestionBox question={question} answers={answers} optionSelected={(option)=>this.checkAnswer(option,correct)} key={questionId} />
            })}
            {questionsAnswered == 5 ? <Result score={correctAnswers} playAgain={()=>this.playAgain()} /> :  ""}
        </div> 
       )
    }
}

export default App;