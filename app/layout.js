import { MyThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Navbar from "@/components/navbar";
import About from "@/components/about";
import Panel from "@/components/panel";
import Category from "@/components/category";
import Email from "@/components/email";
import Wrapper from "@/components/wrapper";
import PlausibleProvider from "next-plausible";
export const metadata = {
  title: "Blog Website",
  description: "A blog website - sharpbook.store | blog.sharpbook.store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="selection:bg-primary selection:text-accent-foreground">
        <PlausibleProvider domain="blog.sharpbook.store" outboundTracking={true}>
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
