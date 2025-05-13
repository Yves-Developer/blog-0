import React from "react";
import Card from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { posts } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { formatDate } from "@/lib/formatter";
import { config } from "@/lib/settings";

const Panel = async ({ className }) => {
  const res = await fetch(
    `${config.apiEndpoint}/posts?pagination[pageSize]=5&populate=Thumbnail`,
    {
      headers: { authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }, // Fixed typo here
      next: {
        revaidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Error fetching posts: ${res.statusText}`);
  }

  const data = await res.json();
  const postees = data.data;
  return (
    <div className="max-sm:px-[20px] max-md:px-[100px]">
      <Card className={cn("w-1/3  p-4 flex gap-3 flex-col", className)}>
        <div className="flex gap-3 self-center">
          <Button
            className={cn("bg-primary/10 text-primary hover:bg-primary/10")}
          >
            Popular
          </Button>
          <Button>Recent</Button>
        </div>
        {/* Image & Content Container */}
        {postees.map((post) => (
          <div
            key={post.id}
            className="relative h-[100px] flex gap-3 items-center  after:absolute after:left-0 after:top-full after:w-full after:h-[1px] after:bg-gradient-to-l after:from-transparent after:to-[#262626]"
          >
            {/* Blog Image */}
            <div className="h-[60px] w-1/4 flex rounded-sm items-center justify-center">
              <Image
                src={post.Thumbnail.url}
                alt="Blog Image"
                width={1920}
                height={1080}
                quality={100}
                className="rounded-sm h-full w-full object-cover"
              />
            </div>

            {/* Blog Text Content */}
            <div className="w-3/4 flex flex-col justify-between">
              <Link
                href={`/${post.Slug}`}
                className="hover:text-primary transition-all duration-300 ease-in-out"
              >
                <h2 className="text-lg font-semibold line-clamp-2">
                  {post.Title}
                </h2>
              </Link>
              <p className="text-sm text-[#7d7f78]">
                {formatDate(post.publishedAt)}
              </p>
            </div>
          </div>
        ))}

        {/* Read More Button */}
        <Button variant="outline" className="self-center mt-2">
          Read More
        </Button>
      </Card>
    </div>
  );
};

export default Panel;
