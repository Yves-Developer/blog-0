import { config } from "@/lib/config";
import { formatDate } from "@/lib/formatter";
import Link from "next/link";

const FeaturedPost = async () => {
  const res = await fetch(
    `${config.apiEndpoint}/posts?pagination[pageSize]=1&populate=author&populate=Thumbnail&populate=category`,
    {
      headers: { authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }, // Fixed typo here
    }
  );

  if (!res.ok) {
    throw new Error(`Error fetching posts: ${res.statusText}`);
  }

  const data = await res.json();
  const featuredPost = data.data[0];
  return (
    <div className="max-sm:px-[20px]">
      <div className="w-full aspect-[16/9] min-h-auto overflow-hidden rounded-md relative shadow-[0_8px_20px_rgba(15,36,36,0.3)]">
        {/* Background Image Container */}
        <div
          className={`w-full h-full bg-no-repeat bg-center bg-cover rounded-md hover:scale-105 transition-all duration-500 ease-in-out`}
          style={{ backgroundImage: `url(${featuredPost?.Thumbnail?.url})` }}
        >
          {/* Gradient Overlay */}
          <div className="w-full h-full bg-gradient-to-b from-transparent to-[#0d0d0d] rounded-md"></div>
        </div>

        {/* Text Content */}
        <div className="absolute left-6 sm:left-10 bottom-6 sm:bottom-10 flex flex-col gap-3">
          <span className="inline-flex items-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-white w-fit">
            {featuredPost.category.Name}
          </span>

          <Link
            href={`/${featuredPost.Slug}`}
            className="text-2xl line-clamp-2 sm:text-4xl hover:text-primary cursor-pointer transition-all ease-in duration-300 font-bold leading-tight sm:leading-snug"
          >
            {featuredPost.Title}
          </Link>

          <div className="flex items-center gap-4 sm:gap-6 text-gray-400 text-sm sm:text-base">
            <h3>{featuredPost.author.Name}</h3>
            <div className="relative flex items-center gap-1">
              <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full"></span>
              <p>{formatDate(featuredPost.publishedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
