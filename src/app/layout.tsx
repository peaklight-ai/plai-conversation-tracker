import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Using Inter as fallback since Afacad Flux isn't in next/font/google
// Afacad Flux would need to be loaded via @font-face or local fonts
const inter = Inter({
  variable: "--font-afacad",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

export const metadata: Metadata = {
  title: "PLAI Conversation Tracker",
  description: "Your AI Supercharger - Track and manage sales conversations with AI-powered insights",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
