import * as NTC from "ntc-rs";
import React, { FunctionComponent } from "react";
import { hexToRGB, RGBToHSL } from "../utils";
import "./info-panel.css";

interface InfoPanelProps {
  rgba: number[];
  colour: NTC.Colour;
}

const hex = (colour: NTC.Colour) => `#${colour.hex}`;
const formatColour = (colour: NTC.Colour) => {
  const rgb = hexToRGB(`#${colour.hex}`);
  console.log(rgb);

  const luminance = RGBToHSL(rgb)[2];
  if (luminance < 33) return "Dark" + " " + colour.shade;
  else if (luminance > 66) return "Light" + " " + colour.shade;

  return colour.shade;
};

const InfoPanel: FunctionComponent<InfoPanelProps> = ({ colour }) => {
  return (
    <div className="info-panel" style={{ backgroundColor: hex(colour) }}>
      <span style={{ mixBlendMode: "difference", color: "white" }}>
        {formatColour(colour)}
      </span>
    </div>
  );
};

export default InfoPanel;
