import { useRef } from "react";

export default function Answers({
    answers,
    selectedAnswer,
    answerState,
    onSelectAnswer,
}) {

    // we need to shuffle answer array if we move to a new ques and same array for subsequent re renders
    // so created a ref to store same array between different renders and shuffle only when its created again
    // when component is destroyed and created (when ref.current = null)
    const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return (
        <ul id="answers">
            {shuffledAnswers.current.map((answerItem, idx) => {
                const isSelected = answerItem === selectedAnswer;
                let cssClass = "";

                if (answerState === "answered" && isSelected)
                    cssClass = "selected";

                if (
                    (answerState === "correct" || answerState === "wrong") &&
                    isSelected
                )
                    cssClass = answerState;

                return (
                    <li key={idx} className="answer">
                        <button
                            onClick={() => onSelectAnswer(answerItem)}
                            className={cssClass}
                            disabled={answerState !== ''}
                        >
                            {answerItem}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
