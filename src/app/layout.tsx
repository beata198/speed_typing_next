import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeToggle from "./components/themeToggle";
import Notification from "./components/notification";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Speed Typing App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased dark:bg-neutral-800 dark:text-white text-neutral-800`}
      >
        <Notification />
        <header className="flex justify-between items-center p-4 font-[family-name:var(--font-geist-mono)]">
          <h5 className="text-2xl font-bold">SpeedTyping</h5>
          <ThemeToggle />
        </header>
        <main className="flex flex-col gap-6 min-h-[70vh] p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          {children}
        </main>
        <footer></footer>
      </body>
    </html>
  );
}
