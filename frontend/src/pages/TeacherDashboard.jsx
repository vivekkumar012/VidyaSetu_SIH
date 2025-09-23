import React, { useState, useEffect } from 'react';
import { Search, Globe, User, Users, FileText, BarChart3, Calendar, Settings, Plus, Mail, Home, Menu, X, Bell, LogOut, ChevronDown, ChevronLeft, ChevronRight, Award, TrendingUp, Clock, BookOpen, Video, Edit, Download, Star, Filter, MoreHorizontal, GraduationCap, Target, CheckCircle } from 'lucide-react';
import logo from '../assets/logo.png'

export default function TeacherDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [teacher, setTeacher] = useState({
    name: 'Dr. Sarah Wilson',
    role: 'Computer Science Professor',
    avatar: 'https://imgs.search.brave.com/8uciZ52LLwRZDYI3NRZbkbPzwRjzgOT6c07eDcRy5YI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE2/MDQ3Mzk2MC9waG90/by9oYXBweS1zYXRp/c2ZpZWQtbWF0aC10/ZWFjaGVyLWluLWVs/ZW1lbnRhcnktY2xh/c3Mud2VicD9hPTEm/Yj0xJnM9NjEyeDYx/MiZ3PTAmaz0yMCZj/PTg4U1JITWVBb3pP/MjIxZ2V0anp3RGJY/TUJLSHlZTjdxRWJH/V1RaUEhWN0E9',
    department: 'Computer Science',
    experience: '8 years',
    rating: 4.8
  });

  const [schedule, setSchedule] = useState([
    { subject: 'Artificial Intelligence', class: 'IT A', time: '7:45-8:35', status: 'upcoming' },
    { subject: 'VLSI Design', class: 'IT B', time: '8:35-9:25', status: 'completed' },
    { subject: 'Quantum Computing', class: 'CS A', time: '9:25-10:15', status: 'ongoing' },
    { subject: 'Renewable Energy', class: 'CS B', time: '10:15-11:00', status: 'upcoming' },
    { subject: 'Digital Electronics', class: 'ECE A', time: '11:50-12:30', status: 'upcoming' },
    { subject: 'Circuit Analysis', class: 'ECE B', time: '12:30-1:20', status: 'upcoming' }
  ]);

  const [students, setStudents] = useState([
    { id: 1, name: 'Vivek Kumar', class: 'IT A', points: 6810, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
    { id: 2, name: 'Sumit Sharma', class: 'CS B', points: 6010, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
    { id: 3, name: 'Priya Singh', class: 'IT A', points: 5190, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
    { id: 4, name: 'Aryan Patel', class: 'CS A', points: 4980, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' }
  ]);

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', key: 'dashboard' },
    { icon: Users, label: 'Students', key: 'students' },
    { icon: BookOpen, label: 'Courses', key: 'courses' },
    { icon: FileText, label: 'Assessments', key: 'assessments' },
    { icon: BarChart3, label: 'Analytics', key: 'analytics' },
    { icon: Calendar, label: 'Schedule', key: 'schedule' },
    { icon: Mail, label: 'Messages', key: 'messages' },
    { icon: Settings, label: 'Settings', key: 'settings' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'ongoing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'upcoming': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <div className={`fixed lg:relative inset-y-0 left-0 z-50 w-72 bg-white/10 backdrop-blur-xl border-r border-white/20 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="flex flex-col h-full p-6">
            {/* Logo */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <img src={logo} alt="" className='w-14 h-12' />
                <span className="text-xl font-bold text-white">VidyaSetu</span>
              </div>
              <button 
                className="lg:hidden text-white/70 hover:text-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    activeTab === item.key 
                      ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {activeTab === item.key && (
                    <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full"></div>
                  )}
                </button>
              ))}
            </nav>

            {/* Teacher Profile */}
            <div className="border-t border-white/20 pt-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20">
                  <img src={teacher.avatar} alt={teacher.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{teacher.name}</div>
                  <div className="text-xs text-white/60">{teacher.role}</div>
                </div>
                <button className="text-white/60 hover:text-white">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>⭐ {teacher.rating} rating</span>
                <span>📚 {teacher.experience}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  className="lg:hidden text-white/70 hover:text-white"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-white">Welcome back, Dr. Wilson! 👋</h1>
                  <p className="text-white/60">You have 2 new assessments to review today</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                  <input 
                    className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-sm w-80" 
                    placeholder="Search students, courses..." 
                  />
                </div>
                <div className="relative">
                  <Bell className="w-6 h-6 text-white/70 hover:text-white cursor-pointer" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <Globe className="w-6 h-6 text-white/70 hover:text-white cursor-pointer" />
                <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/20 cursor-pointer">
                  <img src={teacher.avatar} alt={teacher.name} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 p-6 overflow-auto">
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Welcome Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 rounded-2xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <h2 className="text-3xl font-bold mb-4">Welcome back, Dr. Wilson! 👋</h2>
                      <p className="text-lg mb-2 text-white/90">You have 2 new assessments added to your subjects.</p>
                      <p className="text-white/80">Please add questions and submit them for review.</p>
                      <button className="mt-6 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl backdrop-blur-sm transition-all duration-200">
                        Review Assessments
                      </button>
                    </div>
                    <div className="absolute right-8 top-8 flex space-x-2 opacity-30">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-10 h-16 bg-white/20 rounded-full flex items-center justify-center">
                          <div className={`w-6 h-6 rounded-full ${i % 3 === 0 ? 'bg-blue-300' : i % 3 === 1 ? 'bg-orange-300' : 'bg-red-300'}`}></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                    <h3 className="text-lg font-semibold text-white mb-6">Quick Stats</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <Users className="w-4 h-4 text-blue-400" />
                          </div>
                          <span className="text-white/80">Total Students</span>
                        </div>
                        <span className="text-white font-bold">456</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-green-400" />
                          </div>
                          <span className="text-white/80">Active Courses</span>
                        </div>
                        <span className="text-white font-bold">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-purple-400" />
                          </div>
                          <span className="text-white/80">Pending Reviews</span>
                        </div>
                        <span className="text-white font-bold">8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                            <Clock className="w-4 h-4 text-orange-400" />
                          </div>
                          <span className="text-white/80">Classes Today</span>
                        </div>
                        <span className="text-white font-bold">6</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Today's Schedule */}
                  <div className="lg:col-span-1 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-white">Today's Schedule</h3>
                      <Calendar className="w-5 h-5 text-white/60" />
                    </div>
                    <div className="space-y-4">
                      {schedule.slice(0, 5).map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              item.status === 'completed' ? 'bg-green-500' :
                              item.status === 'ongoing' ? 'bg-blue-500' : 'bg-orange-500'
                            }`}></div>
                            <div>
                              <div className="text-white text-sm font-medium">{item.subject}</div>
                              <div className="text-white/60 text-xs">Class: {item.class}</div>
                            </div>
                          </div>
                          <div className="text-white/60 text-xs font-medium">{item.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Student Statistics Chart */}
                  <div className="lg:col-span-1 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-white">Student Performance</h3>
                      <div className="flex items-center space-x-2 text-sm text-white/60">
                        <ChevronLeft className="w-4 h-4" />
                        <span>Sept 2024</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex items-end justify-between space-x-2 h-32 mb-4">
                      {[
                        { subject: 'AI', height: 60, score: 78 },
                        { subject: 'VLSI', height: 75, score: 85 },
                        { subject: 'Renewable', height: 90, score: 92 },
                        { subject: 'Quantum', height: 85, score: 89 }
                      ].map((bar, i) => (
                        <div key={i} className="flex flex-col items-center flex-1">
                          <div 
                            className="w-full bg-gradient-to-t from-indigo-600 to-cyan-500 rounded-t-lg transition-all duration-500 hover:from-indigo-500 hover:to-cyan-400"
                            style={{ height: `${bar.height}%` }}
                          ></div>
                          <span className="text-xs text-white/60 mt-2">{bar.subject}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <span className="inline-flex items-center space-x-2 text-sm">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-white/60">Avg Performance</span>
                        <span className="font-bold text-green-400">86%</span>
                      </span>
                    </div>
                  </div>

                  {/* Class Progress */}
                  <div className="lg:col-span-1 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                    <h3 className="text-lg font-semibold text-white mb-6">Class Progress</h3>
                    <div className="space-y-4">
                      {[
                        { name: 'Artificial Intelligence', assessed: 78, percentage: 92, color: 'text-blue-400' },
                        { name: 'VLSI Design', assessed: 60, percentage: 85, color: 'text-green-400' },
                        { name: 'Renewable Energy', assessed: 80, percentage: 78, color: 'text-purple-400' },
                        { name: 'Quantum Computing', assessed: 104, percentage: 89, color: 'text-orange-400' }
                      ].map((cls, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200">
                          <div>
                            <div className="font-medium text-sm text-white">{cls.name}</div>
                            <div className="text-xs text-white/60">{cls.assessed} Students Assessed</div>
                          </div>
                          <div className={`text-lg font-bold ${cls.color}`}>{cls.percentage}%</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Performing Students */}
                  <div className="lg:col-span-1 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-white">Top Students</h3>
                      <button className="text-cyan-400 text-sm hover:text-cyan-300">See all</button>
                    </div>
                    <div className="space-y-3">
                      {students.slice(0, 3).map((student, i) => (
                        <div key={student.id} className={`p-4 rounded-xl flex items-center justify-between transition-all duration-200 hover:scale-105 ${
                          i === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                          i === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                          'bg-gradient-to-r from-orange-600 to-red-600'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-medium text-sm text-white">{student.name}</div>
                              <div className="text-xs text-white/80">{student.points.toLocaleString()} POINTS</div>
                            </div>
                          </div>
                          <div className="text-lg">
                            {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* School Calendar */}
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-white">School Calendar</h3>
                      <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-lg">
                        <span className="text-sm text-white">November 2024</span>
                        <ChevronDown className="w-4 h-4 text-white/60" />
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="font-medium text-white/60 p-3 text-sm">{day}</div>
                      ))}
                      
                      <div className="p-3 text-white/40 text-sm">31</div>
                      {[1, 2, 3, 4, 5, 6].map(day => (
                        <div key={day} className="p-3 hover:bg-white/10 cursor-pointer text-sm text-white rounded-lg transition-colors">{day}</div>
                      ))}
                      
                      {[7, 8, 9, 10, 11, 12, 13].map((day, i) => (
                        <div key={day} className={`p-3 cursor-pointer text-sm rounded-lg transition-all duration-200 ${
                          day === 8 ? 'bg-indigo-600 text-white hover:bg-indigo-700' :
                          day === 20 ? 'bg-yellow-500 text-black hover:bg-yellow-600' :
                          day === 23 ? 'bg-orange-500 text-white hover:bg-orange-600' :
                          [14, 21, 28].includes(day) ? 'text-red-400 hover:bg-white/10' :
                          'text-white hover:bg-white/10'
                        }`}>
                          {day}
                        </div>
                      ))}
                      
                      {[14, 15, 16, 17, 18, 19, 20].map((day, i) => (
                        <div key={day} className={`p-3 cursor-pointer text-sm rounded-lg transition-all duration-200 ${
                          day === 20 ? 'bg-yellow-500 text-black hover:bg-yellow-600' :
                          day === 14 ? 'text-red-400 hover:bg-white/10' :
                          'text-white hover:bg-white/10'
                        }`}>
                          {day}
                        </div>
                      ))}

                      {[21, 22, 23, 24, 25, 26, 27].map((day, i) => (
                        <div key={day} className={`p-3 cursor-pointer text-sm rounded-lg transition-all duration-200 ${
                          day === 23 ? 'bg-orange-500 text-white hover:bg-orange-600' :
                          day === 21 ? 'text-red-400 hover:bg-white/10' :
                          'text-white hover:bg-white/10'
                        }`}>
                          {day}
                        </div>
                      ))}

                      {[28, 29, 30].map(day => (
                        <div key={day} className={`p-3 cursor-pointer text-sm rounded-lg transition-colors ${
                          day === 28 ? 'text-red-400 hover:bg-white/10' : 'text-white hover:bg-white/10'
                        }`}>
                          {day}
                        </div>
                      ))}
                      <div className="p-3 text-white hover:bg-white/10 cursor-pointer text-sm rounded-lg transition-colors">31</div>
                      {[1, 2, 3].map(day => (
                        <div key={day} className="p-3 text-white/40 text-sm">{day}</div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity & Documents */}
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Documents */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-white">Recent Documents</h4>
                          <button className="text-cyan-400 text-sm hover:text-cyan-300">See all</button>
                        </div>
                        <div className="space-y-3">
                          {[
                            { name: 'Class IT A 1st semester report', date: '01 Oct, 09:00AM' },
                            { name: 'Ram leave application', date: '01 Oct, 09:00AM' },
                            { name: 'DSA study material', date: '01 Oct, 09:00AM' }
                          ].map((doc, i) => (
                            <div key={i} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                              <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                                <FileText className="w-4 h-4 text-indigo-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm text-white truncate">{doc.name}</div>
                                <div className="text-xs text-white/60">{doc.date}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Tests */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-white">Upcoming Tests</h4>
                          <button className="text-cyan-400 text-sm hover:text-cyan-300">See all</button>
                        </div>
                        <div className="space-y-3">
                          {[
                            { name: 'Class Test Maths IT', class: 'IT', time: '10:25 am' },
                            { name: 'Unit Test Maths CS', class: 'CS', time: '12:36 pm' },
                            { name: 'Chapter 3 OS Test CS', class: 'CS', time: '04:30 pm' }
                          ].map((test, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center">
                                  <span className="text-xs font-bold">{test.class}</span>
                                </div>
                                <div>
                                  <div className="font-medium text-sm text-white">{test.name}</div>
                                  <div className="text-xs text-white/60">Schedule your test</div>
                                </div>
                              </div>
                              <div className="text-xs text-white/60">{test.time}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Recent Students */}
                    <div className="mt-8">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-white">Recent Students</h4>
                          <p className="text-sm text-white/60">You have 456 students</p>
                        </div>
                        <button className="w-8 h-8 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full flex items-center justify-center cursor-pointer transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {students.slice(0, 4).map((student, i) => (
                          <div key={student.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full overflow-hidden">
                                <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <div className="font-medium text-sm text-white">{student.name}</div>
                                <div className="text-xs text-white/60">{student.class}</div>
                              </div>
                            </div>
                            <button className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                              <Mail className="w-3 h-3 text-white/60" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors">View More Students</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[
                      { icon: Video, label: 'Start Live Class', color: 'bg-red-500 hover:bg-red-600' },
                      { icon: FileText, label: 'Create Assessment', color: 'bg-blue-500 hover:bg-blue-600' },
                      { icon: Users, label: 'View Students', color: 'bg-green-500 hover:bg-green-600' },
                      { icon: BarChart3, label: 'View Analytics', color: 'bg-purple-500 hover:bg-purple-600' },
                      { icon: Mail, label: 'Send Message', color: 'bg-orange-500 hover:bg-orange-600' },
                      { icon: Download, label: 'Export Reports', color: 'bg-cyan-500 hover:bg-cyan-600' }
                    ].map((action, i) => (
                      <button key={i} className={`p-4 rounded-xl ${action.color} text-white transition-all duration-200 hover:scale-105 hover:shadow-lg group`}>
                        <action.icon className="w-6 h-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-medium">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs content placeholder */}
            {activeTab !== 'dashboard' && (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {React.createElement(sidebarItems.find(item => item.key === activeTab)?.icon || Settings, {
                      className: "w-8 h-8 text-white/60"
                    })}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{sidebarItems.find(item => item.key === activeTab)?.label} Coming Soon</h3>
                  <p className="text-white/60">This section is under development and will be available soon.</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}