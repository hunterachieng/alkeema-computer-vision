import Sidebar from "../Sidebar";
import Image from "next/image";

const Results = ({
  predictedDigit,
  confidenceScore,
  onClose
}: {
  predictedDigit: string;
  confidenceScore: number;
  onClose: () => void;
}) => {
  return (
    <Sidebar>
    
      <div className="flex flex-col items-center justify-center space-y-8 py-32">
        <div className="">
          <Image
            src={"/images/results.png"}
            width={300}
            height={300}
            alt="results"
          />
        </div>
        <h2 className="text-[40px]">Predicted Digit: {predictedDigit}</h2>
        <h2 className="text-[40px]">Confidence Score: {confidenceScore}</h2>
        <button
        onClick={onClose}
        className="mt-4 bg-[#F06424] text-white px-6 py-2 rounded"
      >
        Close
      </button>
      </div>
    </Sidebar>
  );
};

export default Results;
