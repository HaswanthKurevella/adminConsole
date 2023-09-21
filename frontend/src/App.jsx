import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <NavBar />
			<div>
				<Outlet />
			</div>
    </>
  )
}

export default App
