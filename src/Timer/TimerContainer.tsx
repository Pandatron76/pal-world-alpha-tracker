import { useState, useEffect } from 'react';
import Timer from './Timer';


const TimerContainer = () => {
    const [timerRunning, setTimerRunning] = useState<boolean>(false);
    const [timerHours, setTimerHours] = useState<string>('0');
    const [timerMinutes, setTimerMinutes] = useState<string>('0');
    const [timerSeconds, setTimerSeconds] = useState<string>('0');
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [timerExpiredAudio, setTimerExpiredAudio] = useState<HTMLAudioElement | null>(null);
    const [timerDisplay, setTimerDisplay] = useState<string>('00:00:00');

    
    useEffect(() => {
        setRemainingTime(calculateTotalSeconds());
    }, [timerHours, timerMinutes, timerSeconds]);

    useEffect(() => {
        const updateTimerDisplay = () => {
            const hours = Math.floor(remainingTime / 3600);
            const minutes = Math.floor((remainingTime % 3600) / 60);
            const seconds = remainingTime % 60;

            setTimerDisplay(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)
        };

        const timerInterval = setInterval(() => {
            if (timerRunning && remainingTime > 0) {
                setRemainingTime((prevTime) => prevTime - 1);
                updateTimerDisplay();
            } else {
                // Timer reached 0 or paused, stop it
                clearInterval(timerInterval);
                setTimerRunning(false);

                // Play a sound when the timer expires
                if (remainingTime === 0) {
                    playTimerExpiredSound();
                }
            }
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [timerRunning, remainingTime]);

    useEffect(() => {
        // Cleanup the audio element when the component unmounts
        return () => {
            if (timerExpiredAudio) {
                timerExpiredAudio.pause();
                timerExpiredAudio.currentTime = 0;
            }
        };
    }, [timerExpiredAudio]);

    const playTimerExpiredSound = () => {
        const audio = new Audio('./FF1-Ship.mp3');
        setTimerExpiredAudio(audio);
        audio.play();
    };

    const startStopTimer = () => {
        setTimerRunning((prevRunning) => !prevRunning);
    };

    const resetTimer = () => {
        setTimerRunning(false);
        setTimerHours('0');
        setTimerMinutes('0');
        setTimerSeconds('0');
        setRemainingTime(0);
        // Pause and reset the audio
        if (timerExpiredAudio) {
            timerExpiredAudio.pause();
            timerExpiredAudio.currentTime = 0;
        }
        setTimerDisplay('00:00:00');
    };

    const calculateTotalSeconds = () => {
        return (
            parseInt(timerHours, 10) * 3600 +
            parseInt(timerMinutes, 10) * 60 +
            parseInt(timerSeconds, 10)
        );
    };

    return (
        <Timer
            timerRunning={timerRunning}
            timerHours={timerHours}
            timerMinutes={timerMinutes}
            timerSeconds={timerSeconds}
            timerDisplay={timerDisplay}
            setTimerHours={setTimerHours}
            setTimerMinutes={setTimerMinutes}
            setTimerSeconds={setTimerSeconds}
            startStopTimer={startStopTimer}
            resetTimer={resetTimer}
        />
    )
}

export default TimerContainer