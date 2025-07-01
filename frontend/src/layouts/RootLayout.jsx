import React from 'react'
import Footer from '../components/Common/Footer'
import Navbar from '../components/Common/Navbar'
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}
