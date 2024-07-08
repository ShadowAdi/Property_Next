import "@/assets/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { GlobalProvider } from "@/context/GlobalContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'photoswipe/dist/photoswipe.css'

export const metadata = {
  title: "HouseRentals",
  description: "Find Beast House for Rent And Buy",
  keywords: "rentals find home property",
};

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <body className="relative min-h-[100vh] pb-12">
            <Navbar />
            {children}
            <ToastContainer position="top-right" />
            <Footer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default MainLayout;
