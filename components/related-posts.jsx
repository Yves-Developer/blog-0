import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/formatter";
import { siteConfig } from "@/lib/settings";

async function getRelatedPosts(currentSlug, categorySlug) {
    try {
        const res = await fetch(
            `${siteConfig.apiEndpoint}/posts?filters[Slug][$ne]=${currentSlug}&filters[category][Slug][$eq]=${categorySlug}&pagination[pageSize]=3&populate=Thumbnail`,
            {
                headers: {
                    authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                },
                next: { revalidate: 60 },
            }
        );

        if (!res.ok) return [];
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching related posts:", error);
        return [];
    }
}

export default async function RelatedPosts({ currentSlug, categorySlug }) {
    const posts = await getRelatedPosts(currentSlug, categorySlug);

    if (posts.length === 0) return null;

    return (
        <div className="mt-16 border-t border-border pt-8">
            <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        href={`/${post.Slug}`}
                        className="group flex flex-col gap-3"
                    >
                        <div className="relative aspect-video overflow-hidden rounded-md">
                            <Image
                                src={post.Thumbnail?.url || "/images/default-og.jpg"}
                                alt={post.Title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h4 className="font-semibold group-hover:text-primary transition-colors">
                                {post.Title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                {formatDate(post.publishedAt)}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
