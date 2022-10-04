import React, { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import "./App.css";
import Video from "./video/video";
import * as NTC from "ntc-rs";
import InfoPanel from "./info-panel/info-panel";

interface AppProps {}

const MAX_DISTANCE = Math.sqrt(Math.pow(255, 2) * 3);
const distance = (a: number[], b: number[]) => {
  return Math.sqrt(
    Math.pow(a[0] - b[0], 2) +
      Math.pow(a[1] - b[1], 2) +
      Math.pow(a[2] - b[2], 2)
  );
};

const App: FunctionComponent<AppProps> = () => {
  const [selectedRGBA, setSelectedRGBA] = useState<number[]>();
  const [colour, setColour] = useState<NTC.Colour>();

  useEffect(() => {
    if (selectedRGBA) {
      const [r, g, b] = selectedRGBA;
      setColour(NTC.closest_colour(new Int32Array([r, g, b])));
    }
  }, [selectedRGBA]);

  useEffect(() => {
    if (colour) {
      console.log(colour.name);
      console.log(selectedRGBA);
    }
  }, [colour]);

  return (
    <div>
      <Video radius={15} onClick={(colour) => setSelectedRGBA(colour)} />
      {colour && selectedRGBA && (
        <InfoPanel rgba={selectedRGBA} colour={colour} />
      )}
    </div>
  );
};

export default App;
