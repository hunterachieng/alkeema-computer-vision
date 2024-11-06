"use client";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import { ImDownload3 } from "react-icons/im";
import { FaPenNib } from "react-icons/fa6";
import { FaEraser } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import UploadProgress from "../components/UploadProgress";
import { uploadImage } from "../utils/uploadImage";
import Results from "../components/Results";

const Canvas = () => {
  const [showCanvas, setShowCanvas] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [submittedImage, setSubmittedImage] = useState<string | null>(null);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    predicted_digit: string;
    confidence_score: number;
  } | null>(null);

  // Define desired canvas dimensions
  const canvasWidth = 1000;
  const canvasHeight = 500;

  const handlePenClick = () => {
    setShowCanvas(true);
    setTool("pen");
  };

  const handleEraserClick = () => {
    setTool("eraser");
  };

  const startDrawing = (event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!isDrawing || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (tool === "pen") {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      ctx.stroke();
    } else if (tool === "eraser") {
      ctx.clearRect(
        event.nativeEvent.offsetX,
        event.nativeEvent.offsetY,
        10,
        10
      ); // Erase area
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleSubmit = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    setSubmittedImage(dataUrl);
    setLoading(true);
    const blob = await (await fetch(dataUrl)).blob();

    const formData = new FormData();
    formData.append("image", blob, "drawing.png");
    try {
      const response = await uploadImage(formData);
      setResults(response.best_prediction);
      setLoading(false);
    } catch (error) {
      console.error("Upload failed:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseResults = () => {
    setResults(null);
    setShowCanvas(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Ensure the canvas element matches desired dimensions
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }
  }, [canvasWidth, canvasHeight]);

  if (loading) {
    return (
      <UploadProgress
        imageName="drawing.png"
        imagePath={submittedImage ?? ""}
      />
    );
  }

  if (results) {
    return (
      <Results
        predictedDigit={results.predicted_digit}
        confidenceScore={results.confidence_score}
        onClose={handleCloseResults}
      />
    );
  }

  return (
    <Sidebar>
      <div className="m-auto flex items-center justify-center flex-col space-y-10 relative py-24">
        {/* Toolbar for Download, Pen, and Eraser */}
        <div className="bg-[#255369] rounded-[20px] h-24 border w-[40%] absolute right-4 top-0 flex space-x-10 justify-between items-center px-20">
          <button className="border-none bg-transparent" onClick={handleSubmit}>
            <ImDownload3 size={50} className="text-white" />
          </button>
          <button
            className={`border-none bg-transparent ${
              tool === "pen" && "ring-2 ring-white"
            }`}
            onClick={handlePenClick}
          >
            <FaPenNib size={50} className="text-white" />
          </button>
          <button
            className={`border-none bg-transparent ${
              tool === "eraser" && "ring-2 ring-white"
            }`}
            onClick={handleEraserClick}
          >
            <FaEraser size={50} className="text-white" />
          </button>
        </div>

        {/* Canvas Area */}
        {showCanvas ? (
          <div className="relative border border-gray-300 rounded-lg p-4">
            <canvas
              ref={canvasRef}
              width={canvasWidth} // Set actual drawing width
              height={canvasHeight} // Set actual drawing height
              className={`border border-gray-300 ${
                tool === "pen" ? "cursor-crosshair" : "cursor-cell"
              }`}
              style={{ width: canvasWidth, height: canvasHeight }} // Displayed size
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => setShowCanvas(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Back
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden mt-10">
            <Image
              src="/images/canvas.png"
              alt="preview"
              width={500}
              height={500}
              className="rounded-md object-cover"
            />
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default Canvas;
