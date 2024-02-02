import { useState } from 'react'
import './App.css'
import TimerContainer from './Timer/TimerContainer'

const App = () => {

  const [buttons, setButtons] = useState<JSX.Element[]>([<TimerContainer key={0}/>])

  const handleOnAddButtonClick = () => {
    setButtons(buttons.concat(<TimerContainer key={buttons.length}/>))
  }

  return (
    <>
      <button className="addTimerButton" onClick={() => handleOnAddButtonClick()}>Add Timer</button>
      <div>
        {buttons}
      </div>
    </>
  )
}

export default App
