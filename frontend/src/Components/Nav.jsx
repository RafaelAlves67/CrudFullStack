import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>

        <Link to="/"><h2>Crud full stack</h2></Link>

        <div>
        <Link to="/">Home</Link>
        <Link to="/about">Sobre</Link>
        </div>
    </nav>
  )
}

export default Nav