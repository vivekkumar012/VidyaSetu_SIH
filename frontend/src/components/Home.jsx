import { useState } from "react";
import {
  Menu,
  X,
  Play,
  Users,
  Wifi,
  Download,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import logoImage from "../assets/vsSih logo.jpg";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
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
                href="#home"
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
                href="#about"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
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
                  href="#home"
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
                  href="#about"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  About
                </a>
                <a
                  href="#contact"
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

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Empowering Rural Minds with
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                Digital Education{" "}
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              VidyaSetu is a next-generation platform that bridges the learning
              gap by delivering high-quality lectures, even in villages with
              limited internet access and basic devices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to={"/register"}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                Start Learning
              </Link>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-2">
                Explore Demo
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tailored for Rural Classrooms
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Technology designed to thrive in low-network areas and entry-level
              smartphones
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Card 1 */}
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-md hover:shadow-xl transition-all">
              <img
                src="https://img.icons8.com/fluency/96/wifi.png"
                alt="Data Smart"
                className="w-20 h-20 mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Data-Smart Streaming
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Crystal-clear audio and lightweight visuals that work seamlessly
                on weak internet.
              </p>
            </div>

            {/* Card 2 */}
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 shadow-md hover:shadow-xl transition-all">
              <img
                src="https://img.icons8.com/fluency/96/classroom.png"
                alt="Classroom"
                className="w-20 h-20 mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Engaging Classrooms
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Interactive polls, instant quizzes, and open discussions
                accessible on any device.
              </p>
            </div>

            {/* Card 3 */}
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 shadow-md hover:shadow-xl transition-all">
              <img
                src="https://img.icons8.com/fluency/96/download.png"
                alt="Offline Access"
                className="w-20 h-20 mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Anytime Access
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Download compressed lecture recordings to keep learning offline
                during outages.
              </p>
            </div>

            {/* Card 4 */}
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 shadow-md hover:shadow-xl transition-all">
              <img
                src="https://img.icons8.com/fluency/96/teacher.png"
                alt="Experts"
                className="w-20 h-20 mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nationwide Experts
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Learn directly from leading educators in AI, renewable energy,
                VLSI, and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Barriers in Rural Education
              </h2>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <span>
                    Shortage of qualified lecturers in specialized subjects
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <span>
                    Students forced to migrate for advanced learning
                    opportunities
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <span>Unreliable internet prevents smooth video classes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                  <span>
                    Most platforms demand costly devices and high-speed
                    connections
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Our Breakthrough</h3>
              <p className="text-lg leading-relaxed mb-6">
                VidyaSetu delivers a resilient learning ecosystem that adapts to
                rural constraints, focusing on audio-first communication,
                efficient content compression, and smooth fallback for weak
                connections.
              </p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Discover More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 rounded-lg">
                  <img src={logoImage} className="h-12 w-12 bg-black" />
                </div>
                <span className="text-2xl font-bold">VidyaSetu</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md text-xl">
                A digital bridge uniting rural students with world-class
                educators through technology built for inclusivity and
                accessibility.
              </p>
              <p className="text-sm text-gray-400">
                © 2025 VidyaSetu. Empowering the next billion learners.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-xl">
                <li>
                  <a
                    href="#home"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="space-y-2 text-gray-300 text-xl">
                <p>Email: hello@vidyasetu.org</p>
                <p>Phone: +91 8434287510</p>
                <p>Together, we make education borderless.</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              Smart India Hackathon 2025 | Driving Digital Equity in Education
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
