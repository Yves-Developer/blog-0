import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { config } from "@/lib/settings";
import { formatDate } from "@/lib/formatter";
import Image from "next/image";
import BlogContent from "./BlogContent";
import Script from "next/script";

export async function generateStaticParams() {
  const res = await fetch(`${config.apiEndpoint}/posts?fields=Slug`, {
    headers: {
      authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.data.map((post) => ({ slug: post.Slug }));
}

async function getPost(slug) {
  const res = await fetch(
    `${config.apiEndpoint}/posts?filters[Slug][$eq]=${slug}&populate=Thumbnail&populate=category&populate=author`,
    {
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) return null;
  const data = await res.json();
  return data.data[0] || null;
}
// Helper to extract text from Strapi Rich Text
function extractText(contentObj) {
  if (!contentObj) return '';
  if (typeof contentObj === 'string') return contentObj;

  // Strapi rich text usually has contentObj.content array
  if (Array.isArray(contentObj.content)) {
    return contentObj.content
      .map(block => {
        if (block.type === 'paragraph' && Array.isArray(block.content)) {
          return block.content.map(c => c.text || '').join('');
        }
        return '';
      })
      .join(' ');
  }

  return '';
}
// DYNAMIC METADATA
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
// Usage:
const descriptionText = extractText(post.Content).slice(0, 160);
  const ogImage = post.Thumbnail?.url || "/images/default-og.png";

  return {
    title: `${post.Title} | YvesDC`,
    description: post.Content.slice(0, 160),
    keywords: [post.Title, post.category.Name, "YvesDC", "Blog", "Coding"],
    authors: [{ name: post.author.Name }],
    metadataBase: new URL("https://yvesdc.site"),
   openGraph: {
  title: `${post.Title} | YvesDC`,
  description: descriptionText,
  url: `https://yvesdc.site/${post.Slug}`,
  siteName: "YvesDC",
  images: [
    {
      url: ogImage,
      width: 1200,
      height: 630,
      alt: post.Title,
    },
  ],
  type: "article",
},

twitter: {
  card: "summary_large_image",
  title: `${post.Title} | YvesDC`,
  description: descriptionText,
  images: [ogImage],
};
    
}

export default async function Blog({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return <div>Post not found</div>;

  const ogImage = post.Thumbnail?.url || "/images/default-og.jpg";

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
          src={ogImage}
          width={1920}
          height={1080}
          quality={100}
          alt={post.Title + " Image"}
          priority
          className="w-full rounded-md object-cover"
        />
      </div>

      {/* Post Content */}
      <BlogContent content={post.Content} />

      {/* JSON-LD Structured Data */}
      <Script id="json-ld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.Title,
          description: post.Content.slice(0, 160),
          author: { "@type": "Person", name: post.author.Name },
          datePublished: post.publishedAt,
          url: `https://yvesdc.site/${post.Slug}`,
          image: ogImage,
        })}
      </Script>

      {/* Breadcrumb JSON-LD */}
      <Script id="breadcrumb-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://yvesdc.site",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: post.category.Name,
              item: `https://yvesdc.site/${post.category.Slug}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: post.Title,
              item: `https://yvesdc.site/${post.Slug}`,
            },
          ],
        })}
      </Script>
    </div>
  );
}
