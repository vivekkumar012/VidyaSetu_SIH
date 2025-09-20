import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/vsSih logo.jpg";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className=" p-2 rounded-lg">
                {/* <BookOpen className="h-6 w-6 text-white" /> */}
                <img src={logoImage} className="h-12 w-12 bg-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                VidyaSetu
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 text-xl">
              <a
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="#features"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Features
              </a>
              <a
                href="/about"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                About
              </a>
              <a
                href="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Contact
              </a>
              <Link
                to={"/register"}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md"
              >
                Join Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href="/"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Home
                </a>
                <a
                  href="#features"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Features
                </a>
                <a
                  href="/about"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  About
                </a>
                <a
                  href="/contact"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Contact
                </a>
                <Link
                  to={"/register"}
                  className="w-full text-left bg-blue-600 text-white px-3 py-2 rounded-lg mt-2"
                >
                  Join Now
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
