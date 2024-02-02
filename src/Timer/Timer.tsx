import "./Timer.css"

interface TimerProps {
    timerRunning: boolean
    timerHours: string
    timerMinutes: string
    timerSeconds: string
    timerDisplay: string
    setTimerHours: React.Dispatch<React.SetStateAction<string>>
    setTimerMinutes: React.Dispatch<React.SetStateAction<string>>
    setTimerSeconds: React.Dispatch<React.SetStateAction<string>>
    startStopTimer: React.MouseEventHandler<HTMLButtonElement> | undefined
    resetTimer: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const Timer = ({
    timerRunning,
    timerHours,
    timerMinutes,
    timerSeconds,
    timerDisplay,
    setTimerHours,
    setTimerMinutes,
    setTimerSeconds,
    startStopTimer,
    resetTimer
}: TimerProps) => {


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
                <h1>{timerDisplay}</h1>
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
}

export default Timer;