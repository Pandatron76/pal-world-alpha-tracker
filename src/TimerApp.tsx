// src/TimerApp.tsx
import React, { useState, useEffect } from 'react';
import './TimerApp.css';

//const soundURL = new URL('/FF1-Ship.mp3', import.meta.url);

const TimerApp: React.FC = () => {
    const [timerRunning, setTimerRunning] = useState<boolean>(false);
    const [timerHours, setTimerHours] = useState<string>('0');
    const [timerMinutes, setTimerMinutes] = useState<string>('0');
    const [timerSeconds, setTimerSeconds] = useState<string>('0');
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [timerExpiredAudio, setTimerExpiredAudio] = useState<HTMLAudioElement | null>(null);
    //const [isPaused, setIsPaused] = useState<boolean>(true);
    //const sound = new Audio(soundURL.href);

    useEffect(() => {
        setRemainingTime(calculateTotalSeconds());
    }, [timerHours, timerMinutes, timerSeconds]);

    useEffect(() => {
        const updateTimerDisplay = () => {
            const hours = Math.floor(remainingTime / 3600);
            const minutes = Math.floor((remainingTime % 3600) / 60);
            const seconds = remainingTime % 60;

            document.getElementById('timer')!.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
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
    };

    const calculateTotalSeconds = () => {
        return (
            parseInt(timerHours, 10) * 3600 +
            parseInt(timerMinutes, 10) * 60 +
            parseInt(timerSeconds, 10)
        );
    };

    return (
        <div className="timer-container">
            <div className="input-container">
                <input type="text" id="palInput" placeholder="Pal Name" />
            </div>
            <div className="input-container">
                <div>
                    <label>Hours</label>
                    <input
                        type="number"
                        value={timerHours}
                        onChange={(e) => setTimerHours(e.target.value)}
                        disabled={timerRunning}
                    />
                </div>
                <div>
                    <label>Minutes</label>
                    <input
                        type="number"
                        value={timerMinutes}
                        onChange={(e) => setTimerMinutes(e.target.value)}
                        disabled={timerRunning}
                    />
                </div>
                <div>
                    <label>Seconds</label>
                    <input
                        type="number"
                        value={timerSeconds}
                        onChange={(e) => setTimerSeconds(e.target.value)}
                        disabled={timerRunning}
                    />
                </div>
            </div>
            <div className="timer-and-buttons-container">
                <h1 id="timer">{`${String(Math.floor(remainingTime / 3600)).padStart(2, '0')}:${String(Math.floor((remainingTime % 3600) / 60)).padStart(2, '0')}:${String(remainingTime % 60).padStart(2, '0')}`}</h1>
                <div className="buttons-container">
                    <button id="startStopButton" onClick={startStopTimer}>
                        {timerRunning ? 'Pause' : 'Start'}
                    </button>
                    <button id="resetButton" onClick={resetTimer}>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimerApp;
