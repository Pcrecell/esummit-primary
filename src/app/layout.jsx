import "../app/globals.css";
import PageTransition from "@/components/shared/PageTransition";
import EsummitNavbar from "@/components/ui/esummit-navbar/EsummitNavbar";
import Footer from "@/components/ui/esummit-footer/Footer";
import { Analytics } from "@vercel/analytics/next"
import Head from "next/head";

export const metadata = {
  title: 'E-Summit 2025 | KIIT E-Cell',
  description: 'Official website of E-Summit 2025 Powered By KIIT E-Cell',
  keywords: 'E-Summit, 2025, KIIT, E-Cell, Entrepreneurship, Innovation, Startup, Business',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="color-scheme" content="light dark" />
      </Head>
      <body className="bg-black text-white overflow-x-hidden">
        <Analytics/>
        <EsummitNavbar />
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
      </body>
    </html>
  )
}
