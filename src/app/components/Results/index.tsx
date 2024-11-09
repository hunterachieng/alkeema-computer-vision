import Sidebar from "../Sidebar";
import Image from "next/image";

interface Prediction {
    predicted_digit: string;
    confidence_score: number;
  }
  
  interface ResultsProps {
    predictions: { [key: string]: Prediction };
    onClose: () => void;
  }


const Results: React.FC<ResultsProps> = ({ predictions, onClose }) => {
  return (
    <Sidebar>
    
      <div className="flex flex-col items-center justify-center space-y-8 py-10">
        <div className="">
          <Image
            src={"/images/results.png"}
            width={300}
            height={300}
            alt="results"
          />
        </div>

        <h2 className="text-xl font-bold mb-4 text-center">Prediction Results</h2>
        <div className="space-y-2">
        {Object.entries(predictions).map(([model, { predicted_digit, confidence_score }]) => (
          <div key={model} className="flex justify-between border-b py-2">
            <span className="font-semibold">{model.toUpperCase()}:</span>
            <span>
              Digit: {predicted_digit} | Confidence: {(confidence_score * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
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
