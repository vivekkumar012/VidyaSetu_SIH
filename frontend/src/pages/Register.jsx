import React, { useState } from "react";
import frameImg from "../assets/frame.png";
import image from "../assets/signup.webp";
import Navbar from "../components/Navbar";

function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Navbar />
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-gradient-to-r from-blue-100 via-white to-blue-50">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-16">
          {/* Left Form Section */}
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0 bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Join the millions learning to code with{" "}
              <span className="text-blue-600">VidyaSetu</span>
            </h1>
            <p className="mt-2 text-gray-600 text-lg">
              Build skills for today, tomorrow, and beyond.
              <br />
              <span className="italic font-semibold text-blue-500">
                Future-proof your career.
              </span>
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Username */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full mt-1 p-3 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full mt-1 p-3 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full mt-1 p-3 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full mt-1 p-3 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-gray-700 font-medium">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full mt-1 p-3 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-lg px-4 py-3 bg-blue-500 text-white font-semibold text-lg hover:bg-blue-600 transition duration-200 shadow-md"
              >
                Sign Up
              </button>
            </form>
            <span className="block text-center mt-4 text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-500 font-semibold hover:underline"
              >
                Login
              </a>
            </span>
          </div>

          {/* Right Image Section */}
          <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0 mt-8">
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
              className="rounded-xl"
            />
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-6 right-6 z-10 rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
