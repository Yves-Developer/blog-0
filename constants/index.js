import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export const Navdata = [
  {
    title: "Home",
    slug: "/",
  },
  {
    title: "Popular",
    slug: "/popular",
  },
  {
    title: "Technology",
    slug: "/technology",
  },
  {
    title: "Coding",
    slug: "/coding",
  },
];
export const SocialIcons = [
  { link: "https://facebook.com", color: "blue-800", Icon: Facebook },
  { link: "https://youtube.com", color: "primary", Icon: Youtube },
  { link: "https://instagram.com", color: "red-800", Icon: Instagram },
  { link: "https://linkedin.com", color: "blue-800", Icon: Linkedin },
];
export const posts = [
  {
    id: 1,
    title: "Mastering React: Tips and Tricks for Efficient Coding",
    excerpt:
      "Discover the best practices and tips to improve your React skills...",
    image: "/mountain.jpg",
    date: "March 4, 2025",
    readTime: "6 min read",
  },
  {
    id: 2,
    title: "The Future of JavaScript: What’s Coming in ES2025?",
    excerpt:
      "Explore the upcoming features of JavaScript and how they can impact development...",
    image: "/mountain.jpg",
    date: "March 1, 2025",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Building Scalable Apps with Next.js & TailwindCSS",
    excerpt:
      "Learn how to create high-performance web applications using Next.js and TailwindCSS...",
    image: "/mountain.jpg",
    date: "February 27, 2025",
    readTime: "7 min read",
  },
  {
    id: 4,
    title: "Why TypeScript is Taking Over JavaScript Projects",
    excerpt:
      "TypeScript has become the go-to choice for large-scale applications. Here’s why...",
    image: "/mountain.jpg",
    date: "February 20, 2025",
    readTime: "5 min read",
  },
  // {
  //   id: 5,
  //   title: "Top 10 VS Code Extensions for Web Developers",
  //   excerpt:
  //     "Boost your productivity with these must-have VS Code extensions...",
  //   image: "/mountain.jpg",
  //   date: "February 15, 2025",
  //   readTime: "4 min read",
  // },
];

export const categories = [
  {
    topic: "AI & Machine Learning",
    slug: "ai-machine-learning",
    totalPosts: 25,
  },
  {
    topic: "Web Development",
    slug: "web-development",
    totalPosts: 40,
  },
  {
    topic: "Cybersecurity",
    slug: "cybersecurity",
    totalPosts: 18,
  },
  {
    topic: "Data Science",
    slug: "data-science",
    totalPosts: 30,
  },
  {
    topic: "Mobile Development",
    slug: "mobile-development",
    totalPosts: 22,
  },
];
