import React, { useState } from "react";
import { selectFiles } from "../store/features/FilesSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { addDays, format, parseJSON } from "date-fns";
import { enUS } from "date-fns/locale";
import reactImageSize from "react-image-size";

const Properties = () => {
  let imgData = useSelector(selectFiles);
  const [dimensions, setDimensions] = useState({});

  reactImageSize(imgData[0].preview).then((dimensions) => {setDimensions(dimensions)});

  const data = imgData[0];
  const lastModified = parseJSON(data.lastModifiedDate);
  return (
    <div className="text-neutral-200">
      <h1 className="text-base font-bold">Resolution: </h1>
      <h2 className="mb-5 text-xl">
        {dimensions.width}x{dimensions.height} pixels
      </h2>
      <h1 className="text-base font-bold">Size: </h1>
      <h2 className="mb-5 text-xl">{data.size} KB</h2>
      <h1 className="text-base font-bold">Type: </h1>
      <h2 className="mb-5 text-xl">{data.type}</h2>
      <h1 className="text-base font-bold">Last Modified Date:</h1>
      <h2 className="mb-5 text-xl">
        {format(addDays(new Date(lastModified), 1), `dd-MMMM-yyyy (h:mm aaa)`, {
          locale: enUS,
        })}
      </h2>
    </div>
  );
};

export default Properties;
