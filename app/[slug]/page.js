import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { posts } from "@/constants";
import Image from "next/image";
import React from "react";

const Blog = async ({ params }) => {
  const { slug } = await params;
  return (
    <div className="relative max-sm:px-[20px] pb-3 flex flex-col gap-3 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-gradient-to-l after:from-[#262626] after:to-transparent after:mt-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Posts</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">category</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{slug}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold">{posts[0].title}</h1>
      <div className="flex gap-3 items-center">
        <h3 className="text-[#7d7f78] mr-2">Yves DC</h3>
        <div className="relative flex items-center gap-1 text-[#7d7f78]">
          <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full"></span>
          <p>{posts[0].date}</p>
        </div>
      </div>
      <div className="aspect-16/9 rounded-md">
        <Image
          src="/mountain.jpg"
          width={120}
          height={100}
          className="w-full rounded-md"
          objectFit="cover"
        />
      </div>
      <h2 className="text-2xl font-bold">Intro</h2>
      <p>
        One could refuse to pay expensive translators. To achieve this, it would
        be necessary to have uniform grammar, pronunciation and more common
        words.
      </p>
      <p>
        If several languages coalesce, the grammar of the resulting language is
        more simple and regular than that of the individual languages. The new
        common language will be more simple and regular than the existing
        European languages. It will be as simple as Occidental; in fact, it will
        be Occidental.
      </p>
    </div>
  );
};

export default Blog;
