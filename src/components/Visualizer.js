import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectFiles } from "../store/features/FilesSlice";
import { useEyeDrop } from "react-eyedrop/dist/useEyeDrop";
import { Colorize } from "@mui/icons-material";

const Visualizer = () => {
  let img = useSelector(selectFiles);

  const [state, setState] = useState({
    pickedColor: {
      rgb: "",
      hex: "",
    },
  });

  const [colors, pickColor] = useEyeDrop({
    once: true,
  });

  useEffect(() => {
    setState((prev) => {
      return {
        ...prev,
        pickedColor: colors,
      };
    });
  }, [colors]);

  const { rgb, hex } = state.pickedColor;

  
  let imagecoord = useRef();
  
  const onMousePos = ( evt) => {
    var ClientRect = imagecoord.current.getBoundingClientRect();
    
    setCoordinates({ x: Math.round(evt.clientX - ClientRect.left),
   y: Math.round(evt.clientY - ClientRect.top)})
  }

  const drawImg = () => {
    const ctx = imagecoord.getContext("2d");
    ctx.drawImage(img[0].preview, 0, 0, imagecoord.width, imagecoord.height);
  }

  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
  });
  
  return (
    <div>
      {!img ? (
        <div className="flex flex-col items-center justify-center h-96 w-full bg-neutral-700 rounded-xl">
          <h1 className="text-center text-neutral-200 text-2xl">
            <h1>Waiting for a image</h1>
          </h1>
        </div>
      ) : (
        <div>
          <h1 className="text-neutral-200 font-semibold text-center bg-neutral-700 rounded-t-xl pt-5 text-lg">
              {img[0].name}
            </h1>
          <div className="flex flex-col items-center justify-center h-96 w-full p-10 bg-neutral-700">
            <img
              src={img[0].preview}
              alt="img"
              className="object-cover max-h-full max-w-full"
              onLoad={drawImg} ref={imagecoord} onMouseMove={onMousePos}
            />            
          </div>
          <div className="flex flex-col">
            <h1 className="text-neutral-200 font-semibold text-center bg-neutral-800 p-2 text-lg">
              Coordinates: (X: {coordinates.x} - Y: {coordinates.y})
            </h1>
            <div className="grid grid-cols-3 text-neutral-200 bg-neutral-500 rounded-b-xl">
              <button
                onClick={pickColor}
                className=" p-2 rounded-bl-xl bg-neutral-200"
              >
                <Colorize className="text-neutral-900" />
              </button>
              <div className="flex col-span-2 justify-around items-center">
                {hex === "" ? (
                  <h1 className="uppercase text-sm"> HEX: #FFFFFF </h1>
                ) : (
                  <h1 className="uppercase text-sm">HEX: {hex} </h1>
                )}
                {rgb === "" ? (
                  <h1 className="uppercase text-sm"> rgb(256, 256, 256) </h1>
                ) : (
                  <h1 className="uppercase text-sm"> {rgb} </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visualizer;
