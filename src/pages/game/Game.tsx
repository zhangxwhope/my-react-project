import React from "react";
import Board from "components/Board";
import "./Game.scss";

interface Game {
  state: {
    history: any[];
    stepNumber: number;
    xIsNext: boolean;
    isAscending: boolean;
  };
}

class Game extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          position: {
            x: 0,
            y: 0,
          },
          timestamp: new Date().getTime(),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      isAscending: true,
    };
  }

  handleClick(i: any, position: any) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calcWinner(squares) || squares[i]) return;
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          position: position,
          timestamp: new Date().getTime(),
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(move: number) {
    this.setState({
      stepNumber: move,
      xIsNext: move % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calcWinner(current.squares);

    // history.sort(compare('timestamp', !this.state.isAscending))

    const moves = history.map((step, move) => {
      const { x, y } = step.position;
      const desc = move
        ? `Go to move # ${move}（${x}, ${y}）`
        : "Go to game start";
      const active =
        move === this.state.stepNumber ? "history-item active" : "history-item";
      return (
        <li key={move} className={active}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    const status = winner
      ? `Winner: ${winner}`
      : `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i: any, position: any) => this.handleClick(i, position)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button
              onClick={() =>
                this.setState({ isAscending: !this.state.isAscending })
              }
            >
              {this.state.isAscending ? "⬆" : "⬇"}
            </button>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// 判断获胜者
function calcWinner(squares: any[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// 根据数组中的某个字段进行排序
// function compare(prop: string, isDesc = true) {
//   return (a: any, b: any) => {
//     return isDesc ? (b[prop] - a[prop]) : (a[prop] - b[prop])
//   }
// }

export default Game;
