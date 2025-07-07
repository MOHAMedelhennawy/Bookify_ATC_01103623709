// Packages
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import About from './pages/About'

// Components
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"

import RootLayout from './layouts/RootLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={ <RootLayout /> }>
      <Route index element={ <Home /> }/>
      <Route path='About' element={ <About /> }/>
      <Route path='Login' element={ <Login /> }/>
      <Route path='Register' element={ <Register /> }/>
    </Route>
  )
)

export default router;
