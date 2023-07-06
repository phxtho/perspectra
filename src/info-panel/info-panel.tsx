import { Color, Colors } from "color-namer";
import React, { FC } from "react";
import "./info-panel.css";

interface InfoPanelProps {
  rgba: number[];
  colour: Colors<"ntc">;
}

const hex = (input: string) => {
  if (input[0] !== "#") return `#${input}`;
  return input;
};

const InfoPanel: FC<InfoPanelProps> = ({ colour }) => {
  return (
    <div className="info-panel">
      {Object.entries(colour).map(([key, value]) => {
        return <ColourInfo key={key} space={key} colour={value[0]} />;
      })}
    </div>
  );
};

const ColourInfo: FC<{ colour: Color; space: string }> = ({
  colour,
  space,
}) => {
  return (
    <div className="colour-block">
      <h2 style={{ padding: "4px 12px 8px 12px" }}>{space}</h2>
      <div
        className="colour-block__colour"
        style={{ backgroundColor: hex(colour.hex) }}
      ></div>
      <div className="title-info">
        <div>
          <h2>{colour.name}</h2>
          <span className="hx">{hex(colour.hex)}</span>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
