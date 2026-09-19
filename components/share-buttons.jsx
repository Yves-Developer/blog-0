"use client";

import { Twitter, Linkedin, Facebook, Link as LinkIcon, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ShareButtons({ title, slug, layout = "vertical", className }) {
    const [copied, setCopied] = useState(false);
    const url = `https://yvesdc.site/${slug}`;
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareLinks = [
        {
            name: "X (Twitter)",
            url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            icon: Twitter,
        },
        {
            name: "LinkedIn",
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            icon: Linkedin,
        },
        {
            name: "Facebook",
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            icon: Facebook,
        },
    ];

    const isVertical = layout === "vertical";

    return (
        <div className={cn("flex gap-4", isVertical ? "flex-col" : "flex-col items-center", className)}>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Share
            </p>
            <div className={cn("flex gap-3", isVertical ? "flex-col" : "flex-row")}>
                {shareLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
                        aria-label={`Share on ${link.name}`}
                    >
                        <link.icon className="w-5 h-5" />
                    </a>
                ))}

                {/* Copy Link Button */}
                <button
                    onClick={handleCopy}
                    className="group flex items-center justify-center p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
                    aria-label="Copy Link"
                >
                    {copied ? <Check className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                </button>
            </div>
        </div>
    );
}
