import React from "react";
import Card from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Ellipsis, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/settings";
import { formatDate } from "@/lib/formatter";
import Script from "next/script";

// Helper to convert Strapi Rich Text to plain text for excerpts
function getExcerpt(content, length = 120) {
  if (!content) return "";
  if (typeof content === "string") return content.slice(0, length);

  const text = content
    .map((block) => {
      if (block.children && Array.isArray(block.children)) {
        return block.children
          .map((child) => (typeof child.text === "string" ? child.text : ""))
          .join("");
      }
      return "";
    })
    .join(" ");
  return text.slice(0, length);
}

// Deslugize category (replace - with space and capitalize)
function deslugize(slug) {
  if (!slug) return "";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Fetch posts by category slug
async function getCategoryPosts(categorySlug) {
  const res = await fetch(
    `${config.apiEndpoint}/posts?filters[category][Slug][$eq]=${categorySlug}&populate[author][populate]=Profile&populate=Thumbnail`,
    {
      headers: { authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) throw new Error(`Error fetching posts: ${res.statusText}`);

  const data = await res.json();
  return data.data || [];
}

// Dynamic Metadata
export async function generateMetadata({ params }) {
  const { categoryName } = await params;
  const formattedCategory = deslugize(categoryName);

  return {
    title: `${formattedCategory} | YvesDC Blog`,
    description: `All posts about ${formattedCategory} on YvesDC blog. Explore coding, AI, and more.`,
    metadataBase: new URL("https://yvesdc.site"),
    openGraph: {
      title: `${formattedCategory} | YvesDC Blog`,
      description: `All posts about ${formattedCategory} on YvesDC blog.`,
      url: `https://yvesdc.site/category/${categoryName}`,
      siteName: "YvesDC",
      images: [
        {
          url: "/images/default-og.jpg",
          width: 1200,
          height: 630,
          alt: `${formattedCategory} | YvesDC`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${formattedCategory} | YvesDC Blog`,
      description: `All posts about ${formattedCategory} on YvesDC blog.`,
      images: ["/images/default-og.jpg"],
    },
  };
}

// Category Page Component
export default async function CategoryPage({ params }) {
  const { categoryName } = await params;
  const formattedCategory = deslugize(categoryName);
  const posts = await getCategoryPosts(categoryName);

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* JSON-LD for structured data */}
      <Script id="category-json-ld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${formattedCategory} | YvesDC Blog`,
          url: `https://yvesdc.site/category/${categoryName}`,
          description: `All posts about ${formattedCategory} on YvesDC blog.`,
        })}
      </Script>

      <h1 className="text-3xl font-bold mb-6">{formattedCategory} Posts</h1>

      <Card className="w-full grid grid-cols-2 gap-6 md:grid-cols-1 md:gap-8 max-sm:grid-cols-1">
        {posts.map((post) => (
          <div
            key={post.id}
            className="mt-3 relative flex flex-col md:flex-row gap-3 md:gap-6 after:absolute after:left-0 after:top-full after:w-full after:h-[1px] after:bg-gradient-to-l after:from-[#262626] after:to-transparent after:mt-4"
          >
            {/* Post Thumbnail */}
            <div className="h-48 w-full md:w-64 rounded-md overflow-hidden mb-4 md:mb-0">
              <Image
                src={post.Thumbnail?.url || "/images/default-og.jpg"}
                width={1920}
                height={1080}
                alt={post.Title + " Image"}
                quality={100}
                priority
                className="w-full rounded-md object-cover"
              />
            </div>

            {/* Post Content */}
            <div className="px-5 w-full md:w-[calc(100%-256px)] flex flex-col gap-3">
              {/* Author Info */}
              <div className="flex gap-3 items-center">
                <Image
                  src={post.author?.Profile?.url || "/mountain.jpg"}
                  width={32}
                  height={32}
                  alt="Author"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <h3 className="text-[#7d7f78] mr-2">{post.author?.Name}</h3>
                <div className="relative flex items-center gap-1 text-[#7d7f78]">
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full"></span>
                  <p>{formatDate(post.publishedAt)}</p>
                </div>
              </div>

              {/* Post Title */}
              <Link
                href={`/${post.Slug}`}
                className="hover:text-primary transition-all duration-300 ease-in-out text-2xl font-semibold line-clamp-2"
              >
                {post.Title}
              </Link>

              {/* Post Excerpt */}
              <p className="text-[#7d7f78] text-lg line-clamp-3">
                {getExcerpt(post.Content)}...
              </p>

              {/* Actions */}
              <div className="flex gap-3 justify-between">
                <Share2 />
                <Ellipsis />
              </div>
            </div>
          </div>
        ))}

        <Button variant="outline" className="self-center mt-2">
          Read More
        </Button>
      </Card>
    </div>
  );
}
