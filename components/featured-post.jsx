import Link from "next/link";
import React from "react";

const FeaturedPost = () => {
  return (
    <div
      className="w-3/4 h-[500px] overflow-hidden rounded-md relative p-0 shadow-[0_8px_20px_rgba(15,36,36,0.3)]
"
    >
      {/* Background Image Container */}
      <div className="w-full h-full bg-no-repeat bg-center bg-cover rounded-md bg-[url(/mountain.jpg)] hover:scale-110 transition-all duration-300 ease-in-out">
        {/* Gradient Overlay */}
        <div className="w-full h-full bg-gradient-to-b from-transparent to-accent-foreground rounded-md"></div>
      </div>

      {/* Text (Placed Outside the Scaling Div) */}
      <div className="absolute left-10 bottom-10 flex flex-col gap-3">
        <span className="inline-flex items-center rounded-md bg-primary px-2 py-1 text-xs font-medium text-white w-fit">
          Finance
        </span>

        <Link
          href="/"
          className="text-4xl hover:text-primary cursor-pointer transition-all ease-in duration-300 font-bold"
        >
          Unlimited Codes Compilations and Development
        </Link>
        <div className="flex items-center gap-6">
          <h3 className="text-gray-400">Yves DC</h3>
          <div className="relative flex items-center gap-1 text-gray-400">
            <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full"></span>
            <p>March 4, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
