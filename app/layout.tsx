import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
import { AuthKitProvider } from '@workos-inc/authkit-nextjs/components';

//this is the "Root Layout" file.  it determines what wraps around the entire application and all other layout files will source from this one
//next.js is a Single Page Application library, meaning that despite going to different URLs you are still on the same page, just with different visuals

//some font imports
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//meta data is metadata
export const metadata: Metadata = {
  title: "Spellblade App",
  description: "the app for Spellblade",
};

//returns the wrapper for the app with the basic 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AuthKitProvider>
            {children}
          </AuthKitProvider>
        </body>
      </html>
  );
}
