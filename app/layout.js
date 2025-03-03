import { MyThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata = {
  title: "Blog Website",
  description: "A blog website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MyThemeProvider>
          <Navbar />
          {children}
        </MyThemeProvider>
      </body>
    </html>
  );
}
