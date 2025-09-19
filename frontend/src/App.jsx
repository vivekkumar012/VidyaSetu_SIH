import  { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
