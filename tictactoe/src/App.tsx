import { useState } from 'react'
import './App.css'
import { initialGameState, makeMove } from './tictactoe.ts'

function App() {
  const [gameState, setGameState] = useState(initialGameState)

  return (
    <>
      <div className="m-20">
        <h1 className="text-xl font-bold underline">Tic Tac Toe</h1>
        <div className="grid grid-cols-3 gap-2">
          {gameState.board.map((b, i) => <button onClick={() => setGameState(makeMove(gameState, i))} className="w-full aspect-square" key={i}>{b}</button>)}
        </div>
        <p>Winner is: {gameState.endState} </p>
      </div>
    </>
  )
}

export default App
