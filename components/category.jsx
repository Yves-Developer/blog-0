import Card from "./ui/card";
import { cn } from "@/lib/utils";
import Header from "./header";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { config } from "@/lib/settings";

const Category = async ({ className }) => {
  const res = await fetch(
    `${config.apiEndpoint}/categories?pagination[pageSize]=5&populate[posts][fields][0]=id`,
    {
      headers: { authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }, // Fixed typo here
    },
    {
      next: {
        ravalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Error fetching posts: ${res.statusText}`);
  }

  const data = await res.json();
  const categories = data.data;
  return (
    <div className="max-sm:px-[20px] max-md:px-[100px]">
      <Card
        className={cn(
          "p-4 flex flex-col gap-3 justify-center items-center",
          className
        )}
      >
        <Header title="Explore Topics" className="text-xl mb-1" />

        <div className="flex flex-col gap-3 w-full">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative pb-2 flex gap-3 items-center w-full before:absolute before:left-0 before:bottom-0 before:w-full before:h-[1px] before:bg-gradient-to-l before:from-transparent before:to-[#262626]"
            >
              <ChevronRight className="p-1 rounded-sm w-5 h-5 border border-primary text-primary flex-shrink-0" />

              <Link
                href={`/category/${category.Slug}`}
                className="flex items-center gap-2 w-full overflow-hidden hover:text-primary transition-all duration-300 ease-in-out"
              >
                <span className="truncate block w-full">{category.Name}</span>
                <span className="w-fit h-5 px-2 flex items-center justify-center bg-primary rounded-sm flex-shrink-0">
                  {category.posts.length}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Category;
