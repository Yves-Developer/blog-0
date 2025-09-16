import React from "react";
import Card from "./ui/card";
import Image from "next/image";
import { Ellipsis, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { config } from "@/lib/settings";
import { formatDate } from "@/lib/formatter";
import { getExcerpt } from "@/lib/excerpt";

const LatestPosts = async () => {
  const res = await fetch(
    `${config.apiEndpoint}/posts?populate[author][populate]=Profile&populate=Thumbnail`,
    {
      headers: { authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Error fetching posts: ${res.statusText}`);
  }

  const data = await res.json();
  const postees = data.data;
  return (
    <div className="max-sm:px-[20px]">
      <Card className="w-full grid grid-cols-2 gap-6 md:grid-cols-1 md:gap-8 max-sm:grid-cols-1">
        {/* Main Container */}
        {postees.map((postee) => (
          <div
            key={postee.id}
            className="mt-3 relative flex flex-col md:flex-row gap-3 md:gap-6 after:absolute after:left-0 after:top-full after:w-full after:h-[1px] after:bg-gradient-to-l after:from-[#262626] after:to-transparent after:mt-4"
          >
            {/* Blog Image */}
            <div className="h-48 w-full md:w-64 rounded-md overflow-hidden mb-4 md:mb-0">
              <Image
                src={postee.Thumbnail.url}
                width={1920}
                height={1080}
                alt={postee.Title + "Image"}
                quality={100}
                priority
                className="w-full rounded-md object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="px-5 w-full md:w-[calc(100%-256px)] flex flex-col gap-3">
              {/* Author Info */}
              <div className="flex gap-3 items-center">
                <Image
                  src={postee.author.Profile.url || "/mountain.jpg"}
                  width={32}
                  height={32}
                  alt="Author"
                  objectFit="cover"
                  className="w-8 h-8 rounded-full"
                />
                <h3 className="text-[#7d7f78] mr-2">{postee.author.Name}</h3>
                <div className="relative flex items-center gap-1 text-[#7d7f78]">
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full"></span>
                  <p>{formatDate(postee.publishedAt)}</p>
                </div>
              </div>

              {/* Blog Title */}
              <Link
                href={`/${postee.Slug}`}
                className="hover:text-primary transition-all duration-300 ease-in-out text-2xl font-semibold line-clamp-2"
              >
                {postee.Title}
              </Link>

              {/* Blog Description */}
              <p className="text-[#7d7f78] text-lg line-clamp-3">
                {getExcerpt(postee.Content)}
              </p>

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
    </div>
  );
};

export default LatestPosts;
