import React, { useState, useEffect } from 'react';
import { Search, Bell, Edit, MessageSquare, BookOpen, BarChart3, Calendar, Settings, ChevronDown, ChevronLeft, ChevronRight, Menu, X, User, LogOut, Home, Award, Clock, TrendingUp, Target, CheckCircle, AlertCircle, Users, Video, Download, Play, Star, Filter, MoreHorizontal } from 'lucide-react';
import logo from '../assets/logo.png'

export default function StudentDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState({
    name: 'Vivek Kumar',
    role: 'Computer Science Student',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    level: 'Advanced',
    streak: 15,
    points: 2847
  });
  
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Advanced Algorithms Project', subject: 'Computer Science', dueDate: '2025-09-25', grade: '195/200', status: 'completed', priority: 'high' },
    { id: 2, title: 'Machine Learning Assignment', subject: 'AI/ML', dueDate: '2025-09-27', grade: '180/200', status: 'completed', priority: 'medium' },
    { id: 3, title: 'Database Design Project', subject: 'Database Systems', dueDate: '2025-09-30', grade: '--/200', status: 'upcoming', priority: 'high' },
    { id: 4, title: 'Web Development Portfolio', subject: 'Web Tech', dueDate: '2025-10-05', grade: '--/200', status: 'in-progress', priority: 'medium' }
  ]);

  const [courses, setCourses] = useState([
    { id: 1, title: 'Advanced Data Structures', progress: 85, instructor: 'Dr. Sarah Wilson', nextClass: 'Tomorrow 10:00 AM', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop' },
    { id: 2, title: 'Machine Learning Fundamentals', progress: 92, instructor: 'Prof. Michael Chen', nextClass: 'Today 2:00 PM', image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop' },
    { id: 3, title: 'System Design Principles', progress: 67, instructor: 'Dr. Lisa Thompson', nextClass: 'Wed 11:00 AM', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop' }
  ]);

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', key: 'dashboard' },
    { icon: BookOpen, label: 'Courses', key: 'courses' },
    { icon: BarChart3, label: 'Analytics', key: 'analytics' },
    { icon: MessageSquare, label: 'Messages', key: 'messages' },
    { icon: Calendar, label: 'Schedule', key: 'schedule' },
    { icon: Award, label: 'Achievements', key: 'achievements' },
    { icon: Settings, label: 'Settings', key: 'settings' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'upcoming': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
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

            {/* User Profile */}
            <div className="border-t border-white/20 pt-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{user.name}</div>
                  <div className="text-xs text-white/60">{user.role}</div>
                </div>
                <button className="text-white/60 hover:text-white">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>🔥 {user.streak} day streak</span>
                <span>⭐ {user.points.toLocaleString()} pts</span>
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
                  <h1 className="text-2xl font-bold text-white">Welcome back, Vivek! 👋</h1>
                  <p className="text-white/60">Ready to continue your learning journey?</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                  <input 
                    className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-sm w-80" 
                    placeholder="Search courses, assignments..." 
                  />
                </div>
                <div className="relative">
                  <Bell className="w-6 h-6 text-white/70 hover:text-white cursor-pointer" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/20 cursor-pointer">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 p-6 overflow-auto">
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: 'Courses in Progress', value: '12', change: '+2 this month', color: 'from-blue-500 to-cyan-500', icon: BookOpen },
                    { title: 'Assignments Due', value: '5', change: '2 due today', color: 'from-orange-500 to-red-500', icon: Clock },
                    { title: 'Average Grade', value: '89%', change: '+5% improvement', color: 'from-green-500 to-emerald-500', icon: TrendingUp },
                    { title: 'Learning Streak', value: `${user.streak}`, change: 'Personal best!', color: 'from-purple-500 to-pink-500', icon: Target }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-white/60 text-sm">{stat.title}</p>
                        <p className="text-3xl font-bold text-white">{stat.value}</p>
                        <p className="text-xs text-cyan-400">{stat.change}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Current Courses */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Current Courses</h2>
                        <button className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 text-sm">
                          <span>View All</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        {courses.map((course) => (
                          <div key={course.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-200 group cursor-pointer">
                            <div className="flex items-start space-x-4">
                              <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">{course.title}</h3>
                                <p className="text-sm text-white/60">{course.instructor}</p>
                                <p className="text-xs text-cyan-400 mt-1">{course.nextClass}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium text-white">{course.progress}%</div>
                                <div className="w-20 h-2 bg-white/10 rounded-full mt-1 overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                                    style={{ width: `${course.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                      <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
                      <div className="space-y-4">
                        {[
                          { type: 'assignment', title: 'Submitted Advanced Algorithms Project', time: '2 hours ago', status: 'success' },
                          { type: 'course', title: 'Completed Machine Learning Module 5', time: '1 day ago', status: 'success' },
                          { type: 'achievement', title: 'Earned "Quick Learner" badge', time: '2 days ago', status: 'achievement' },
                          { type: 'reminder', title: 'Database project due in 3 days', time: '3 days ago', status: 'warning' }
                        ].map((activity, i) => (
                          <div key={i} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              activity.status === 'success' ? 'bg-green-500/20 text-green-400' :
                              activity.status === 'achievement' ? 'bg-purple-500/20 text-purple-400' :
                              'bg-orange-500/20 text-orange-400'
                            }`}>
                              {activity.status === 'success' ? <CheckCircle className="w-4 h-4" /> :
                               activity.status === 'achievement' ? <Award className="w-4 h-4" /> :
                               <AlertCircle className="w-4 h-4" />}
                            </div>
                            <div className="flex-1">
                              <p className="text-white text-sm">{activity.title}</p>
                              <p className="text-white/40 text-xs">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Sidebar */}
                  <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                      <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        {[
                          { icon: Video, label: 'Join Live Class', color: 'bg-red-500' },
                          { icon: Edit, label: 'Submit Assignment', color: 'bg-blue-500' },
                          { icon: MessageSquare, label: 'Ask Question', color: 'bg-green-500' },
                          { icon: Download, label: 'Download Resources', color: 'bg-purple-500' }
                        ].map((action, i) => (
                          <button key={i} className="w-full flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 group">
                            <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center`}>
                              <action.icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-white text-sm font-medium group-hover:text-cyan-400 transition-colors">{action.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Upcoming Deadlines */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                      <h3 className="text-lg font-semibold text-white mb-4">Upcoming Deadlines</h3>
                      <div className="space-y-3">
                        {assignments.filter(a => a.status === 'upcoming' || a.status === 'in-progress').slice(0, 3).map((assignment) => (
                          <div key={assignment.id} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5">
                            <div className={`w-2 h-2 rounded-full mt-2 ${getPriorityColor(assignment.priority)}`}></div>
                            <div className="flex-1">
                              <p className="text-white text-sm font-medium">{assignment.title}</p>
                              <p className="text-white/60 text-xs">{assignment.subject}</p>
                              <p className="text-cyan-400 text-xs mt-1">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Performance Summary */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                      <h3 className="text-lg font-semibold text-white mb-4">This Week</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-white/60 text-sm">Study Hours</span>
                          <span className="text-white font-semibold">24h</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/60 text-sm">Assignments</span>
                          <span className="text-white font-semibold">3/5</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/60 text-sm">Avg Grade</span>
                          <span className="text-green-400 font-semibold">92%</span>
                        </div>
                        <div className="pt-2 border-t border-white/10">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 text-sm">+5% from last week</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assignments Table */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Recent Assignments</h2>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                        <Filter className="w-4 h-4 text-white/60" />
                      </button>
                      <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white text-sm font-medium transition-colors">
                        View All
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 text-white/60 font-medium">Assignment</th>
                          <th className="text-left py-3 text-white/60 font-medium">Subject</th>
                          <th className="text-left py-3 text-white/60 font-medium">Due Date</th>
                          <th className="text-left py-3 text-white/60 font-medium">Grade</th>
                          <th className="text-left py-3 text-white/60 font-medium">Status</th>
                          <th className="text-right py-3 text-white/60 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {assignments.map((assignment) => (
                          <tr key={assignment.id} className="hover:bg-white/5 transition-colors">
                            <td className="py-4">
                              <div className="flex items-center space-x-3">
                                <div className={`w-2 h-2 rounded-full ${getPriorityColor(assignment.priority)}`}></div>
                                <span className="text-white font-medium">{assignment.title}</span>
                              </div>
                            </td>
                            <td className="py-4 text-white/60">{assignment.subject}</td>
                            <td className="py-4 text-white/60">{new Date(assignment.dueDate).toLocaleDateString()}</td>
                            <td className="py-4">
                              <span className={`font-semibold ${assignment.grade.includes('--') ? 'text-white/40' : 'text-cyan-400'}`}>
                                {assignment.grade}
                              </span>
                            </td>
                            <td className="py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(assignment.status)}`}>
                                {assignment.status.replace('-', ' ').toUpperCase()}
                              </span>
                            </td>
                            <td className="py-4 text-right">
                              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                                <MoreHorizontal className="w-4 h-4 text-white/60" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs content can be added here */}
            {activeTab !== 'dashboard' && (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-white/60" />
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