import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/providers/react-query-provider";
import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
const geistSans = Recursive({
  variable: "--font-recursive-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body className={`${geistSans.variable}  antialiased`}>
          <Navbar />
          <main className="flex flex-col min-h-[calc(100vh-3.5rem-1px)] grainy-light">
            <div className="flex-1 flex flex-col h-full">{children}</div>
            <Footer />
          </main>
          <Toaster position="top-right" />
        </body>
      </ReactQueryProvider>
    </html>
  );
}
