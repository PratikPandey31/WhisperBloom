import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaSearch, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const MainLayout = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-['Montserrat'] bg-gradient-to-br from-gray-50 via-blue-50 to-pink-50">
      <header className="sticky top-0 z-20 bg-white/90 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-1 text-2xl font-extrabold tracking-tight">
            <span className="text-indigo-600">Whisper</span>
            <span className="text-pink-500">Bloom</span>
          </NavLink>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `relative text-gray-700 font-medium hover:text-indigo-600 transition px-1 flex items-center` +
                (isActive ? ' after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-1.5 after:bg-gradient-to-r after:from-indigo-500 after:to-pink-500 after:shadow-md after:rounded-full after:transition-all after:duration-300' : '')
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `relative text-gray-700 font-medium hover:text-indigo-600 transition px-1 flex items-center` +
                (isActive ? ' after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-1.5 after:bg-gradient-to-r after:from-indigo-500 after:to-pink-500 after:shadow-md after:rounded-full after:transition-all after:duration-300' : '')
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative text-gray-700 font-medium hover:text-pink-500 transition px-1 flex items-center` +
                (isActive ? ' after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-1.5 after:bg-gradient-to-r after:from-indigo-500 after:to-pink-500 after:shadow-md after:rounded-full after:transition-all after:duration-300' : '')
              }
            >
              <FaShoppingCart className="mr-1" />
              Cart
              <span className="ml-1 bg-pink-500 text-white text-xs rounded-full px-2 py-0.5">2</span>
            </NavLink>
          </nav>
          <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-1 mx-4">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search products…"
              className="bg-transparent outline-none w-32 focus:w-48 transition-all duration-300"
            />
          </div>
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => setNavOpen(v => !v)}
            aria-label="Open navigation menu"
          >
            <FaBars className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        {navOpen && (
          <nav className="md:hidden bg-white border-t border-gray-100 px-4 py-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `relative block py-2 text-gray-700 font-medium hover:text-indigo-600 transition px-1` +
                (isActive ? ' after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-1.5 after:bg-gradient-to-r after:from-indigo-500 after:to-pink-500 after:shadow-md after:rounded-full after:transition-all after:duration-300' : '')
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `relative block py-2 text-gray-700 font-medium hover:text-indigo-600 transition px-1` +
                (isActive ? ' after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-1.5 after:bg-gradient-to-r after:from-indigo-500 after:to-pink-500 after:shadow-md after:rounded-full after:transition-all after:duration-300' : '')
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative py-2 text-gray-700 font-medium hover:text-pink-500 transition px-1 flex items-center` +
                (isActive ? ' after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-1.5 after:bg-gradient-to-r after:from-indigo-500 after:to-pink-500 after:shadow-md after:rounded-full after:transition-all after:duration-300' : '')
              }
            >
              <FaShoppingCart className="mr-2" /> Cart
              <span className="ml-1 bg-pink-500 text-white text-xs rounded-full px-2 py-0.5">2</span>
            </NavLink>
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 mt-2">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search products…"
                className="bg-transparent outline-none w-full"
              />
            </div>
          </nav>
        )}
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-gradient-to-r from-indigo-50 via-pink-50 to-yellow-50 border-t border-gray-200 shadow-inner mt-8">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-1 text-2xl font-extrabold tracking-tight mb-2">
              <span className="text-indigo-600">Whisper</span>
              <span className="text-pink-500">Bloom</span>
            </div>
            <span className="text-gray-500 text-sm">Fashion for Everyone</span>
            <span className="text-gray-400 text-xs mt-2">&copy; {new Date().getFullYear()} WhisperBloom. All rights reserved.</span>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-4 mb-2">
              <a href="/products" className="text-gray-600 hover:text-indigo-500 font-medium transition">Products</a>
              <a href="/cart" className="text-gray-600 hover:text-pink-500 font-medium transition">Cart</a>
              <a href="/dashboard" className="text-gray-600 hover:text-indigo-500 font-medium transition">Dashboard</a>
            </div>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/pratik-pandey-6628482b5/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-pink-500 transition text-xl"><FaInstagram /></a>
              <a href="https://www.linkedin.com/in/pratik-pandey-6628482b5/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-indigo-500 transition text-xl"><FaTwitter /></a>
              <a href="https://www.linkedin.com/in/pratik-pandey-6628482b5/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-blue-600 transition text-xl"><FaFacebook /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 