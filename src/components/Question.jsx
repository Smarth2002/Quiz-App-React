import { useState } from "react";
import Answers from "./Answers";
import QuesTimer from "./QuesTimer";
import questions from "../questions";

export default function Question({
    questionIndex,
    onSkipAnswer,
    onSelectAnswer,
}) {

    // on selecting ans we need to highlight the selected ans before moving to next ques
    // we show yellow colour for selected ans for 1 sec then 2 sec red or green depending on right or wrong ans
    // so isCorrect stores status of ans (null: unanswered or answered but not evaluated (based on selectedAnswer)
    // true: correct ans, false: incorrect ans)
    const [answer, setAnswer] = useState({
        isCorrect: null,
        selectedAnswer: "",
    });

    // after selecting the ans we take additional 3 sec(to reflect color changes in selected ans) 
    // to update parent state and move to next ques and in mean time timer (10 sec) also running and if it expire
    // before those 3 sec (if we select ans in last 3 sec) so it may skip the ques even on selecting ans
    // so we need to update the timer (destroy and recreate with different val and not provide onSkip func if
    // an answer has been selected)
    // timer values also change 
    // 10 sec for each ques, 1 sec if ans selected, 2 sec if ans selected and evaluated
    let timer = 10000;
    if (answer.selectedAnswer) timer = 1000;
    if (answer.isCorrect !== null) timer = 2000;

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null,
        });

        // after 1 sec evaluating the ans
        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: answer === questions[questionIndex].answers[0],
            });

            // after 2 sec updating state in parent (storing ans in parent state and moving to next ques)
            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);
        }, 1000);
    }

    let answerState = "";
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? "correct" : "wrong";
    } else if (answer.selectedAnswer) answerState = "answered";

    return (
        <div id="question">
            {/* we need to destroy and recreate timer inorder to reset the state in it so used keys everytime 
                timer val(time) changes according to answer state
                and onSkipAnswer is passed if no answer is selected so that on expiring it moves to next ques
                but if answer selected we dont need to do anything on expire
                destroying and recreating QuesTimer on each state change of answer as well as when ques changes
            */}
            <QuesTimer
                key={timer}
                time={timer}
                onTimeOut={answer.selectedAnswer === "" ? onSkipAnswer : null}
                mode={answerState}
            ></QuesTimer>

            <h2>{questions[questionIndex].text}</h2>

            {/* destroying and recreating Answers on each ques change only */}
            <Answers
                answers={questions[questionIndex].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelectAnswer={handleSelectAnswer}
            ></Answers>
        </div>
    );
}
