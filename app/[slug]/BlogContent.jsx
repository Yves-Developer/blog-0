"use client";

import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import hljs from "highlight.js";

export default function BlogContent({ content }) {
  const [copiedText, setCopiedText] = useState(null);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1500);
  };

  return (
    <div className="prose lg:prose-xl max-w-none">
      <ReactMarkdown
        components={{
          // Paragraphs
          p: ({ children }) => (
            <p className="text-lg leading-relaxed">{children}</p>
          ),

          // Headings
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-primary/90">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold text-primary/90">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-medium text-primary/90">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-light text-primary/90">{children}</h4>
          ),

          // Links
          a: ({ children, href }) => (
            <a href={href} className="text-primary hover:underline">
              {children}
            </a>
          ),

          // Images
          img: ({ src, alt }) => (
            <div className="relative w-full aspect-video">
              <img
                src={src ?? ""}
                alt={alt ?? ""}
                className="w-full h-auto rounded-md"
              />
            </div>
          ),

          // Text styles
          strong: ({ children }) => (
            <strong className="font-semibold text-primary/80">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-primary/70">{children}</em>
          ),
          u: ({ children }) => (
            <span className="underline text-primary/70">{children}</span>
          ),

          // Code (inline + block)
          code({ inline, className, children, ...props }) {
            const codeText = String(children).trim();

            if (inline) {
              return <code className="px-1 py-0.5 rounded">{codeText}</code>;
            }

            // detect language from markdown fences
            const language = className?.replace("language-", "") || "";
            const highlighted = language
              ? hljs.highlight(codeText, { language }).value
              : hljs.highlightAuto(codeText).value;

            return (
              <div className="relative my-4">
                <pre className="overflow-x-auto p-4 my-4">
                  <code
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                    className={`hljs ${language || ""} rounded-md`}
                  />
                </pre>
                <button
                  onClick={() => handleCopy(codeText)}
                  className="absolute top-2 right-2 px-2 py-1 bg-primary text-white text-xs rounded hover:bg-primary/80"
                >
                  {copiedText === codeText ? "Copied!" : "Copy"}
                </button>
              </div>
            );
          },
        }}
      >
        {content || ""}
      </ReactMarkdown>
    </div>
  );
}

// "use client";

// import { BlocksRenderer } from "@strapi/blocks-react-renderer";
// export default function BlogContent({ content }) {
//   return (
//     <div className="prose lg:prose-xl max-w-none">
//       <BlocksRenderer
//         content={content || []}
//         blocks={{
//           paragraph: ({ children }) => (
//             <p className="text-lg leading-relaxed">{children}</p>
//           ),
//           heading: ({ children, level }) => {
//             switch (level) {
//               case 1:
//                 return (
//                   <h1 className="text-3xl font-bold text-primary/90">
//                     {children}
//                   </h1>
//                 );
//               case 2:
//                 return (
//                   <h2 className="text-2xl font-semibold text-primary/90">
//                     {children}
//                   </h2>
//                 );
//               case 3:
//                 return (
//                   <h3 className="text-xl font-medium text-primary/90">
//                     {children}
//                   </h3>
//                 );
//               default:
//                 return (
//                   <h4 className="text-lg font-light text-primary/90">
//                     {children}
//                   </h4>
//                 );
//             }
//           },
//           link: ({ children, url }) => (
//             <a href={url} className="text-primary hover:underline">
//               {children}
//             </a>
//           ),
//           image: ({ src, alt }) => (
//             <div className="relative w-full aspect-w-16 aspect-h-9">
//               <img src={src} alt={alt} className="w-full h-auto rounded-md" />
//             </div>
//           ),
//         }}
//         modifiers={{
//           bold: ({ children }) => (
//             <strong className="font-semibold text-primary/80">
//               {children}
//             </strong>
//           ),
//           italic: ({ children }) => (
//             <em className="italic text-primary/70">{children}</em>
//           ),
//           underline: ({ children }) => (
//             <span className="underline text-primary/70">{children}</span>
//           ),
//         }}
//       />
//     </div>
//   );
// }
