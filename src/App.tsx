import React, { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import "./App.css";
import Video from "./video/video";
import InfoPanel from "./info-panel/info-panel";
import namer, { Colors } from "color-namer";

interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
  const [selectedRGBA, setSelectedRGBA] = useState<number[]>();
  const [colour, setColour] = useState<Colors<"ntc">>();

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
          const val = `rgb(${rgba.slice(0, 3).join(",")})`;
          const options = { pick: ["basic", "ntc", "html"] } as any;
          setColour(namer(val, options));
        }}
      />
      {colour && selectedRGBA && (
        <InfoPanel rgba={selectedRGBA} colour={colour} />
      )}
    </div>
  );
};

export default App;
