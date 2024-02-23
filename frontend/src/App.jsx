import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages
import Home from './pages/Home'
import About from './pages/About'


// components
import Nav from './Components/Nav'



function App() {
  

  return (
    <BrowserRouter>
        <Nav />
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
