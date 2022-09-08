import React, { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import "./App.css";
import Video from "./video/video";
import init, { closest_colour, Colour } from "../node_modules/ntc-rs";
import Cursor from "./cursor/cursor";

interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
  const [selectedRGBA, setSelectedRGBA] = useState<number[]>();
  const [colour, setColour] = useState<Colour>();

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (selectedRGBA) {
      const [r, g, b] = selectedRGBA;
      setColour(closest_colour(new Int32Array([r, g, b])));
    }
  }, [selectedRGBA]);

  useEffect(() => {
    if (colour) {
      console.log(colour.name);
    }
  }, [colour]);

  return <Video onClick={(colour) => setSelectedRGBA(colour)} />;
};

export default App;
