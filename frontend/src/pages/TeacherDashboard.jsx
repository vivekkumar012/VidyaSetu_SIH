import React from 'react';
import { Search, Globe, User, Users, FileText, BarChart3, Calendar, Settings, Plus, Mail, Home } from 'lucide-react';
import logoImage from "../assets/vsSih logo.jpg";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-56 bg-indigo-700 text-white">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-indigo-700 font-bold text-xs">
                <img src={logoImage} alt="" />
              </span>
            </div>
            <span className="text-xl font-bold">VidyaSetu</span>
          </div>
        </div>
        
        <nav className="space-y-1">
          <div className="flex items-center px-4 py-3 bg-indigo-800 border-r-2 border-white">
            <Home className="w-4 h-4 mr-3" />
            <span className="text-sm">Dashboard</span>
          </div>
          <div className="flex items-center px-4 py-3 hover:bg-indigo-600">
            <Users className="w-4 h-4 mr-3" />
            <span className="text-sm">Students</span>
          </div>
          <div className="flex items-center px-4 py-3 hover:bg-indigo-600">
            <FileText className="w-4 h-4 mr-3" />
            <span className="text-sm">Assessments</span>
          </div>
          <div className="flex items-center px-4 py-3 hover:bg-indigo-600">
            <FileText className="w-4 h-4 mr-3" />
            <span className="text-sm">Resources</span>
          </div>
          <div className="flex items-center px-4 py-3 hover:bg-indigo-600">
            <Calendar className="w-4 h-4 mr-3" />
            <span className="text-sm">Schedule</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center justify-between border-b">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input className="pl-10 pr-4 py-2 border rounded-lg w-64" placeholder="Search here..." />
            </div>
            <Globe className="w-6 h-6 text-gray-600" />
            <div className="flex items-center space-x-2 bg-purple-100 px-3 py-2 rounded-lg">
              <div className="text-right">
                <div className="text-sm font-medium">Teacher_Name</div>
                <div className="text-xs text-gray-500">Teacher</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">T</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Welcome Card */}
            <div className="col-span-8 bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-6 rounded-2xl relative overflow-hidden">
              <h2 className="text-2xl font-bold mb-2">Welcome back, Name 👋</h2>
              <p className="mb-1">You have 2 new assessments added to your subject.</p>
              <p>Please add questions and submit them.</p>
              
              <div className="absolute right-4 top-4 flex space-x-1">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-8 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <div className={`w-6 h-6 rounded-full ${i % 2 === 0 ? 'bg-blue-300' : i % 3 === 0 ? 'bg-orange-300' : 'bg-red-300'}`}></div>
                  </div>
                ))}
              </div>
              {/* <div className="absolute right-0 top-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div> */}
            </div>

            {/* Today's Schedule */}
            <div className="col-span-4 bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold mb-4">Today's Schedule</h3>
              <div className="space-y-3">
                {[
                  { subject: 'AI', class: 'IT A', time: '7:45-8:35' },
                  { subject: 'VLSI', class: 'IT B', time: '8:35-9:25' },
                  { subject: 'Quantum Computing', class: 'CS A', time: '9:25-10:15' },
                  { subject: 'Renewable Energy', class: 'CS B', time: '10:15-11:00' },
                  { subject: 'Digital Electronics', class: 'ECE A', time: '11:50-12:30' },
                  { subject: 'Circuits', class: 'ECE B', time: '12:30-1:20' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{item.subject}</div>
                        <div className="text-xs text-gray-500">Class: {item.class}</div>
                      </div>
                    </div>
                    <div className="text-xs font-medium text-gray-700">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Statistics */}
            <div className="col-span-4 bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Student Statistic</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>←</span>
                  <span>Sept 2024</span>
                  <span>→</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-2">60%</div>
                <div className="text-sm text-gray-500 mb-2">40%</div>
                <div className="text-sm text-gray-500 mb-2">20%</div>
                <div className="text-sm text-gray-500 mb-2">0%</div>
              </div>
              <div className="flex items-end justify-between space-x-2 h-32">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-16 bg-indigo-600 rounded-t"></div>
                  <span className="text-xs mt-1">AI</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-20 bg-indigo-600 rounded-t"></div>
                  <span className="text-xs mt-1">VLSI</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-24 bg-indigo-600 rounded-t"></div>
                  <span className="text-xs mt-1">Renewable Energy</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-28 bg-indigo-600 rounded-t"></div>
                  <span className="text-xs mt-1">Quantum computing</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <span className="inline-flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span>Avg</span>
                  <span className="font-bold">65%</span>
                </span>
              </div>
            </div>

            {/* Class Progress */}
            <div className="col-span-4 bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold mb-4">Class Progress</h3>
              <div className="space-y-4">
                {[
                  { name: ' AI', assessed: 78, percentage: 32, color: 'text-blue-600' },
                  { name: ' VLSI', assessed: 60, percentage: 43, color: 'text-green-600' },
                  { name: ' Renewable Energy', assessed: 80, percentage: 67, color: 'text-purple-600' },
                  { name: 'Quantan Computing', assessed: 104, percentage: 56, color: 'text-orange-600' }
                ].map((cls, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{cls.name}</div>
                      <div className="text-xs text-gray-500">{cls.assessed} Assessed</div>
                    </div>
                    <div className={`text-xl font-bold ${cls.color}`}>{cls.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performing Students */}
            <div className="col-span-4 bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Top Performing Students</h3>
                <button className="text-blue-600 text-sm">See all</button>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-400 text-black rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Vivek</div>
                    <div className="text-xs">6,810 POINTS</div>
                  </div>
                  <div className="text-lg">🥇</div>
                </div>
                <div className="p-3 bg-orange-400 text-white rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Sumit</div>
                    <div className="text-xs">6,010 POINTS</div>
                  </div>
                  <div className="text-lg">🥈</div>
                </div>
                <div className="p-3 bg-gray-300 text-black rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Priya</div>
                    <div className="text-xs">5190 POINTS</div>
                  </div>
                  <div className="text-lg">🥉</div>
                </div>
              </div>
            </div>

            {/* School Calendar */}
            <div className="col-span-6 bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">School Calendar</h3>
                <span className="text-sm bg-gray-100 px-3 py-1 rounded">November 2024 ▼</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="font-medium text-gray-500 p-3 text-sm">{day}</div>
                ))}
                
                <div className="p-3 text-gray-400">31</div>
                {[1, 2, 3, 4, 5, 6].map(day => (
                  <div key={day} className="p-3 hover:bg-gray-100 cursor-pointer text-sm">{day}</div>
                ))}
                
                <div className="p-3 hover:bg-gray-100 cursor-pointer text-sm">7</div>
                <div className="p-3 bg-indigo-600 text-white rounded-full cursor-pointer text-sm">8</div>
                {[9, 10, 11, 12, 13].map(day => (
                  <div key={day} className="p-3 hover:bg-gray-100 cursor-pointer text-sm">{day}</div>
                ))}
                
                <div className="p-3 text-red-500 cursor-pointer text-sm">14</div>
                {[15, 16, 17, 18, 19].map(day => (
                  <div key={day} className="p-3 hover:bg-gray-100 cursor-pointer text-sm">{day}</div>
                ))}
                <div className="p-3 bg-yellow-400 text-black rounded-full cursor-pointer text-sm">20</div>
                
                <div className="p-3 text-red-500 cursor-pointer text-sm">21</div>
                <div className="p-3 hover:bg-gray-100 cursor-pointer text-sm">22</div>
                <div className="p-3 bg-orange-400 text-white rounded-full cursor-pointer text-sm">23</div>
                {[24, 25, 26, 27].map(day => (
                  <div key={day} className="p-3 hover:bg-gray-100 cursor-pointer text-sm">{day}</div>
                ))}
                
                <div className="p-3 text-red-500 cursor-pointer text-sm">28</div>
                {[29, 30].map(day => (
                  <div key={day} className="p-3 hover:bg-gray-100 cursor-pointer text-sm">{day}</div>
                ))}
                <div className="p-3 hover:bg-gray-100 cursor-pointer text-sm">31</div>
                {[1, 2, 3].map(day => (
                  <div key={day} className="p-3 text-gray-400 text-sm">{day}</div>
                ))}
              </div>
            </div>

            {/* Recent Students */}
            <div className="col-span-6 bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">Recent Students</h3>
                  <p className="text-sm text-gray-500">You have 456 students</p>
                </div>
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center cursor-pointer">
                  <Plus className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Sourav', class: 'Class IT A' },
                  { name: 'Aryan', class: 'Class CS A' },
                  { name: 'kartik', class: 'Class IT A' },
                  { name: 'Aashutosh', class: 'Class ECE B' }
                ].map((student, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600 font-medium text-sm">{student.name[0]}</span>
                      </div>
                      <div>
                        <div className="font-medium text-sm">{student.name}</div>
                        <div className="text-xs text-gray-500">{student.class}</div>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer">
                      <Mail className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>
                ))}
                <div className="pt-2">
                  <button className="text-indigo-600 text-sm font-medium">View More</button>
                </div>
              </div>
            </div>

            {/* Documents and Tests */}
            <div className="col-span-6 bg-white p-6 rounded-2xl shadow-sm">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Documents</h3>
                    <button className="text-blue-600 text-sm">See all</button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'Class IT A 1st semester report', date: '01 Oct, 09:00AM' },
                      { name: 'Ram leave application', date: '01 Oct, 09:00AM' },
                      { name: 'Class CS study material DSA', date: '01 Oct, 09:00AM' }
                    ].map((doc, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded flex items-center justify-center">
                          <FileText className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{doc.name}</div>
                          <div className="text-xs text-gray-500">{doc.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Tests</h3>
                    <button className="text-blue-600 text-sm">See all</button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'Class Test Maths IT', class: 'IT', time: '10:25 am' },
                      { name: 'Unit Test Maths CS', class: 'CS', time: '12:36 pm' },
                      { name: 'Chapter 3 OS Test CS', class: 'CS', time: '04:30 pm' }
                    ].map((test, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center">
                            <span className="text-xs font-bold">{test.class}</span>
                          </div>
                          <div>
                            <div className="font-medium text-sm">{test.name}</div>
                            <div className="text-xs text-gray-500">Please schedule your class test</div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">{test.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}