import React from "react";

function Square(props: any) {
  const className = `square ${props.className}`;
  return (
    <button className={className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
