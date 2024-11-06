"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { Josefin_Sans } from "next/font/google";
import { LuImagePlus } from "react-icons/lu";
import { MdDraw } from "react-icons/md";


const josefinSans = Josefin_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const Sidebar = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const isActive = (route: string) => pathname === route;

  return (
    <div className={`flex ${josefinSans.className}`}>
      <div className="flex flex-col items-center w-[13%] h-screen bg-[#255369] rounded-r-[2px] py-8 space-y-8 justify-center ">
        <Link href="/image-upload">
          <button
            className={`text-lg py-2 rounded-lg focus:outline-none flex flex-col items-center  space-y-2 ${
              isActive("/image-upload")
                ? "bg-orange-600 text-white px-8"
                : "bg-transparent text-white px-3"
            }`}
          >
            <LuImagePlus  size={20} className="text-white"/>
            Image Upload
          </button>
        </Link>
        <hr/>
        {/* Canvas Text */}
        <Link href="/canvas">
          <button
            className={`text-lg  py-2 rounded-lg focus:outline-none flex flex-col items-center space-y-2 ${
              isActive("/canvas")
                ? "bg-orange-600 text-white px-10"
                : "bg-transparent text-white px-3"
            }`}
          >
            <MdDraw size={20} className="text-white" />
            Canvas
          </button>
        </Link>
      </div>
      <div className="flex-1 p-10">{children}</div>
    </div>
  );
};

export default Sidebar;
