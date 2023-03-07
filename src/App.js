import { useState} from 'react';



function Square({ value, onSquareclick }){

  return (
    <button 
    className="square"
    onClick={ onSquareclick }
    >
      { value }
    </button>
  );
}


export default function Board() {

  const [xIsNext, setXisNext] = useState(true); // the first move is x, once is done the next move is o.
  const [squares, setSquares] = useState(Array(9).fill(null));


  function calculateWinner(squares) {
    // array of arrays that contains the winning combinations
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    // loop through the lines array 
    for (let i =0; i < lines.length; i++){
      // destructure the array inside of lines with the current index of the loop
      // we get the values a,b,c
      const [a,b,c] = lines[i];
      // use the if statement to check if the values obtained from the line[i] a,c,b are not null and equal to each other
      // we pass a,b,c to the squares array to check if the values are not null and equal to each other
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        // if they are equal then we return the value of the square at index a
        return squares[a];
      }
    }
    // if they are not equal then we return null
    return null;
  }


  function handleClick(i){

    // this if statement check if the square is already filled(there is a value in it, it is not null)
    // if it is true that is filled, then it will return and not stop the function to be executed.
    if(squares[i]){
      return;
    }

    // check if there is a winner 
    // if squares[i] is not null or there is a winner then the function will return and stop the execution.
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      //checking if xIsNext is true, if it is true then the next move is true
      nextSquares[i] = "X";
    } else {
      // if xIsNext is not true(false) the next move is o
      nextSquares[i] = "O";
    }

    // save the nextsquares into the sqaures array
    setSquares(nextSquares);
    // set the xIsNext to the opposite of what it was
    // if start being true, then it will be false and the next move will be O.
    setXisNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if(winner){
    status = "winner: " + winner;
  }else{
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareclick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareclick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareclick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareclick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareclick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareclick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareclick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareclick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareclick={() => handleClick(8)}/>
      </div>
    </div>

  );
}
