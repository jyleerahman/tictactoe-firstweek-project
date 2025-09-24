type Cell = "X" | "O" | null
export type EndState = undefined | 'X' | 'O' | 'tie'


export type GameState = {
  board: Cell[],
  turn: "O" | "X",
  endState?: EndState
}

export const initialGameState: GameState = {
  board: [null, null, null, null, null, null, null, null, null],
  turn: "O",
}

export function makeMove(gameState: GameState, index: number): GameState {

  if (gameState.board[index] !== null || gameState.endState) return gameState

  const newBoard = [...gameState.board]
  newBoard[index] = gameState.turn
  const turn = gameState.turn === "X" ? "O" : "X"

  // check if the game is over
  const endState = checkEndState({ ...gameState, board: newBoard })

  return { ...gameState, board: newBoard, turn, endState }

}


export function checkEndState(gameState: GameState): EndState {

  const winningLines = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6]]

  // check for a win
  for (const [a, b, c] of winningLines) {
    if (gameState.board[a] != null && gameState.board[a] === gameState.board[b] && gameState.board[b] === gameState.board[c]) return gameState.board[a]
  }

  // check for a tie:
  const boardIsFull = gameState.board.every((val) => val != null)
  if (boardIsFull) return 'tie'

  return undefined
}