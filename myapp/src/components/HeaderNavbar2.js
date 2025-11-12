// Updated HeaderNavbar component
import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderNavbar({ sidebarOpen, setSidebarOpen, adminName }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <div className="font-sans bg-gradient-to-b from-cream to-cream/90">
      <header className="relative bg-brown bg-opacity-90">
        <div className="max-w-7xl mx-auto flex items-center px-6 py-4 md:py-3 space-x-32">
          <img src={Logo} alt="Logo" className="h-28 w-28 md:h-36 md:w-36 rounded-full border-4 border-cream shadow-lg" />
          <h1 className="text-6xl md:text-8xl font-extrabold text-cream tracking-widest">RAKSHAPEETH</h1>
        </div>
      </header>

      <nav className="sticky top-0 w-full bg-brown text-white flex justify-between items-center px-6 py-3 shadow-lg z-50">
        <div className="flex items-center space-x-6">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="flex flex-col justify-center items-center w-10 h-10 space-y-1 rounded-md bg-cream text-brown p-2 hover:scale-110 transition">
            <span className="block w-6 h-0.5 bg-brown"></span>
            <span className="block w-6 h-0.5 bg-brown"></span>
            <span className="block w-6 h-0.5 bg-brown"></span>
          </button>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="font-semibold hover:text-cream-200">Home</Link>
            <Link to="/about" className="font-semibold hover:text-cream-200">About</Link>
            <Link to="/customer-care" className="font-semibold hover:text-cream-200">Customer Care</Link>
            <Link to="/ContactUs" className="font-semibold hover:text-cream-200">Contact Us</Link>
          </div>
        </div>

       

        {/* Avatar modern */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-11 h-11 rounded-full bg-cream text-brown font-bold flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all ring-2 ring-cream/50">
            {adminName?.[0] || "A"}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 bg-white text-black rounded-2xl shadow-2xl w-52 p-3 z-50">
              <div className="text-center font-semibold border-b pb-2">{adminName || "Admin"}</div>
              <button onClick={() => navigate("/settings")} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg mt-2">Settings ⚙️</button>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg">Logout 🚪</button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
