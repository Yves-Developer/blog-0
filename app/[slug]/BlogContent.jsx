"use client";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function BlogContent({ content }) {
  return (
    <div className="prose lg:prose-xl max-w-none">
      <BlocksRenderer
        content={content || []}
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
              <img src={src} alt={alt} className="w-full h-auto rounded-md" />
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
  );
}
