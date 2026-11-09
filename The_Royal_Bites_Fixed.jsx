import React, { useEffect, useMemo, useState } from "react";
import {
  ShoppingBag, Menu as MenuIcon, X, Search, ChevronRight, Star, Clock,
  MapPin, Phone, MessageSquare, Plus, Minus, Trash2, ShieldCheck, Sparkles,
  Utensils, Info, ArrowRight, Send, Eye, Award, Flame, CheckCircle
} from "lucide-react";

// THE ROYAL BITES — portfolio/demo restaurant website
// Replace demo business details, menu, prices, images and claims before using for a real client.
const WHATSAPP_NUMBER = "916205844811"; // Country code + number, no + sign
const RESTAURANT_NAME = "THE ROYAL BITES";
const DELIVERY_FEE = 50;

const MENU_CATEGORIES = [
  "All Items", "Starters", "Indian", "Chinese", "Pizza", "Burgers", "Desserts", "Beverages"
];

const MENU_ITEMS = [
  { id:"rb-1", name:"Saffron Royal Biryani", category:"Indian", price:499, isVeg:false, isBestseller:true, rating:4.9, reviewsCount:128, image:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800", description:"Fragrant basmati rice layered with tender marinated lamb and aromatic royal spices." },
  { id:"rb-2", name:"Truffle & Butter Shahi Paneer", category:"Indian", price:399, isVeg:true, isBestseller:true, rating:4.8, reviewsCount:95, image:"https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800", description:"Cottage cheese in a rich cashew and tomato gravy with aromatic cardamom." },
  { id:"rb-3", name:"Gold Leaf Galouti Kebab", category:"Starters", price:450, isVeg:false, isBestseller:false, rating:4.9, reviewsCount:84, image:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800", description:"Soft, delicately spiced kebabs served with handcrafted mini parathas." },
  { id:"rb-4", name:"Crispy Truffle Loaded Fries", category:"Starters", price:280, isVeg:true, isBestseller:false, rating:4.6, reviewsCount:62, image:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800", description:"Crispy potato fries with a parmesan-style seasoning and garlic herb dip." },
  { id:"rb-5", name:"Black Truffle Crown Pizza", category:"Pizza", price:649, isVeg:true, isBestseller:true, rating:4.9, reviewsCount:142, image:"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800", description:"Artisan-style pizza with mozzarella, mushrooms and a rich truffle-inspired finish." },
  { id:"rb-6", name:"Royal Smash Burger", category:"Burgers", price:520, isVeg:false, isBestseller:false, rating:4.7, reviewsCount:78, image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800", description:"Grilled beef-style patty, smoked cheddar, caramelized onions and a toasted bun." },
  { id:"rb-7", name:"Schezwan Dragon Dumplings", category:"Chinese", price:320, isVeg:true, isBestseller:false, rating:4.5, reviewsCount:54, image:"https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=800", description:"Handmade dumplings filled with vegetables and served with chilli garlic dip." },
  { id:"rb-8", name:"Imperial Peking Duck Roll", category:"Chinese", price:480, isVeg:false, isBestseller:true, rating:4.8, reviewsCount:88, image:"https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=800", description:"Crispy-style rolls with fresh cucumber and a sweet plum-inspired sauce." },
  { id:"rb-9", name:"24K Gold Saffron Phirni", category:"Desserts", price:299, isVeg:true, isBestseller:true, rating:5.0, reviewsCount:160, image:"https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800", description:"Traditional creamy rice pudding with cardamom, saffron and pistachios." },
  { id:"rb-10", name:"Molten Belgian Chocolate Sphere", category:"Desserts", price:349, isVeg:true, isBestseller:false, rating:4.9, reviewsCount:110, image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800", description:"A rich chocolate dessert with a smooth vanilla-inspired centre." },
  { id:"rb-11", name:"Royal Elixir Gold Mocktail", category:"Beverages", price:249, isVeg:true, isBestseller:false, rating:4.7, reviewsCount:43, image:"https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800", description:"A sparkling fruit mocktail with mint and fresh lime." },
  { id:"rb-12", name:"Smoked Kashmiri Kahwa Tea", category:"Beverages", price:180, isVeg:true, isBestseller:false, rating:4.8, reviewsCount:51, image:"https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800", description:"Green tea brewed with saffron, cinnamon and crushed almonds." },
  { id:"rb-13", name:"Classic Iced Beverage", category:"Beverages", price:120, isVeg:true, isBestseller:false, rating:4.5, reviewsCount:20, image:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800", description:"A chilled house beverage. Select your preferred flavour when ordering." },
  { id:"rb-14", name:"Jasmine Iced Tea", category:"Beverages", price:150, isVeg:true, isBestseller:false, rating:4.6, reviewsCount:24, image:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800", description:"Refreshing iced tea with a delicate jasmine aroma." }
];

const SPECIAL_OFFERS = [
  { id:"off-1", title:"The Emperor's Feast Box", tag:"LIMITED TIME DEAL", discount:"SAVE ₹350", originalPrice:1549, offerPrice:1199, image:"https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800", description:"Saffron Royal Biryani + Gold Leaf Galouti Kebab + 24K Saffron Phirni + 2 Royal Elixirs.", itemsToAdd:["rb-1","rb-3","rb-9","rb-11","rb-11"] },
  { id:"off-2", title:"Royal Gourmet Pizza Combo", tag:"WEEKEND SPECIAL", discount:"SAVE ₹200", originalPrice:929, offerPrice:729, image:"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800", description:"1 Black Truffle Crown Pizza + 1 Truffle Loaded Fries + 2 Cold Beverages.", itemsToAdd:["rb-5","rb-4","rb-13","rb-13"] },
  { id:"off-3", title:"Imperial Pan-Asian Platter", tag:"CHEF RECOMMENDATION", discount:"20% OFF", originalPrice:800, offerPrice:640, image:"https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800", description:"Imperial Peking Duck Roll + Schezwan Dragon Dumplings + Jasmine Iced Tea.", itemsToAdd:["rb-8","rb-7","rb-14"] }
];

const GALLERY_IMAGES = [
  { id:1, title:"Luxurious Interior Dining Hall", category:"Ambiance", image:"https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800" },
  { id:2, title:"Chef at Work", category:"Kitchen", image:"https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800" },
  { id:3, title:"Signature Kebabs", category:"Food", image:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800" },
  { id:4, title:"Private Dining Lounge", category:"Ambiance", image:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800" },
  { id:5, title:"Handcrafted Mocktail", category:"Beverages", image:"https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800" },
  { id:6, title:"Signature Dessert", category:"Food", image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800" }
];

// Sample testimonials for portfolio preview only. Replace with verified customer reviews.
const TESTIMONIALS = [
  { id:1, name:"Rajesh M.", role:"Sample customer review", rating:5, comment:"The menu presentation and ordering experience feel premium. This is sample portfolio content, not a verified review.", avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" },
  { id:2, name:"Priya S.", role:"Sample customer review", rating:5, comment:"The WhatsApp ordering flow is simple and convenient. Replace this sample with a real customer review before launch.", avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" },
  { id:3, name:"Vikram M.", role:"Sample customer review", rating:5, comment:"A clean, modern restaurant website concept with a stylish menu and gallery. Sample portfolio content.", avatar:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" }
];

const money = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;
const makeWhatsAppUrl = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

function readSavedCart() {
  try {
    const saved = JSON.parse(localStorage.getItem("royal_bites_cart") || "[]");
    if (!Array.isArray(saved)) return [];
    return saved.filter(item =>
      item && typeof item.id === "string" &&
      Number.isFinite(Number(item.price)) &&
      Number.isFinite(Number(item.quantity)) &&
      Number(item.quantity) > 0
    );
  } catch {
    return [];
  }
}

export default function App() {
  const [cart, setCart] = useState(readSavedCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxImg, setLightboxImg] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [contactData, setContactData] = useState({ name:"", email:"", message:"" });
  const [checkoutData, setCheckoutData] = useState({
    name:"", phone:"", address:"", locality:"", landmark:"", instructions:""
  });

  useEffect(() => {
    try { localStorage.setItem("royal_bites_cart", JSON.stringify(cart)); }
    catch (error) { console.warn("Could not save cart in this browser.", error); }
  }, [cart]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedFood(null);
        setLightboxImg(null);
        setIsCheckoutOpen(false);
        setIsCartOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (isCartOpen || isCheckoutOpen || selectedFood || lightboxImg) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen, isCheckoutOpen, selectedFood, lightboxImg]);

  const showToast = (message) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 2800);
  };

  const cartItemCount = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0), [cart]
  );
  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0), [cart]
  );
  const grandTotal = subtotal > 0 ? subtotal + DELIVERY_FEE : 0;

  const addToCart = (item, quantity = 1, instructions = "") => {
    setCart(previous => {
      const key = item.id;
      const existing = previous.findIndex(row =>
        row.id === key && (row.instructions || "") === instructions
      );
      if (existing >= 0) {
        return previous.map((row, index) =>
          index === existing ? { ...row, quantity: row.quantity + quantity } : row
        );
      }
      return [...previous, { ...item, quantity, instructions }];
    });
    showToast(`${item.name} added to cart`);
  };

  const addOfferToCart = (offer) => {
    const bundle = {
      id: offer.id,
      name: offer.title,
      price: offer.offerPrice,
      image: offer.image,
      isBundle: true,
      bundleItems: offer.itemsToAdd.map(id => MENU_ITEMS.find(item => item.id === id)).filter(Boolean)
    };
    addToCart(bundle);
  };

  const updateQuantity = (id, instructions, change) => {
    setCart(previous => previous
      .map(item => {
        if (item.id !== id || (item.instructions || "") !== (instructions || "")) return item;
        return { ...item, quantity: item.quantity + change };
      })
      .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id, instructions) => {
    setCart(previous => previous.filter(item =>
      !(item.id === id && (item.instructions || "") === (instructions || ""))
    ));
    showToast("Item removed from cart");
  };

  const filteredMenu = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return MENU_ITEMS.filter(item => {
      const categoryMatch = selectedCategory === "All Items" || item.category === selectedCategory;
      const searchMatch = !query || `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(query);
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCheckoutSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    if (!checkoutData.name.trim()) errors.name = "Please enter your name.";
    if (!/^[6-9]\d{9}$/.test(checkoutData.phone.replace(/\D/g, ""))) errors.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!checkoutData.address.trim()) errors.address = "Please enter your street/house address.";
    if (!checkoutData.locality.trim()) errors.locality = "Please enter your area or city.";
    if (cart.length === 0) errors.cart = "Your cart is empty.";
    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    let message = `👑 *NEW ORDER — ${RESTAURANT_NAME}* 👑\n\n`;
    message += `*Customer Details*\nName: ${checkoutData.name.trim()}\nCustomer Mobile: ${checkoutData.phone.trim()}\n`;
    message += `Address: ${checkoutData.address.trim()}, ${checkoutData.locality.trim()}\n`;
    if (checkoutData.landmark.trim()) message += `Landmark: ${checkoutData.landmark.trim()}\n`;
    message += `\n*Order Summary*\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} × ${item.quantity} = ${money(item.price * item.quantity)}\n`;
      if (item.isBundle && item.bundleItems?.length) {
        message += `   Combo includes: ${item.bundleItems.map(food => food.name).join(", ")}\n`;
      }
      if (item.instructions) message += `   Note: ${item.instructions}\n`;
    });
    message += `\nSubtotal: ${money(subtotal)}\nDelivery fee: ${money(DELIVERY_FEE)}\n*Grand total: ${money(grandTotal)}*\n`;
    if (checkoutData.instructions.trim()) message += `\nOrder notes: ${checkoutData.instructions.trim()}\n`;
    message += `\nPlease confirm availability, delivery fee and estimated delivery time.`;
    window.location.href = makeWhatsAppUrl(message);
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    if (!contactData.name.trim() || !contactData.email.trim() || !contactData.message.trim()) {
      showToast("Please complete all contact fields.");
      return;
    }
    const message = `Hello ${RESTAURANT_NAME}, I have an enquiry.\n\nName: ${contactData.name.trim()}\nEmail: ${contactData.email.trim()}\nMessage: ${contactData.message.trim()}`;
    window.open(makeWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    showToast("WhatsApp opened. Press Send there to submit your enquiry.");
  };

  const navLinks = ["Home", "Offers", "Menu", "About", "Gallery", "Testimonials", "Contact"];

  return (
    <div className="min-h-screen bg-[#090909] text-white font-sans selection:bg-[#D6AD58] selection:text-black">
      {toastMessage && (
        <div role="status" aria-live="polite" className="fixed top-20 right-4 z-[80] max-w-[calc(100%-2rem)] bg-[#151515] border border-[#D6AD58]/50 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-[#D6AD58] shrink-0" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-[#090909]/95 border-b border-[#D6AD58]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-20 flex items-center justify-between gap-3">
          <a href="#home" className="flex items-center gap-2 min-w-0">
            <div className="w-10 h-10 shrink-0 rounded-full border border-[#D6AD58] flex items-center justify-center bg-[#151515]">
              <Utensils className="w-5 h-5 text-[#D6AD58]" />
            </div>
            <div className="min-w-0">
              <span className="block text-base sm:text-xl font-bold tracking-widest text-[#E8C77E] whitespace-nowrap">THE ROYAL BITES</span>
              <span className="block text-[9px] tracking-widest text-[#B8B8B8] uppercase">Fine Dining & Culinary Art</span>
            </div>
          </a>
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navLinks.map(link => <a key={link} href={`#${link.toLowerCase()}`} className="text-[#B8B8B8] hover:text-[#D6AD58] transition-colors">{link}</a>)}
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={() => setIsCartOpen(true)} className="relative p-2.5 rounded-full bg-[#151515] border border-[#D6AD58]/30 text-[#E8C77E]" aria-label="Open shopping cart">
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && <span className="absolute -top-1 -right-1 bg-[#E8C77E] text-black font-bold text-xs min-w-5 h-5 px-1 rounded-full flex items-center justify-center">{cartItemCount}</span>}
            </button>
            <a href="#menu" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D6AD58] to-[#E8C77E] text-black font-semibold text-sm">Order Now <ChevronRight className="w-4 h-4" /></a>
            <button onClick={() => setMobileMenuOpen(value => !value)} className="lg:hidden p-2 rounded-lg bg-[#151515] text-[#D6AD58] border border-[#D6AD58]/20" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && <div className="lg:hidden bg-[#090909] border-t border-[#D6AD58]/20 px-6 py-5 space-y-3">
          {navLinks.map(link => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="block text-base text-[#B8B8B8] hover:text-[#D6AD58] py-1">{link}</a>)}
          <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="block text-center py-3 rounded-xl bg-[#D6AD58] text-black font-bold text-sm">Explore Royal Menu</a>
        </div>}
      </nav>

      {/* Hero */}
      <section id="home" className="relative min-h-[78vh] flex items-center justify-center py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1920" alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/70 to-[#090909]/80" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-7">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151515] border border-[#D6AD58]/40 text-[#E8C77E] text-xs font-semibold tracking-wider uppercase"><Sparkles className="w-4 h-4" /> Authentic Flavours & Royal Culinary Heritage</div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">Where Every Bite Feels <span className="text-[#E8C77E]">Truly Royal</span></h1>
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#B8B8B8] leading-relaxed">Discover signature dishes, handcrafted flavours and a convenient direct ordering experience from our royal kitchen to your table.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <a href="#menu" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#D6AD58] to-[#E8C77E] text-black font-bold flex items-center justify-center gap-2">Explore Royal Menu <ArrowRight className="w-5 h-5" /></a>
            <a href="#offers" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#151515] border border-[#D6AD58]/40 text-[#E8C77E] font-semibold flex items-center justify-center gap-2"><Flame className="w-5 h-5" /> Special Combo Offers</a>
          </div>
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[{icon:ShieldCheck,text:"Hygiene Focused"},{icon:Clock,text:"Timely Delivery"},{icon:Award,text:"Chef Specials"},{icon:Sparkles,text:"Fresh Ingredients"}].map((item,index) => <div key={index} className="p-3 rounded-xl bg-[#151515]/85 border border-[#D6AD58]/20 flex items-center gap-2 text-xs text-[#B8B8B8] justify-center"><item.icon className="w-4 h-4 text-[#D6AD58] shrink-0" /><span>{item.text}</span></div>)}
          </div>
        </div>
      </section>

      {/* Offers */}
      <section id="offers" className="py-20 bg-[#151515]/50 border-y border-[#D6AD58]/10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-3"><span className="text-xs font-bold text-[#D6AD58] tracking-widest">EXCLUSIVE DEALS</span><h2 className="text-3xl sm:text-4xl font-bold">Curated Royal Combos</h2><p className="text-sm text-[#B8B8B8]">Choose a combo and add the complete offer to your cart.</p></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SPECIAL_OFFERS.map(offer => <article key={offer.id} className="bg-[#090909] rounded-2xl border border-[#D6AD58]/30 overflow-hidden flex flex-col shadow-xl">
              <div className="relative h-48"><img src={offer.image} alt={offer.title} className="w-full h-full object-cover" /><span className="absolute top-4 left-4 bg-[#E8C77E] text-black text-xs font-bold px-3 py-1.5 rounded-full">{offer.discount}</span><span className="absolute top-4 right-4 bg-black/80 text-[#E8C77E] text-[10px] font-bold px-3 py-1 rounded-full">{offer.tag}</span></div>
              <div className="p-6 flex-1 space-y-3"><h3 className="text-xl font-bold">{offer.title}</h3><p className="text-sm text-[#B8B8B8]">{offer.description}</p><p className="text-xs text-[#D6AD58]">Includes: {offer.itemsToAdd.map(id => MENU_ITEMS.find(item => item.id === id)?.name).filter(Boolean).join(" • ")}</p></div>
              <div className="p-6 pt-0 flex items-center justify-between gap-3"><div><span className="text-xs text-[#B8B8B8] line-through mr-2">{money(offer.originalPrice)}</span><span className="text-2xl font-extrabold text-[#D6AD58]">{money(offer.offerPrice)}</span></div><button onClick={() => addOfferToCart(offer)} className="px-4 py-2.5 rounded-xl bg-[#D6AD58] text-black text-sm font-bold flex items-center gap-1"><Plus className="w-4 h-4" /> Add Offer</button></div>
            </article>)}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-10"><span className="text-xs font-bold text-[#D6AD58] tracking-widest">ROYAL DISHES</span><h2 className="text-3xl sm:text-5xl font-bold">Explore Our Fine Menu</h2><p className="text-[#B8B8B8] text-sm max-w-xl mx-auto">Browse our sample menu, search dishes and add your favourites to the cart.</p></div>
        <div className="space-y-6 mb-12">
          <div className="max-w-md mx-auto relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D6AD58]" /><input type="search" placeholder="Search biryani, truffle, pizza..." value={searchQuery} onChange={event => setSearchQuery(event.target.value)} className="w-full pl-12 pr-4 py-3.5 rounded-full bg-[#151515] border border-[#D6AD58]/30 text-white placeholder-[#888] focus:outline-none focus:border-[#D6AD58]" />{searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#B8B8B8]">Clear</button>}</div>
          <div className="flex gap-2 overflow-x-auto pb-3 md:justify-center">{MENU_CATEGORIES.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap border ${selectedCategory === category ? "bg-[#D6AD58] text-black border-[#D6AD58]" : "bg-[#151515] text-[#B8B8B8] border-[#D6AD58]/20"}`}>{category}</button>)}</div>
        </div>
        {filteredMenu.length === 0 ? <div className="text-center py-16 bg-[#151515]/30 rounded-2xl border border-dashed border-[#D6AD58]/20"><Utensils className="w-12 h-12 text-[#D6AD58]/50 mx-auto mb-3" /><h3 className="text-lg font-bold">No dishes found</h3><p className="text-sm text-[#B8B8B8] mt-1">Try another search or category.</p><button onClick={() => {setSelectedCategory("All Items");setSearchQuery("");}} className="mt-4 px-4 py-2 rounded-lg bg-[#D6AD58] text-black font-semibold text-xs">Reset Filters</button></div> :
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenu.map(dish => <article key={dish.id} className="bg-[#151515] rounded-2xl border border-[#D6AD58]/20 overflow-hidden flex flex-col shadow-xl">
              <button onClick={() => setSelectedFood(dish)} className="relative h-52 overflow-hidden text-left"><img src={dish.image} alt={dish.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /><span className={`absolute top-3 left-3 px-2 py-1 rounded bg-black/80 text-xs ${dish.isVeg ? "text-green-400" : "text-red-400"}`}>{dish.isVeg ? "VEG" : "NON-VEG"}</span>{dish.isBestseller && <span className="absolute top-3 right-3 px-2 py-1 rounded bg-[#D6AD58] text-black text-[10px] font-bold">BESTSELLER</span>}<span className="absolute bottom-3 right-3 p-2 rounded-full bg-black/80 text-[#E8C77E]"><Eye className="w-4 h-4" /></span></button>
              <div className="p-5 flex-1 space-y-2"><div className="flex justify-between gap-2"><span className="text-[11px] font-semibold text-[#D6AD58] uppercase">{dish.category}</span><span className="flex items-center gap-1 text-xs text-[#E8C77E]"><Star className="w-3.5 h-3.5 fill-[#D6AD58]" />{dish.rating} <span className="text-[#B8B8B8]">({dish.reviewsCount})</span></span></div><button onClick={() => setSelectedFood(dish)} className="text-left text-lg font-bold hover:text-[#E8C77E]">{dish.name}</button><p className="text-xs text-[#B8B8B8] leading-relaxed">{dish.description}</p></div>
              <div className="p-5 pt-0 flex items-center justify-between"><span className="text-xl font-extrabold text-[#D6AD58]">{money(dish.price)}</span><button onClick={() => addToCart(dish)} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D6AD58] to-[#E8C77E] text-black font-bold text-xs flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add To Cart</button></div>
            </article>)}
          </div>}
      </section>

      {/* Dish detail modal */}
      {selectedFood && <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/85" onMouseDown={event => {if(event.target === event.currentTarget) setSelectedFood(null);}}>
        <div role="dialog" aria-modal="true" aria-label={`${selectedFood.name} details`} className="bg-[#151515] border border-[#D6AD58]/40 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
          <button onClick={() => setSelectedFood(null)} className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/70"><X className="w-5 h-5" /></button>
          <img src={selectedFood.image} alt={selectedFood.name} className="h-60 w-full object-cover" />
          <div className="p-6 space-y-4"><div className="flex justify-between text-xs"><span className={selectedFood.isVeg ? "text-green-400" : "text-red-400"}>{selectedFood.isVeg ? "VEGETARIAN" : "NON-VEGETARIAN"}</span><span className="text-[#E8C77E]"><Star className="w-4 h-4 inline fill-[#D6AD58]" /> {selectedFood.rating} ({selectedFood.reviewsCount} reviews)</span></div><h3 className="text-2xl font-bold">{selectedFood.name}</h3><p className="text-sm text-[#B8B8B8]">{selectedFood.description}</p><label className="block text-xs font-semibold text-[#D6AD58]">Special instructions (optional)<input id="dish-instructions" type="text" placeholder="Extra spicy, less oil..." className="mt-2 w-full px-4 py-3 rounded-xl bg-[#090909] border border-[#D6AD58]/30 text-white focus:outline-none focus:border-[#D6AD58]" /></label><div className="flex items-center justify-between border-t border-[#D6AD58]/20 pt-4"><span className="text-2xl font-extrabold text-[#D6AD58]">{money(selectedFood.price)}</span><button onClick={() => {const note = document.getElementById("dish-instructions")?.value || "";addToCart(selectedFood,1,note);setSelectedFood(null);}} className="px-5 py-3 rounded-xl bg-[#D6AD58] text-black font-bold text-sm flex items-center gap-2"><ShoppingBag className="w-4 h-4" /> Add To Order</button></div></div>
        </div>
      </div>}

      {/* Cart drawer */}
      {isCartOpen && <div className="fixed inset-0 z-[60] bg-black/75" onMouseDown={event => {if(event.target === event.currentTarget) setIsCartOpen(false);}}>
        <aside role="dialog" aria-modal="true" aria-label="Shopping cart" className="absolute right-0 top-0 h-full w-full max-w-md bg-[#151515] border-l border-[#D6AD58]/30 flex flex-col shadow-2xl">
          <div className="p-5 border-b border-[#D6AD58]/20 flex items-center justify-between"><div><h2 className="text-lg font-bold">Your Royal Cart</h2><p className="text-xs text-[#B8B8B8]">{cartItemCount} item(s)</p></div><button onClick={() => setIsCartOpen(false)} aria-label="Close cart" className="p-2 rounded-full hover:bg-[#090909]"><X /></button></div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? <div className="text-center py-20 space-y-4"><ShoppingBag className="w-12 h-12 text-[#D6AD58]/60 mx-auto" /><h3 className="font-bold">Your cart is empty</h3><p className="text-xs text-[#B8B8B8]">Explore the menu and add your favourite dishes.</p><button onClick={() => setIsCartOpen(false)} className="px-5 py-2 rounded-full bg-[#D6AD58] text-black text-xs font-bold">Browse Menu</button></div> :
              cart.map((item,index) => <div key={`${item.id}-${item.instructions || ""}-${index}`} className="flex gap-3 py-3 border-b border-[#D6AD58]/10"><img src={item.image} alt="" className="w-16 h-16 rounded-xl object-cover" /><div className="flex-1 min-w-0"><h4 className="text-sm font-bold">{item.name}</h4>{item.isBundle && <p className="text-[10px] text-[#D6AD58]">Combo: {item.bundleItems?.map(food=>food.name).join(", ")}</p>}{item.instructions && <p className="text-[10px] text-[#E8C77E]">Note: {item.instructions}</p>}<p className="text-xs font-bold text-[#D6AD58] mt-1">{money(item.price * item.quantity)}</p><div className="flex items-center gap-3 mt-2"><button onClick={() => updateQuantity(item.id,item.instructions,-1)} aria-label={`Decrease ${item.name}`} className="p-1 rounded bg-[#090909] border border-[#D6AD58]/20"><Minus className="w-3 h-3" /></button><span className="text-xs font-bold">{item.quantity}</span><button onClick={() => updateQuantity(item.id,item.instructions,1)} aria-label={`Increase ${item.name}`} className="p-1 rounded bg-[#090909] border border-[#D6AD58]/20"><Plus className="w-3 h-3" /></button></div></div><button onClick={() => removeFromCart(item.id,item.instructions)} aria-label={`Remove ${item.name}`} className="p-2 text-[#B8B8B8] hover:text-red-400"><Trash2 className="w-4 h-4" /></button></div>)}
          </div>
          {cart.length > 0 && <div className="p-5 bg-[#090909] border-t border-[#D6AD58]/20 space-y-3 text-sm"><div className="flex justify-between text-[#B8B8B8]"><span>Subtotal</span><span>{money(subtotal)}</span></div><div className="flex justify-between text-[#B8B8B8]"><span>Delivery fee</span><span>{money(DELIVERY_FEE)}</span></div><div className="flex justify-between text-base font-bold border-t border-[#D6AD58]/20 pt-3"><span>Total</span><span className="text-[#D6AD58]">{money(grandTotal)}</span></div><button onClick={() => {setIsCartOpen(false);setIsCheckoutOpen(true);}} className="w-full py-3.5 rounded-xl bg-[#D6AD58] text-black font-bold flex items-center justify-center gap-2">Proceed to Checkout <ArrowRight className="w-4 h-4" /></button></div>}
        </aside>
      </div>}

      {/* Checkout */}
      {isCheckoutOpen && <div className="fixed inset-0 z-[70] bg-black/85 overflow-y-auto p-3 sm:p-6 flex items-start sm:items-center justify-center" onMouseDown={event => {if(event.target === event.currentTarget) setIsCheckoutOpen(false);}}>
        <div role="dialog" aria-modal="true" aria-label="Checkout details" className="relative my-4 bg-[#151515] border border-[#D6AD58]/40 rounded-3xl max-w-2xl w-full p-5 sm:p-8">
          <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-4 right-4 p-2 rounded-full bg-[#090909]" aria-label="Close checkout"><X className="w-5 h-5" /></button>
          <div className="border-b border-[#D6AD58]/20 pb-4 mb-5"><span className="text-xs font-bold text-[#D6AD58]">FINAL CONFIRMATION</span><h2 className="text-2xl font-bold mt-1">Delivery Details & WhatsApp Order</h2><p className="text-xs text-[#B8B8B8] mt-2">Your order will open in WhatsApp. Press Send there to submit it.</p></div>
          <form onSubmit={handleCheckoutSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="text-xs text-[#B8B8B8]">Full name *<input value={checkoutData.name} onChange={e=>setCheckoutData({...checkoutData,name:e.target.value})} className="mt-1 w-full px-4 py-3 rounded-xl bg-[#090909] border border-[#D6AD58]/30 text-white text-sm" placeholder="Your name" />{formErrors.name && <span className="block text-red-400 mt-1">{formErrors.name}</span>}</label>
              <label className="text-xs text-[#B8B8B8]">Mobile number *<input type="tel" inputMode="numeric" maxLength={10} value={checkoutData.phone} onChange={e=>setCheckoutData({...checkoutData,phone:e.target.value.replace(/\D/g,"").slice(0,10)})} className="mt-1 w-full px-4 py-3 rounded-xl bg-[#090909] border border-[#D6AD58]/30 text-white text-sm" placeholder="10-digit mobile number" />{formErrors.phone && <span className="block text-red-400 mt-1">{formErrors.phone}</span>}</label>
            </div>
            <label className="block text-xs text-[#B8B8B8]">Street / house address *<input value={checkoutData.address} onChange={e=>setCheckoutData({...checkoutData,address:e.target.value})} className="mt-1 w-full px-4 py-3 rounded-xl bg-[#090909] border border-[#D6AD58]/30 text-white text-sm" placeholder="House, building, street" />{formErrors.address && <span className="block text-red-400 mt-1">{formErrors.address}</span>}</label>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="text-xs text-[#B8B8B8]">Area / city *<input value={checkoutData.locality} onChange={e=>setCheckoutData({...checkoutData,locality:e.target.value})} className="mt-1 w-full px-4 py-3 rounded-xl bg-[#090909] border border-[#D6AD58]/30 text-white text-sm" placeholder="Area and city" />{formErrors.locality && <span className="block text-red-400 mt-1">{formErrors.locality}</span>}</label>
              <label className="text-xs text-[#B8B8B8]">Landmark (optional)<input value={checkoutData.landmark} onChange={e=>setCheckoutData({...checkoutData,landmark:e.target.value})} className="mt-1 w-full px-4 py-3 rounded-xl bg-[#090909] border border-[#D6AD58]/30 text-white text-sm" placeholder="Nearby landmark" /></label>
            </div>
            <label className="block text-xs text-[#B8B8B8]">Order notes (optional)<textarea rows="2" value={checkoutData.instructions} onChange={e=>setCheckoutData({...checkoutData,instructions:e.target.value})} className="mt-1 w-full px-4 py-3 rounded-xl bg-[#090909] border border-[#D6AD58]/30 text-white text-sm" placeholder="Any delivery instructions?" /></label>
            <div className="p-4 rounded-2xl bg-[#090909] border border-[#D6AD58]/20 space-y-2 text-sm"><div className="flex justify-between text-[#B8B8B8]"><span>Items ({cartItemCount})</span><span>{money(subtotal)}</span></div><div className="flex justify-between text-[#B8B8B8]"><span>Delivery</span><span>{money(DELIVERY_FEE)}</span></div><div className="flex justify-between font-bold border-t border-[#D6AD58]/10 pt-2"><span>Total payable</span><span className="text-[#D6AD58]">{money(grandTotal)}</span></div></div>
            {formErrors.cart && <p className="text-red-400 text-xs">{formErrors.cart}</p>}
            <div className="p-3 rounded-xl bg-[#D6AD58]/10 border border-[#D6AD58]/30 text-[#E8C77E] text-xs flex gap-2"><Info className="w-4 h-4 shrink-0" /> WhatsApp will open with your order details. The order is not submitted until you press Send in WhatsApp.</div>
            <button type="submit" disabled={cart.length===0} className="w-full py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50"><MessageSquare className="w-5 h-5" /> Send Order via WhatsApp</button>
          </form>
        </div>
      </div>}

      {/* About */}
      <section id="about" className="py-20 bg-[#151515]/40 border-y border-[#D6AD58]/10 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6"><span className="text-xs font-bold text-[#D6AD58] tracking-widest">OUR STORY</span><h2 className="text-3xl sm:text-5xl font-bold leading-tight">A Celebration of Culinary Craft</h2><p className="text-[#B8B8B8] leading-relaxed text-sm sm:text-base">THE ROYAL BITES is a premium restaurant website concept built to showcase a refined dining experience. Add the restaurant's verified story, chef details, certifications and actual business information here before publishing for a real restaurant.</p><div className="grid grid-cols-2 gap-4"><div className="p-4 rounded-xl bg-[#090909] border border-[#D6AD58]/20"><h4 className="text-2xl font-extrabold text-[#D6AD58]">Premium</h4><p className="text-xs text-[#B8B8B8] mt-1">Visual experience</p></div><div className="p-4 rounded-xl bg-[#090909] border border-[#D6AD58]/20"><h4 className="text-2xl font-extrabold text-[#D6AD58]">Direct</h4><p className="text-xs text-[#B8B8B8] mt-1">WhatsApp ordering</p></div></div></div>
          <div className="grid grid-cols-2 gap-4"><img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=600" alt="Restaurant dining interior" className="rounded-2xl border border-[#D6AD58]/30 object-cover h-64 w-full" /><img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=600" alt="Chef preparing food" className="rounded-2xl border border-[#D6AD58]/30 object-cover h-64 w-full mt-8" /></div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 px-4 max-w-7xl mx-auto"><div className="text-center mb-12 space-y-3"><span className="text-xs font-bold text-[#D6AD58] tracking-widest">VISUAL EXPERIENCE</span><h2 className="text-3xl sm:text-4xl font-bold">The Royal Gallery</h2></div><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">{GALLERY_IMAGES.map(item=><button key={item.id} onClick={()=>setLightboxImg(item.image)} className="group relative h-64 rounded-2xl overflow-hidden border border-[#D6AD58]/20 text-left"><img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" /><div className="absolute bottom-4 left-4"><span className="text-[10px] text-[#D6AD58] font-bold uppercase">{item.category}</span><h4 className="text-sm font-bold">{item.title}</h4></div></button>)}</div></section>

      {/* Gallery lightbox */}
      {lightboxImg && <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/95" onMouseDown={e=>{if(e.target===e.currentTarget)setLightboxImg(null);}}><div className="relative max-w-5xl max-h-[90vh]"><img src={lightboxImg} alt="Enlarged gallery view" className="max-w-full max-h-[85vh] object-contain rounded-xl" /><button onClick={()=>setLightboxImg(null)} aria-label="Close image" className="absolute -top-3 -right-3 p-2 rounded-full bg-[#D6AD58] text-black"><X /></button></div></div>}

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-[#151515]/30 border-t border-[#D6AD58]/10 px-4"><div className="max-w-7xl mx-auto"><div className="text-center mb-12 space-y-3"><span className="text-xs font-bold text-[#D6AD58] tracking-widest">CUSTOMER REVIEWS</span><h2 className="text-3xl sm:text-4xl font-bold">What Guests Say</h2><p className="text-xs text-[#B8B8B8]">Sample testimonials for portfolio preview only.</p></div><div className="grid grid-cols-1 md:grid-cols-3 gap-8">{TESTIMONIALS.map(review=><article key={review.id} className="p-6 rounded-2xl bg-[#090909] border border-[#D6AD58]/20 flex flex-col justify-between gap-4"><div><div className="flex text-[#D6AD58] mb-3">{Array.from({length:review.rating},(_,i)=><Star key={i} className="w-4 h-4 fill-[#D6AD58]" />)}</div><p className="text-xs text-[#B8B8B8] leading-relaxed italic">"{review.comment}"</p></div><div className="flex items-center gap-3 pt-4 border-t border-[#D6AD58]/10"><img src={review.avatar} alt="" className="w-10 h-10 rounded-full object-cover" /><div><h4 className="text-sm font-bold">{review.name}</h4><span className="text-[10px] text-[#D6AD58]">{review.role}</span></div></div></article>)}</div></div></section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4 max-w-7xl mx-auto"><div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6"><span className="text-xs font-bold text-[#D6AD58] tracking-widest">RESERVATIONS & ENQUIRIES</span><h2 className="text-3xl sm:text-4xl font-bold">Get in Touch</h2><p className="text-sm text-[#B8B8B8]">For table bookings, catering or online orders, send an enquiry directly on WhatsApp.</p>
          <div className="space-y-4 text-sm text-[#B8B8B8]">
            <div className="flex items-center gap-3"><div className="p-2.5 rounded-xl bg-[#151515] text-[#D6AD58] border border-[#D6AD58]/30"><MapPin /></div><div><h5 className="text-white font-semibold">Restaurant Location</h5><p className="text-xs">Demo location — replace with the client's verified address.</p></div></div>
            <div className="flex items-center gap-3"><div className="p-2.5 rounded-xl bg-[#151515] text-[#D6AD58] border border-[#D6AD58]/30"><Phone /></div><div><h5 className="text-white font-semibold">WhatsApp / Phone</h5><a href="tel:+916205844811" className="text-xs hover:text-[#D6AD58]">+91 62058 44811</a></div></div>
            <div className="flex items-center gap-3"><div className="p-2.5 rounded-xl bg-[#151515] text-[#D6AD58] border border-[#D6AD58]/30"><Clock /></div><div><h5 className="text-white font-semibold">Opening Hours</h5><p className="text-xs">Demo hours — confirm with the restaurant before launch.</p></div></div>
          </div>
          <a href="https://www.google.com/maps/search/?api=1&query=restaurant" target="_blank" rel="noreferrer" className="h-40 rounded-2xl border border-[#D6AD58]/30 bg-[#151515] flex flex-col items-center justify-center gap-2 text-center"><MapPin className="w-8 h-8 text-[#D6AD58]" /><span className="text-sm font-bold">Open Google Maps</span><span className="text-[10px] text-[#B8B8B8]">Replace this link with the restaurant's exact map location.</span></a>
        </div>
        <div className="bg-[#151515] border border-[#D6AD58]/30 rounded-3xl p-6 sm:p-8 space-y-4"><h3 className="text-xl font-bold">Send Us a Message</h3><p className="text-xs text-[#B8B8B8]">This form prepares an enquiry in WhatsApp; it does not send an email or store submissions.</p>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <label className="block text-xs text-[#B8B8B8]">Your name<input required value={contactData.name} onChange={e=>setContactData({...contactData,name:e.target.value})} className="mt-1 w-full px-4 py-3 rounded-xl bg-[#090909] border border-[#D6AD58]/30 text-white text-sm" /></label>
            <label className="block text-xs text-[#B8B8B8]">Email address<input required type="email" value={contactData.email} onChange={e=>setContactData({...contactData,email:e.target.value})} className="mt-1 w-full px-4 py-3 rounded-xl bg-[#090909] border border-[#D6AD58]/30 text-white text-sm" /></label>
            <label className="block text-xs text-[#B8B8B8]">Message<textarea required rows="4" value={contactData.message} onChange={e=>setContactData({...contactData,message:e.target.value})} className="mt-1 w-full px-4 py-3 rounded-xl bg-[#090909] border border-[#D6AD58]/30 text-white text-sm" /></label>
            <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D6AD58] to-[#E8C77E] text-black font-bold text-sm flex items-center justify-center gap-2"><Send className="w-4 h-4" /> Continue on WhatsApp</button>
          </form>
        </div>
      </div></section>

      {/* Footer */}
      <footer className="bg-[#090909] border-t border-[#D6AD58]/20 pt-16 pb-8 px-4"><div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="space-y-4"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full border border-[#D6AD58] flex items-center justify-center bg-[#151515]"><Utensils className="w-4 h-4 text-[#D6AD58]" /></div><span className="text-lg font-bold text-[#D6AD58]">THE ROYAL BITES</span></div><p className="text-xs text-[#B8B8B8] leading-relaxed">A premium restaurant website concept showcasing a menu, combo offers, gallery and direct WhatsApp ordering.</p></div>
        <div><h4 className="text-sm font-bold mb-3 uppercase tracking-wider">Quick Links</h4><ul className="space-y-2 text-xs text-[#B8B8B8]">{["Home","Offers","Menu","About","Gallery","Testimonials","Contact"].map(link=><li key={link}><a href={`#${link.toLowerCase()}`} className="hover:text-[#D6AD58]">{link}</a></li>)}</ul></div>
        <div><h4 className="text-sm font-bold mb-3 uppercase tracking-wider">Opening Hours</h4><ul className="space-y-2 text-xs text-[#B8B8B8]"><li>Monday – Friday: 11:30 AM – 11:00 PM</li><li>Saturday – Sunday: 11:00 AM – 11:30 PM</li><li className="text-[#D6AD58] pt-1">WhatsApp: +91 62058 44811</li></ul></div>
        <div><h4 className="text-sm font-bold mb-3 uppercase tracking-wider">Direct Order</h4><p className="text-xs text-[#B8B8B8] mb-3">Send your order enquiry directly on WhatsApp.</p><a href={makeWhatsAppUrl("Hello! I would like to enquire about the menu and table booking at The Royal Bites.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white font-bold text-xs"><MessageSquare className="w-4 h-4" /> Order on WhatsApp</a></div>
      </div><div className="max-w-7xl mx-auto pt-6 border-t border-[#D6AD58]/10 text-center text-xs text-[#B8B8B8]"><p>© {new Date().getFullYear()} {RESTAURANT_NAME}. Portfolio demo.</p><p className="text-[10px] text-[#888] mt-2">Demo content only. Verify all business details, prices, claims and customer reviews before commercial use.</p></div></footer>

      {/* Floating WhatsApp */}
      <a href={makeWhatsAppUrl("Hello! I would like to enquire about The Royal Bites.")} target="_blank" rel="noreferrer" aria-label="Chat with The Royal Bites on WhatsApp" className="fixed bottom-5 right-5 z-40 p-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl hover:scale-105 transition-transform"><MessageSquare className="w-6 h-6" /></a>
    </div>
  );
}
