import { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "../Sidebar";

const UploadProgress = ({imagePath, imageName}:{imagePath:string, imageName:string}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 5;
        clearInterval(interval);
        return prev;
      });
    }, 500);
  }, []);

  return (
   <Sidebar>
     <div className="flex flex-col items-center justify-center w-[50%] h-auto mx-auto bg-gray-50 p-8 rounded-md shadow-lg space-y-8 my-60">
      <div className=" items-center space-y-10">
        {/* Icon and file name */}
        <div className=" p-2 rounded-md flex items-center justify-center border-2 border-[#F06424] mb-4">
          <Image
            src={imagePath}
            alt="file icon"
            width={300}
            height={300}
          />
        </div>
        <span className="text-gray-800 font-medium mt-5">
         {imageName} &bull; Uploading...
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative w-full max-w-sm h-6 rounded-full bg-[#2f4858] overflow-hidden">
        <div
          className="h-full bg-[#405e6c] "
          style={{ width: `${progress}%` }}
        ></div>
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white font-medium">
          {progress}%
        </span>
      </div>
    </div>
   </Sidebar>
  );
};

export default UploadProgress;
