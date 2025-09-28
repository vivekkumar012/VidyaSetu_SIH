import React from "react";
import { BookOpen, Wifi, FileText, Users, Languages } from "lucide-react";
import Navbar from "./Navbar";

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Remote Classroom for Rural Rajasthan
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Bridging the education gap with low-bandwidth digital classrooms, 
            empowering rural diploma students across Rajasthan.
          </p>
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* About Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">The Problem</h2>
          <p className="text-gray-600 leading-relaxed">
            In many <span className="font-semibold">rural diploma colleges of Rajasthan</span>, 
            subject lecturers for advanced fields like AI, VLSI, and Renewable Energy are missing. 
            Students rely on self-study or must travel long distances to cities, deepening the 
            urban-rural education divide.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">Our Solution</h2>
          <p className="text-gray-600 leading-relaxed">
            <span className="font-semibold">Remote Classroom</span> provides a lightweight, 
            low-bandwidth platform offering live & recorded lectures, offline resources, and 
            interactive sessions with experts, ensuring equal learning opportunities for rural students.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-10">
            Key Features
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <Wifi className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Low-Bandwidth Optimized</h3>
              <p className="text-gray-600 text-sm">
                Smooth video streaming even in low connectivity areas.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <FileText className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Offline Notes</h3>
              <p className="text-gray-600 text-sm">
                Download study material for learning without internet.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <BookOpen className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Interactive Learning</h3>
              <p className="text-gray-600 text-sm">
                Quizzes, assignments & collaborative tools for engagement.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <Users className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Virtual Classrooms</h3>
              <p className="text-gray-600 text-sm">
                Students & teachers connect seamlessly across regions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <Languages className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Local Language Support</h3>
              <p className="text-gray-600 text-sm">
                Easy-to-use interface with multilingual accessibility.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Our Vision</h2>
        <p className="text-gray-700 text-lg leading-relaxed bg-white shadow-md p-6 rounded-2xl">
          Our vision is to empower students in Rajasthan’s rural areas with equal access to 
          quality education, helping them develop skills for the future while staying connected 
          to their roots.
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto py-6">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p className="text-sm">
            Made with ❤️ by <span className="font-semibold text-indigo-700">Defender_Warriors</span>
          </p>
          {/* <div className="flex justify-center gap-6 mt-3 text-sm">
            <a href="#" className="hover:text-indigo-600">Team</a>
            <a href="#" className="hover:text-indigo-600">Contact</a>
            <a href="#" className="hover:text-indigo-600">Support</a>
          </div> */}
        </div>
      </footer>
    </div>
    </div>
  );
}
