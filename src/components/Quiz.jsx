import { useCallback,  useState } from "react";
import questions from "../questions";
import Question from "./Question";
import Summary from "./Summary";

export default function Quiz() {
    // we need to store user answers for each ques inorder to provide summary in the end
    // we can derive activeQuestionIndex from userAnswers state
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;

    const quizIsComplete = activeQuestionIndex === questions.length;

    // record users answer in array (and update the active index (derived val))
    const handleSelectAnswer = useCallback(function handleSelectAnswer(
        selectedAnswer
    ) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    },
    []);

    // when timer expire null recorded in users ans
    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null);
    }, [handleSelectAnswer]);

    // if no question to show provide summary
    if (quizIsComplete) {
        return <Summary userAnswers={userAnswers}></Summary>
    }

    return (
        <div id="quiz">
            {/* each question render a timer, question text and its answers
                and quesTimer and Answers component need to be destroyed and created each time on as we move to next ques
                so used keys to destroy and create Question each time  activeQuestionIndex change
                Destroying and recreating Question component whenever we change the ques bcz Answers and QuesTimer
                components need to be recreated on each ques
            */}
            <Question
                key={activeQuestionIndex}
                questionIndex={activeQuestionIndex}
                onSkipAnswer={handleSkipAnswer}
                onSelectAnswer={handleSelectAnswer}
            ></Question>
        </div>
    );
}
