import { posts } from "@/constants";
import React from "react";

const Blog = async ({ params }) => {
  const { slug } = await params;
  return (
    <div>
      <p>Posts/category/{slug}</p>
      <h1 className="text-3xl font-bold">{posts[0].title}</h1>
    </div>
  );
};

export default Blog;
