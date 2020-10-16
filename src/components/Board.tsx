import React from "react";
import Square from "./Square";

interface Board {
  props: {
    squares: any[];
    onClick: any;
  };
  state: {
    tables: any[];
  };
}

class Board extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      tables: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
    };
  }

  renderSquare(i: any, position: any) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i, position)}
      />
    );
  }

  render() {
    return (
      <div>
        {this.state.tables.map((row, index) => {
          return (
            <div key={index} className="board-row">
              {row.map((column: number, idx: number) => {
                return this.renderSquare(column, { x: index + 1, y: idx + 1 });
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Board;
