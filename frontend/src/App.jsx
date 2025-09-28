import  { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Register from './pages/Register';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import About from './components/About';
import Contact from './components/Contact';
import TeacherDashboard from './pages/TeacherDashboard';
import Classroom from './pages/Classroom';


function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/studentDashboard' element={<StudentDashboard />} />
        <Route path='/teacherDashboard' element={<TeacherDashboard />} />
        <Route path='/classroom/:roomId' element={<Classroom />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
