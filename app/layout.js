import { MyThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Navbar from "@/components/navbar";
import About from "@/components/about";
import Panel from "@/components/panel";
import Category from "@/components/category";
import Email from "@/components/email";
import Wrapper from "@/components/wrapper";
import PlausibleProvider from "next-plausible";
// General Metadata
export const metadata = {
  title: "YvesDC – Full-stack, AI & Coding Diary",
  description:
    "Follow YvesDC's journey through full-stack development, AI experiments, coding tutorials, and digital marketing insights.",
  keywords: [
    "YvesDC",
    "coding diary",
    "full-stack development",
    "AI projects",
    "Next.js tutorials",
  ],
  authors: [{ name: "Yves Mugisha" }],
  metadataBase: new URL("https://yvesdc.site"),

  // Open Graph for social platforms
  openGraph: {
    title: "YvesDC – Full-stack, AI & Coding Diary",
    description:
      "Follow YvesDC's journey through full-stack development, AI experiments, coding tutorials, and digital marketing insights.",
    url: "https://yvesdc.site",
    siteName: "YvesDC",
    images: [
      {
        url: "/images/default-og.jpg", // your branded image
        width: 1200,
        height: 630,
        alt: "YvesDC – Full-stack Coding Diary",
      },
    ],
    type: "website",
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "YvesDC – Full-stack, AI & Coding Diary",
    description:
      "Follow YvesDC's journey through full-stack development, AI experiments, coding tutorials, and digital marketing insights.",
    images: ["/images/default-og.jpg"],
  },

  // LinkedIn & Instagram use Open Graph by default
  // No extra tags needed; they read OG tags
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
        {/* ✅ Google AdSense Verification Meta Tag */}
        <meta
          name="google-adsense-account"
          content="ca-pub-6567175721280636"
        />
      </head>
      <body className="selection:bg-primary selection:text-accent-foreground">
        <PlausibleProvider
          domain="blog.sharpbook.store"
          outboundTracking={true}
        >
          <MyThemeProvider>
            <Navbar />
            <Wrapper classNames="py-10">
              {/* Row with two columns */}
              <div className="flex flex-col lg:flex-row gap-10">
                {/* Left Column - takes 8/12 width on large screens and full width on small screens */}
                <div className="lg:w-8/12 w-full flex flex-col gap-6">
                  {children}
                </div>

                {/* Right Column - takes 4/12 width on large screens and full width on small screens */}
                <div className="lg:w-4/12 w-full flex flex-col gap-6">
                  <About />
                  <Panel />
                  <Category />
                  <Email />
                </div>
              </div>
            </Wrapper>
          </MyThemeProvider>
        </PlausibleProvider>
      </body>
    </html>
  );
}
