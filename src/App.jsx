import { useState } from "react"
import GameBoard from "./Components/GameBoard"
import Player from "./Components/Player"
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from './winning-combinations'
import GameOver from "./Components/GameOver";


const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function deriveActivePlayer(gamesTurns){
  let currentPlayer = 'X'
  if(gamesTurns.length > 0 && gamesTurns[0].player === 'X'){
    currentPlayer = 'O'
  }
  return currentPlayer;
}

function App() {
  const [gamesTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gamesTurns);
  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for(const turn of gamesTurns){
      const { square, player } = turn;
      const  { row, col } = square;
      gameBoard[row][col] = player
  }
  let winner;
 
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const SecondSquareSymbol =gameBoard[combination[1].row][combination[1].column]
    const ThirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if(firstSquareSymbol && firstSquareSymbol === SecondSquareSymbol && firstSquareSymbol === ThirdSquareSymbol){
      winner = firstSquareSymbol;
    }
  }
  const hasDraw = gamesTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns((prevTurn) => {
    const currentPlayer = deriveActivePlayer(prevTurn)

      const updatedTurns = [{ square : { row : rowIndex, col : colIndex }, player : currentPlayer } ,...prevTurn]
      return updatedTurns
    })
  }
  function handleRestart(){
    setGameTurns([]);
  }

  return (
   <main>
    <div id="game-container">
      <ol id='players' className="highlight-player">
     <Player isActive={activePlayer === 'X'} initialName='Player 1' symbol='X' />
     <Player isActive={activePlayer === 'O'} initialName='Player 2' symbol='O' />
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
      <GameBoard board={gameBoard} onSelectSquare={handleSelectSquare} />
    </div>
    <Log turns={gamesTurns} />
   </main>
  )
}

export default App
