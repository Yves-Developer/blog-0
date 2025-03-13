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
import BlogContent from "./BlogContent"; // Import client component

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
      next: { revalidate: 60 }, // ISR enabled
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.data[0] || null;
}

export default async function Blog({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return <div>Post not found</div>;
  }

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
          src={post.Thumbnail?.url || "/placeholder.jpg"}
          width={1920}
          height={1080}
          quality={100}
          alt={post.Title + " Image"}
          priority
          className="w-full rounded-md object-cover"
        />
      </div>

      {/* Post Content - Use Client Component */}
      <BlogContent content={post.Content} />
    </div>
  );
}
