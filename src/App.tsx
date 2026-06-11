import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Page modules
import Home from "./pages/Home";
import About from "./pages/About";
import Manufacturing from "./pages/Manufacturing";
import ITSolutions from "./pages/ITSolutions";
import Products from "./pages/Products";
import Clients from "./pages/Clients";
import Careers from "./pages/Careers";
import CareersApply from "./pages/CareersApply";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";

// Page Scroll-to-Top UX helper
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div 
      id="gotek-systems-root" 
      className="relative w-full min-h-screen bg-[#f7f6f1] overflow-x-hidden text-[#121212] font-sans selection:bg-accent selection:text-white"
    >
      <CartProvider>
        <BrowserRouter>
          {/* Location page transition scroller */}
          <ScrollToTop />

          {/* Persistent Navbar header */}
          <Header />

          {/* Main Content Area */}
          <main id="primary-gotek-main" className="relative z-10 w-full min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/manufacturing" element={<Manufacturing />} />
              <Route path="/it-solutions" element={<ITSolutions />} />
              <Route path="/products" element={<Products />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/careers/apply" element={<CareersApply />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contact" element={<Contact />} />
              {/* Fallback to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          {/* Persistent Footer and connections */}
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}
