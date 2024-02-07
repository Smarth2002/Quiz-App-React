import { useEffect, useState } from "react";

export default function QuesTimer({ time, onTimeOut, mode }) {
    const [remainingTime, setRemainingTime] = useState(time);

    useEffect(() => {
        // console.log("setting timer");
        const timer = setTimeout(onTimeOut, time);

        return () => {
            clearTimeout(timer);
        };
    }, [onTimeOut, time]);

    useEffect(() => {
        // console.log("setting interval");
        const interval = setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <progress
            id="question-time"
            value={remainingTime}
            max={time}
            className={mode}
        ></progress>
    );
}
