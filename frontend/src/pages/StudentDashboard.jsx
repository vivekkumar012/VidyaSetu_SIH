import React from 'react';
import { Search, Bell, Edit, MessageSquare, BookOpen, BarChart3, Calendar, Settings, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';


export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-8 shadow-2xl min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-bold text-gray-800">Academy</span>
            </div>
            
            <div className="ml-12">
              <h1 className="text-2xl font-bold text-gray-800">Hello Vivek 👋</h1>
              <p className="text-gray-500">Let's learn something new today!</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl w-80" placeholder="Search" />
            </div>
            <Bell className="w-6 h-6 text-gray-600" />
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-700">Profile</span>
              <Edit className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 space-y-2">
            <div className="bg-indigo-600 text-white px-4 py-3 rounded-xl flex items-center space-x-3">
              <div className="w-5 h-5 bg-white bg-opacity-20 rounded grid grid-cols-2 gap-0.5">
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
              </div>
              <span className="font-medium">Dashboard</span>
            </div>

            {[
              { icon: BookOpen, label: 'Courses', color: 'text-gray-600' },
              { icon: MessageSquare, label: 'Chat', color: 'text-gray-600' },
              { icon: BarChart3, label: 'Grades', color: 'text-gray-600' },
              { icon: Calendar, label: 'Schedule', color: 'text-gray-600' },
              { icon: Settings, label: 'Settings', color: 'text-gray-600' }
            ].map((item, i) => (
              <div key={i} className="px-4 py-3 rounded-xl hover:bg-gray-50 flex items-center space-x-3 cursor-pointer">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className={item.color}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Overview Stats */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>
              <div className="grid grid-cols-4 gap-6">
                <div className="bg-red-50 p-6 rounded-2xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm text-gray-600">Course in Progress</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800">18</div>
                  <div className="w-12 h-1 bg-red-500 rounded mt-2"></div>
                </div>

                <div className="bg-green-50 p-6 rounded-2xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm text-gray-600">Course Completed</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800">23</div>
                  <div className="w-12 h-1 bg-green-500 rounded mt-2"></div>
                </div>

                <div className="bg-blue-50 p-6 rounded-2xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-600">Certificates Earned</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800">15</div>
                  <div className="w-12 h-1 bg-blue-500 rounded mt-2"></div>
                </div>

                <div className="bg-purple-50 p-6 rounded-2xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span className="text-sm text-gray-600">Community Support</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800">87</div>
                  <div className="w-12 h-1 bg-purple-500 rounded mt-2"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Activity Hours */}
              <div className="bg-white">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Activity Hours</h3>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <span>Weekly</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
                
                <div className="flex items-end space-x-4 h-48 mb-6">
                  {[
                    { day: 'S', height: 20, active: false },
                    { day: 'M', height: 60, active: true },
                    { day: 'T', height: 40, active: false },
                    { day: 'W', height: 45, active: false },
                    { day: 'T', height: 70, active: false },
                    { day: 'F', height: 50, active: false },
                    { day: 'S', height: 55, active: false }
                  ].map((bar, i) => (
                    <div key={i} className="flex flex-col items-center flex-1">
                      <div 
                        className={`w-full ${bar.active ? 'bg-indigo-600' : 'bg-indigo-200'} rounded-t-lg`}
                        style={{ height: `${bar.height}%` }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-2">{bar.day}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Time spent</div>
                    <div className="font-bold text-2xl">28 <span className="text-green-500">55%</span></div>
                  </div>
                  <div>
                    <div className="text-gray-500">Lessons taken</div>
                    <div className="font-bold text-2xl">60 <span className="text-green-500">75%</span></div>
                  </div>
                  <div>
                    <div className="text-gray-500">Exam passed</div>
                    <div className="font-bold text-2xl">10 <span className="text-green-500">100%</span></div>
                  </div>
                </div>
              </div>

              {/* Performance */}
              <div className="bg-white">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Performance</h3>
                
                <div className="relative h-48 mb-6">
                  <svg className="w-full h-full" viewBox="0 0 300 150">
                    <path
                      d="M20,120 Q50,80 80,100 T140,90 T200,70 T260,85"
                      stroke="#8B5CF6"
                      strokeWidth="3"
                      fill="none"
                      className="drop-shadow-sm"
                    />
                    <circle cx="80" cy="100" r="4" fill="#8B5CF6" />
                    <circle cx="140" cy="90" r="4" fill="#8B5CF6" />
                    <circle cx="200" cy="70" r="4" fill="#8B5CF6" />
                  </svg>
                  
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 px-4">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>
                </div>

                <div>
                  <div className="text-4xl font-bold text-gray-800 mb-2">40%</div>
                  <p className="text-gray-500">Your productivity is 40 higher compare to last month</p>
                </div>
              </div>
            </div>

            {/* My Assignments */}
            <div className="bg-white">
              <h3 className="text-xl font-bold text-gray-800 mb-6">My Assignments</h3>
              
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 text-gray-500 font-medium">TASK</th>
                      <th className="text-left py-4 text-gray-500 font-medium">GRADE</th>
                      <th className="text-left py-4 text-gray-500 font-medium">UPDATE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-gray-400 rounded"></div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">Typography test</div>
                            <div className="text-sm text-gray-500">Today, 10:30 AM</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div>
                          <div className="font-bold text-gray-800">190/200</div>
                          <div className="text-sm text-gray-500">Final grade</div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium">
                          Completed
                        </span>
                      </td>
                    </tr>
                    
                    <tr>
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-gray-400 rounded"></div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">Inclusive design test</div>
                            <div className="text-sm text-gray-500">Tomorrow, 10:30 AM</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div>
                          <div className="font-bold text-gray-800">160/200</div>
                          <div className="text-sm text-gray-500">Final grade</div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium">
                          Completed
                        </span>
                      </td>
                    </tr>
                    
                    <tr>
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Edit className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">Drawing test</div>
                            <div className="text-sm text-gray-500">23 Feb, 12:30 PM</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div>
                          <div className="font-bold text-gray-800">--/200</div>
                          <div className="text-sm text-gray-500">Final grade</div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-lg text-sm font-medium">
                          Upcoming
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 space-y-6">
            {/* Profile */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-3 overflow-hidden">
                <img src="" 
                     alt="vivek kumar" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-gray-800">Vivek Kumar</h3>
              <p className="text-gray-500 text-sm">College Student</p>
            </div>

            {/* Calendar */}
            <div className="bg-gray-50 p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <ChevronLeft className="w-5 h-5 text-gray-400" />
                <h4 className="font-medium">February 2023</h4>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <div className="grid grid-cols-7 gap-2 text-center">
                {[17, 18, 19, 20, 21, 22].map((date, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    date === 20 ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-200'
                  }`}>
                    {date}
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <h4 className="font-bold text-gray-800 mb-4">Upcoming Events</h4>
              <div className="space-y-4">
                <div className="flex justify-between text-xs text-gray-500 border-b pb-2">
                  <div>9:30</div>
                  <div>10:30</div>
                  <div>11:30</div>
                  <div>12:30</div>
                  <div>13:30</div>
                </div>

                {[
                  { day: 'Sun', event: 'Team Meetup', color: 'bg-red-500' },
                  { day: 'Mon', event: 'Illustration', color: 'bg-gray-800' },
                  { day: 'Tue', event: null },
                  { day: 'Wed', event: 'Research', color: 'bg-blue-500' },
                  { day: 'Thu', event: 'Present', color: 'bg-red-400' },
                  { day: 'Fri', event: null },
                  { day: 'Sat', event: 'Report', color: 'bg-green-500' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-8 text-xs text-gray-500">{item.day}</div>
                    <div className="flex-1 h-8 bg-gray-50 rounded-lg relative">
                      {item.event && (
                        <div className={`absolute left-2 top-1 bottom-1 right-16 ${item.color} rounded text-white text-xs flex items-center px-2`}>
                          {item.event}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}