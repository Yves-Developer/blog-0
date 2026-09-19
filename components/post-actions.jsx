"use client";

import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Share2, Link as LinkIcon, Check } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";

export default function PostActions({ slug, title }) {
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);
    const url = `https://yvesdc.site/${slug}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        toast({
            description: "Link copied to clipboard!",
        });
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = (platform) => {
        const encodedTitle = encodeURIComponent(title);
        const encodedUrl = encodeURIComponent(url);
        let shareUrl = "";

        switch (platform) {
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
                break;
            case "linkedin":
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
                break;
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            default:
                return;
        }

        window.open(shareUrl, "_blank", "width=600,height=400");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="hover:text-primary">
                    <Share2 className="w-5 h-5 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem onClick={() => handleShare("twitter")}>
                    Share upon X
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("linkedin")}>
                    Share upon LinkedIn
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("facebook")}>
                    Share upon Facebook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCopy}>
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <LinkIcon className="w-4 h-4 mr-2" />}
                    Copy Link
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
