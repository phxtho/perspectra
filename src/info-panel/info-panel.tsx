import { Colors, Palette } from "color-namer";
import React, { FC } from "react";
import "./info-panel.css";

interface InfoPanelProps {
  rgba: number[];
  colour: Colors<Palette>;
}

const InfoPanel: FC<InfoPanelProps> = ({ colour, rgba }) => {
  return (
    <div
      className="info-panel"
      style={{ backgroundColor: `rgba(${rgba.join(",")})` }}
    >
      <span style={{ mixBlendMode: "difference", color: "white" }}>Colour</span>
    </div>
  );
};

export default InfoPanel;
