import { useDropzone } from "react-dropzone";
import { SET_FILES } from "../store/features/FilesSlice";
import { useDispatch } from "react-redux/es/exports";

const Dropzone = () => {
  const dispatch = useDispatch();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
    },
    onDrop: (acceptedFiles) => {
      dispatch(
        SET_FILES(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        )
      );
    },
  });

  return (
    <div className="border-2 border-dashed border-zinc-200 text-neutral-200 rounded-xl     text-center ">
      <div className="h-96 w-96 items-center flex p-10" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Click to select or drag and drop a image here</p>
      </div>
    </div>
  );
};

export default Dropzone;
