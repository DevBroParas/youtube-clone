import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar"
import { Sidebar } from "@/components/layout/Sidebar"
import { AuthProvider } from "@/context/AuthContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Youtube-clone-app",
  description: "Fullstack Youtube clone app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={ inter.className }
      >
        <AuthProvider>
          <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto p-4">
                {children}
                </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
