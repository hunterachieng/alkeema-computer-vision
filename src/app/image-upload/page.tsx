"use client";
import { useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Image from "next/image";
import UploadProgress from "../components/UploadProgress";
import { uploadImage } from "../utils/uploadImage";
import Results from "../components/Results";

const UploadImage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageName, setImageName] = useState("");
  const [results, setResults] = useState<{
    [key: string]: { predicted_digit: string; confidence_score: number };
  } | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImageName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      setLoading(true);
      const response = await uploadImage(formData);
      console.log("Upload response:", response);
      setResults(response.all_predictions);
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
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <UploadProgress imageName={imageName} imagePath={previewUrl ?? ""} />
    );
  }

  if (results) {
    return <Results predictions={results} onClose={handleCloseResults} />;
  }

  return (
    <Sidebar>
      <div className="mx-auto flex items-center justify-center flex-col space-y-12 my-6">
        {selectedImage ? (
          <div className="my-10 space-y-5">
            <div className="relative overflow-hidden">
              <Image
                src={URL.createObjectURL(selectedImage)}
                alt="preview"
                width={500}
                height={500}
                className="rounded-md border border-gray-300 object-cover"
              />
            </div>
            <div className="flex gap-x-10 justify-between">
              <button
                className="bg-[#F06424] shadow-lg shadow-[#00000040]/50 transition-colors duration-300 px-6 py-2 text-2xl font-semibold rounded-md text-white md:text-2xl md:px-6 md:py-2 hover:bg-[#e2571f]"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white text-2xl px-6 py-2 font-bold rounded-md hover:bg-green-600 shadow-lg shadow-[#F06424]/50 transition-colors duration-300"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        ) : (
          <>
            <div>
              <Image
                src={"/images/image-upload-placeholder.svg"}
                width={650}
                height={650}
                alt="upload-placeholder"
              />
            </div>
            <button
              className="bg-[#F06424] shadow-lg mt-6 shadow-[#F06424]/50 transition-colors duration-300 px-8 py-4 text-3xl font-semibold rounded-md text-white md:text-2xl md:px-6 md:py-2 hover:bg-[#e2571f]"
              onClick={handleButtonClick}
            >
              Upload image
            </button>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
    </Sidebar>
  );
};

export default UploadImage;
