import React from "react";
import { FunctionComponent } from "react";
import "./cursor.css";

interface CursorProps {
  radius: number;
  x: number;
  y: number;
  colour?: number[];
}

const px = (value: number) => `${value}px`;
const rgba = (colour: number[]) => `rgba(${colour.join(",")})`;

const Cursor: FunctionComponent<CursorProps> = ({
  radius,
  x,
  y,
  colour = [0, 0, 0, 0],
}) => {
  return (
    <div
      id="mouse-box"
      style={{
        height: px(radius),
        width: px(radius),
        top: px(y - radius / 2),
        left: px(x - radius / 2),
        backgroundColor: rgba(colour),
      }}
    ></div>
  );
};

export default Cursor;
