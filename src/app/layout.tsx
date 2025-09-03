import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tom French - Mathematics, CV, and Thoughts",
  description: "Personal website featuring mathematical explorations, professional CV, blog posts, and ambient noise player",
  icons: {
    icon: [
      { url: "/favicon.ico?v=2" },
      { url: "/icon.ico?v=2", type: "image/x-icon" }
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=2", sizes: "180x180" }
    ],
    shortcut: "/favicon.ico?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-svh flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          storageKey="theme-v2"
          disableTransitionOnChange
        >
          <Navigation />
          <main className="flex-1 min-h-0">
            {children}
          </main>
          <Toaster richColors position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
