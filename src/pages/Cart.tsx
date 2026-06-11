import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, ArrowLeft, ArrowRight, CheckCircle2, FileText, RefreshCw, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";
import ScrollReveal from "../components/ScrollReveal";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartCount } = useCart();
  const [quotationState, setQuotationState] = useState<"IDLE" | "SENDING" | "SUCCESS">("IDLE");
  const [quoteId, setQuoteId] = useState("");

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleRequestQuote = () => {
    setQuotationState("SENDING");
    setTimeout(() => {
      setQuotationState("SUCCESS");
      setQuoteId(`QT-${Math.floor(100000 + Math.random() * 900000)}`);
      clearCart();
    }, 2000);
  };

  return (
    <div className="gotek-page bg-bg-dark pt-32 pb-24 px-6 md:px-12 font-sans overflow-x-hidden">
      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {quotationState === "SUCCESS" ? (
          /* Quotation success screen */
          <ScrollReveal id="cart-quote-success-reveal">
            <div className="glass-container p-8 md:p-12 text-center flex flex-col items-center gap-6 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent flex items-center justify-center text-accent">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-black uppercase text-zinc-900 tracking-tight leading-none">
                QUOTE REQUEST TRANSMITTED
              </h2>
              <p className="font-mono text-[10px] text-zinc-500 max-w-sm uppercase tracking-wider leading-relaxed">
                SPECIFICATIONS DEPARTED SUCCESSFULLY UNDER SERIAL CODE: <span className="text-accent font-bold">{quoteId}</span>.
                GOTEK ESTIMATE MODULES STARTED SOLVING COST VALUATIONS RIGHT NOW.
              </p>
              
              <div className="p-4 bg-zinc-50 border border-zinc-200 font-mono text-[9px] text-zinc-500 uppercase flex flex-col gap-1 w-full max-w-md text-left">
                <span>• STATUS: QUEUED FOR ANALYSIS</span>
                <span>• SLA DELAY: [04] WORKING HOURS</span>
                <span>• SIGNAL METHOD: VERIFIED EMAIL ENVELOPE</span>
              </div>

              <Link
                to="/products"
                className="mt-4 px-6 py-3.5 bg-accent text-white font-mono text-xs font-bold uppercase tracking-[2px] hover:bg-[#0019bf] transition-colors"
                data-cursor="pointer"
              >
                RETURN TO PRODUCTS
              </Link>
            </div>
          </ScrollReveal>
        ) : cart.length === 0 ? (
          /* EMPTY CART STATE */
          <ScrollReveal id="cart-empty-reveal">
            <div className="glass-container p-12 md:p-20 text-center flex flex-col items-center gap-6 shadow-lg">
              <div className="p-5 bg-zinc-50 border border-zinc-250 text-zinc-400">
                <ShoppingBag className="w-10 h-10 animate-pulse" />
              </div>
              <h2 className="font-display text-2xl font-black uppercase text-zinc-900 tracking-tight">
                SPECIFICATIONS INDEX EMPTY
              </h2>
              <p className="font-space text-sm text-zinc-500 font-light max-w-sm">
                No physical devices or software subscription items are currently loaded into your quotation basket. Explore our lists to draft details.
              </p>
              
              <Link
                to="/products"
                className="mt-4 px-8 py-4 bg-accent hover:bg-[#0019bf] text-white font-mono text-xs font-bold uppercase tracking-[2px] transition-all flex items-center gap-2 rounded-none"
                data-cursor="pointer"
              >
                EXPLORE PRODUCTS
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        ) : (
          /* ACTIVE CART LAYOUT */
          <div className="flex flex-col gap-8 text-left">
            <ScrollReveal id="cart-active-header">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-zinc-200 pb-6 w-full">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] text-accent tracking-[3px] uppercase font-bold">PROCURE MATRIX BASKET</span>
                  <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-zinc-900 tracking-tight leading-none mt-1">
                    YOUR SPECIFICATIONS BUNDLE
                  </h1>
                </div>
                <span className="font-mono text-xs text-zinc-500 uppercase font-bold">
                  [{cartCount} ITEM{cartCount !== 1 ? "S" : ""} SELECTED]
                </span>
              </div>
            </ScrollReveal>

            {/* List stack of cards */}
            <div className="flex flex-col gap-4">
              <AnimatePresence initial={false}>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-container p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-accent/40 hover:shadow-md transition-all rounded-none"
                  >
                    {/* Left details */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="w-16 h-16 w-shrink-0 bg-zinc-50 border border-zinc-200 overflow-hidden relative">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-[8px] bg-zinc-100 text-zinc-550 px-2 py-0.5 border border-zinc-200 w-fit font-bold uppercase tracking-wider mb-1">
                          {item.category}
                        </span>
                        <h4 className="font-display text-sm font-bold text-zinc-900 uppercase tracking-tight">
                          {item.title}
                        </h4>
                        <span className="font-mono text-[9px] text-zinc-400 mt-0.5">
                          SKU: {item.sku} • UNIT: ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Right regulatory adjusters */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-zinc-200">
                      {/* Quantity display */}
                      <div className="flex items-center gap-1 border border-zinc-220 bg-zinc-50 p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 font-mono text-xs font-bold hover:bg-white text-zinc-650 flex items-center justify-center transition-colors"
                          title="Reduce"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-mono text-xs font-bold text-zinc-950">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 font-mono text-xs font-bold hover:bg-white text-zinc-650 flex items-center justify-center transition-colors"
                          title="Increase"
                        >
                          +
                        </button>
                      </div>

                      {/* Total and Trash can */}
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                          <span className="font-mono text-[8px] text-zinc-400 uppercase">SUBTOTAL</span>
                          <span className="font-mono text-sm font-bold text-zinc-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2.5 border border-zinc-200 bg-zinc-50 text-zinc-400 hover:text-red-500 hover:border-red-250 hover:bg-red-50/50 transition-colors"
                          title="Remove item"
                          data-cursor="pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Subtotal metrics and Clear Basket actions */}
            <ScrollReveal direction="none" id="cart-summary-actions">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-zinc-200">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-650 hover:text-zinc-900 font-mono text-[10px] font-bold tracking-widest uppercase transition-colors rounded-none"
                  data-cursor="pointer"
                >
                  CLEAR SPEC BASKET
                </button>
                <div className="flex flex-col items-end w-full sm:w-auto">
                  <span className="font-mono text-[9px] text-zinc-400 uppercase font-bold">ESTIMATED VALUATION DECK METRIC</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-2xl font-black text-zinc-900">
                      ${calculateSubtotal().toFixed(2)}
                    </span>
                    <span className="font-mono text-[11px] text-zinc-405 font-bold uppercase">USD</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* QUOTE ACTION CTA BANNER */}
            <ScrollReveal delay={0.1} id="cart-quote-trigger-reveal">
              <div className="relative overflow-hidden bg-zinc-950 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-accent">
                <div className="absolute inset-0 opacity-5 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle, #0022ff 1px, transparent 1px)`,
                    backgroundSize: "15px 15px"
                  }}
                />
                <div className="relative z-10 text-white flex flex-col gap-1 max-w-sm text-left">
                  <span className="font-mono text-[8px] text-accent tracking-[2px] uppercase font-bold">
                    COMMERCIAL ESTIMATION DEPLOYMENT
                  </span>
                  <h4 className="font-display text-lg md:text-xl font-black uppercase tracking-tight leading-none mt-1">
                    GENERATE BULK PROVISIONAL QUOTE
                  </h4>
                  <p className="font-sans text-[11px] text-zinc-400 leading-normal font-light mt-0.5">
                    Transmitting specifications aggregates volume discounts of 15% to 40% on hardware layers dynamically depending on industrial batch sizes.
                  </p>
                </div>

                <button
                  onClick={handleRequestQuote}
                  disabled={quotationState === "SENDING"}
                  className="relative z-10 px-6 py-4 border border-accent bg-accent text-white hover:bg-zinc-950 hover:text-accent font-mono text-xs font-bold tracking-[2px] uppercase transition-all duration-300 flex items-center gap-3 shrink-0 rounded-none w-full md:w-auto justify-center"
                  data-cursor="pointer"
                >
                  {quotationState === "SENDING" ? "COMPILING SYSTEM LOGS..." : "TRANSMIT SPECIFICATIONS"}
                  <FileText className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </ScrollReveal>

          </div>
        )}

      </div>
    </div>
  );
}
