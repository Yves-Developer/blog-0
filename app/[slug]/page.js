"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { config } from "@/lib/config";
import { formatDate } from "@/lib/formatter";
import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const Blog = () => {
  const { slug } = useParams(); // Get the dynamic slug from the URL
  console.log(slug);

  const [post, setPost] = useState(null); // Start with null to indicate no post yet

  useEffect(() => {
    if (!slug) return; // Only run the fetch if the slug is available

    const FetchPost = async () => {
      try {
        const res = await fetch(
          `${config.apiEndpoint}/posts?filters[Slug][$eq]=${slug}&populate=Thumbnail&populate=category&populate=author`,
          {
            headers: {
              authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Error fetching posts: ${res.statusText}`);
        }

        const data = await res.json();
        setPost(data.data ? data.data[0] : null); // Safely set post if it exists
      } catch (error) {
        console.error(error);
        setPost(null); // Handle errors by setting post to null
      }
    };

    FetchPost();
  }, [slug]); // Run the effect when the slug changes

  if (post === null) return <div>Loading...</div>; // Render loading state if post is null

  return (
    <div className="relative max-sm:px-[20px] pb-3 flex flex-col gap-3 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-gradient-to-l after:from-[#262626] after:to-transparent after:mt-4">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Posts</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${post.category.Slug}`}>
              {post.category.Name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{post.Title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Blog Content */}
      <h1 className="text-3xl font-bold">{post.Title}</h1>
      <div className="flex gap-3 items-center">
        <h3 className="text-[#7d7f78] mr-2">{post.author.Name}</h3>
        <div className="relative flex items-center gap-1 text-[#7d7f78]">
          <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full"></span>
          <p>{formatDate(post.publishedAt)}</p>
        </div>
      </div>

      {/* Post Thumbnail */}
      <div className="aspect-16/9 rounded-md">
        <Image
          src={post.Thumbnail?.url || "/placeholder.jpg"} // Fallback to a placeholder if the thumbnail is missing
          width={1920}
          height={1080}
          quality={100}
          alt={post.Title + " Image"}
          priority
          className="w-full rounded-md object-cover"
        />
      </div>

      {/* Post Content */}
      <div className="prose lg:prose-xl max-w-none">
        <BlocksRenderer
          content={post.Content || []} // Ensure Content exists before passing it to BlocksRenderer
          blocks={{
            paragraph: ({ children }) => (
              <p className="text-lg leading-relaxed">{children}</p>
            ),
            heading: ({ children, level }) => {
              switch (level) {
                case 1:
                  return (
                    <h1 className="text-3xl font-bold text-primary/90">
                      {children}
                    </h1>
                  );
                case 2:
                  return (
                    <h2 className="text-2xl font-semibold text-primary/90">
                      {children}
                    </h2>
                  );
                case 3:
                  return (
                    <h3 className="text-xl font-medium text-primary/90">
                      {children}
                    </h3>
                  );
                default:
                  return (
                    <h4 className="text-lg font-light text-primary/90">
                      {children}
                    </h4>
                  );
              }
            },
            link: ({ children, url }) => (
              <a href={url} className="text-primary hover:underline">
                {children}
              </a>
            ),
            image: ({ src, alt }) => (
              <div className="relative w-full aspect-w-16 aspect-h-9">
                <Image src={src} alt={alt} layout="fill" objectFit="cover" />
              </div>
            ),
          }}
          modifiers={{
            bold: ({ children }) => (
              <strong className="font-semibold text-primary/80">
                {children}
              </strong>
            ),
            italic: ({ children }) => (
              <em className="italic text-primary/70">{children}</em>
            ),
            underline: ({ children }) => (
              <span className="underline text-primary/70">{children}</span>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default Blog;
