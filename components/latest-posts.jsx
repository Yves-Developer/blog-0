import React from "react";
import Card from "./ui/card";
import Image from "next/image";
import { Ellipsis, Share2 } from "lucide-react";
import Link from "next/link";
import { posts } from "@/constants";
import { Button } from "./ui/button";

const LatestPosts = () => {
  return (
    <Card className="w-3/4 flex flex-col gap-5">
      {/* Main Container */}
      {posts.map((post) => (
        <div className="mt-3 relative flex gap-3 after:absolute after:left-0 after:top-full after:w-full after:h-[1px] after:bg-gradient-to-l after:from-zinc-500 after:to-transparent after:mt-4">
          {/* Blog Image */}
          <div className="h-48 w-64 rounded-md bg-amber-950">
            <Image
              width={120}
              height={120}
              src="/mountain.jpg"
              alt="Mountain"
              className="w-full h-full rounded-md object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="px-5 w-[calc(100%-256px)] flex flex-col gap-3">
            {/* Author Info */}
            <div className="flex gap-3 items-center">
              <Image
                src="/mountain.jpg"
                width={32}
                height={32}
                alt="Author"
                className="w-8 h-8 rounded-full object-cover"
              />
              <h3 className="text-gray-400 mr-2">Yves DC</h3>
              <div className="relative flex items-center gap-1 text-gray-400">
                <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full"></span>
                <p>{post.date}</p>
              </div>
            </div>

            {/* Blog Title */}
            <Link
              href="/"
              className="hover:text-primary transition-all duration-300 ease-in-out text-2xl font-semibold line-clamp-2"
            >
              {post.title}
            </Link>

            {/* Blog Description */}
            <p className="text-gray-400 text-lg line-clamp-3">{post.excerpt}</p>

            {/* Actions */}
            <div className="flex gap-3 justify-between">
              <Share2 />
              <Ellipsis />
            </div>
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

export default LatestPosts;
