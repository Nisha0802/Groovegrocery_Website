import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Fotter from './components/Fotter'
import { useAppContext } from './context/AppContext'
import Login from './components/Login'

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const {showUserLogin} = useAppContext();

  return (
    <div>
      {isSellerPath ? null : <Navbar/>}
      {/* if showuserlogin  is ture then form will show*/}
      {showUserLogin ? <Login/> : null}
      <Toaster/>
      <div className={`${isSellerPath ? "" : "px-6 md-px-16 lg-px-24"}`}>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </div>
      {!isSellerPath && <Fotter/>}
    </div>
  )
}

export default App