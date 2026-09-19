"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function TableOfContents({ content }) {
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState("");

    useEffect(() => {
        const lines = content.split("\n");
        const extracted = [];

        // Simple extraction - in production this should parse the AST if possible
        lines.forEach((line) => {
            if (line.match(/^##\s/)) {
                const text = line.replace(/^##\s/, "").trim();
                const id = text.toLowerCase().replace(/[^\w]+/g, "-");
                extracted.push({ text, id, level: 2 });
            } else if (line.match(/^###\s/)) {
                const text = line.replace(/^###\s/, "").trim();
                const id = text.toLowerCase().replace(/[^\w]+/g, "-");
                extracted.push({ text, id, level: 3 });
            }
        });

        setHeadings(extracted);
    }, [content]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-100px 0px -66%" }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <div className="hidden lg:block sticky top-24 pl-4 border-l border-border/40">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4 pl-2">
                On this page
            </p>
            <nav className="flex flex-col gap-2">
                {headings.map((heading, index) => (
                    <a
                        key={index}
                        href={`#${heading.id}`}
                        className={cn(
                            "text-sm transition-all duration-200 border-l-[2px] -ml-[17px] pl-4 py-1",
                            activeId === heading.id
                                ? "border-primary text-primary font-medium"
                                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50",
                            heading.level === 3 && "ml-2"
                        )}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(heading.id)?.scrollIntoView({
                                behavior: "smooth"
                            });
                            setActiveId(heading.id);
                        }}
                    >
                        {heading.text}
                    </a>
                ))}
            </nav>
        </div>
    );
}
