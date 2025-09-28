import React from "react";
import Navbar from "./Navbar";

export default function Contact() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Contact Us
        </h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Have questions, suggestions, or want to collaborate?  
          Get in touch with the <span className="font-semibold">Defender_Warriors</span> team.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">Send a Message</h2>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">Contact Information</h2>
          <ul className="space-y-4 text-gray-700">
            <li>
              📍 <span className="font-semibold">Location:</span> Rajasthan, India
            </li>
            <li>
              📧 <span className="font-semibold">Email:</span> defender_warriors@email.com
            </li>
            <li>
              📞 <span className="font-semibold">Phone:</span> +91 11223 34455
            </li>
          </ul>
          <p className="mt-6 text-gray-600">
            We’ll get back to you within 24–48 hours. Thank you for reaching out!
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto py-6">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p className="text-sm">
            Made with ❤️ by <span className="font-semibold text-indigo-700">Defender_Warriors</span>
          </p>
        </div>
      </footer>
    </div>
    </div>
  );
}

