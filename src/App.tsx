import React, { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import "./App.css";
import Video from "./video/video";
import InfoPanel from "./info-panel/info-panel";
import namer, { Colors, Palette } from "color-namer";

interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
  const [selectedRGBA, setSelectedRGBA] = useState<number[]>();
  const [colour, setColour] = useState<Colors<Palette>>();

  useEffect(() => {
    if (colour) {
      console.log(colour);
      console.log(selectedRGBA);
    }
  }, [colour]);

  return (
    <div>
      <Video
        radius={15}
        onClick={(rgba) => {
          setSelectedRGBA(rgba);
          setColour(namer(`rgb(${rgba.slice(0, 3).join(",")})`));
        }}
      />
      {colour && selectedRGBA && (
        <InfoPanel rgba={selectedRGBA} colour={colour} />
      )}
    </div>
  );
};

export default App;
