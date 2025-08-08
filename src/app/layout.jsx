import "../app/globals.css";
import PageTransition from "@/components/shared/PageTransition";
import EsummitNavbar from "@/components/ui/esummit-navbar/EsummitNavbar";
import Footer from "@/components/ui/esummit-footer/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-x-hidden">
        <EsummitNavbar />
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
      </body>
    </html>
  )
}
