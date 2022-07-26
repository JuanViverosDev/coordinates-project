import React from "react";
import Title from "../components/Title";
import Dropzone from "../components/Dropzone";
import Visualizer from "../components/Visualizer";
import { selectFiles, SET_FILES } from "../store/features/FilesSlice";
import { useSelector } from "react-redux/es/exports";
import Properties from "../components/Properties";
import { useDispatch } from "react-redux/es/hooks/useDispatch";

const Main = () => {
  const dispatch = useDispatch();
  let img = useSelector(selectFiles);

  const resetStore = () => {
    dispatch(SET_FILES(false));
  };

  console.log(img);

  return (
    <div className="bg-neutral-900 h-screen flex flex-col items-center">
      <div className="bg-neutral-700 p-5 rounded-xl my-5">
        <Title />
      </div>
      <div className="p-10 shadow-lg rounded-xl grid grid-cols-2 bg-neutral-800">
        <Visualizer />
        <div className="pl-20 flex items-center">
          {!img ? (
            <div>
              <Dropzone />
            </div>
          ) : (
            <div className="flex flex-col">
              <h1 className="font-bold text-3xl mb-3 text-neutral-200">
                Properties
              </h1>
              <div className="my-12">
              <Properties />
              </div>
              <div>
              <button
                onClick={resetStore}
                className="text-neutral-200 font-bold bg-neutral-600 p-3 rounded-xl"
              >
                Try another image
              </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
