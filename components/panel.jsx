import React from "react";
import Card from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { posts } from "@/constants";

const Panel = () => {
  return (
    <Card className="w-1/3 h-auto p-4 flex flex-col">
      {/* Image & Content Container */}
      {posts.map((post) => (
        <div key={post.id} className="h-32 flex gap-3 items-center">
          {/* Blog Image */}
          <div className="flex items-center justify-center">
            {" "}
            {/* Fixed width and height */}
            <Image
              src={post.image}
              alt="Blog Image"
              width={150}
              height={200}
              objectFit="cover"
              className="rounded-md"
            />
          </div>

          {/* Blog Text Content */}
          <div className="flex flex-col justify-between">
            <h2 className="text-lg font-semibold line-clamp-2">{post.title}</h2>
            <p className="text-sm text-gray-500">
              {post.date} • {post.readTime}
            </p>
          </div>
        </div>
      ))}

      {/* Read More Button */}
      <Button variant="outline" className="self-center mt-2">
        Read More
      </Button>
    </Card>
  );
};

export default Panel;
