import Link from "next/link";
import React from "react";

const FeaturedPost = () => {
  return (
    <div className="max-sm:px-[20px]">
      <div className="w-full aspect-[16/9] min-h-auto overflow-hidden rounded-md relative shadow-[0_8px_20px_rgba(15,36,36,0.3)]">
        {/* Background Image Container */}
        <div className="w-full h-full bg-no-repeat bg-center bg-cover rounded-md bg-[url(/mountain.jpg)] hover:scale-105 transition-all duration-500 ease-in-out">
          {/* Gradient Overlay */}
          <div className="w-full h-full bg-gradient-to-b from-transparent to-[#0d0d0d] rounded-md"></div>
        </div>

        {/* Text Content */}
        <div className="absolute left-6 sm:left-10 bottom-6 sm:bottom-10 flex flex-col gap-3">
          <span className="inline-flex items-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-white w-fit">
            Finance
          </span>

          <Link
            href="/"
            className="text-2xl sm:text-4xl hover:text-primary cursor-pointer transition-all ease-in duration-300 font-bold leading-tight sm:leading-snug"
          >
            Unlimited Codes Compilations and Development
          </Link>

          <div className="flex items-center gap-4 sm:gap-6 text-gray-400 text-sm sm:text-base">
            <h3>Yves DC</h3>
            <div className="relative flex items-center gap-1">
              <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full"></span>
              <p>March 4, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
