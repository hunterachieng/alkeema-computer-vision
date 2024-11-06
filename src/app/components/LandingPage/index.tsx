"use client";

import { useRouter } from "next/navigation";
import { Josefin_Sans } from "next/font/google";


const josefinSans = Josefin_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});


const LandingPage = () => {
  const router = useRouter();


  const handleGetStarted = () => {
    router.push("/image-upload");
  };




  return (
    <section
      className={`w-full h-screen ${josefinSans.className}`}
      style={{
        backgroundImage: "url('/images/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0  bg-black bg-opacity-20 flex flex-col justify-center items-center text-center  ">
        <div className="mt-20 space-y-10 ">
       <div className="bg-white p-12 w-[90%] m-auto font-bold rounded-[40px] text-gray-900 space-y-5">
       <h2 className="text-[60px] md:text-5xl">Interactive Image Classifier</h2>
          <h4
            className={`text-[40px] md:text-3xl font-bold mb-4 leading-tight ${josefinSans.className}`}
          >
         Upload or draw a number to see the model&apos;s prediction and confidence levels instantly
          </h4>
       </div>
          <button
            className="bg-[#F06424] transition-colors duration-300 px-8 py-4 text-3xl font-semibold rounded-md text-white md:text-2xl md:px-6 md:py-2"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>
      
      </div>
    </section>
  );
};

export default LandingPage;