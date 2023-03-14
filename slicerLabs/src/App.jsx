
import React from 'react'
// import { Route, Routes } from 'react-router-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Cartpage from './Pages/Cart/cartpage';
import ContactUs from './Pages/ContactUs/ContactUs';
import HomePage from './Pages/HomePage/HomePage';
import Learn from './Pages/Learn/Learn';
import Login from './Pages/Login/Login';
import Materials from './Pages/Materials/Materials';
import Services from './Pages/Services/Services';
import StartPrinting from './Pages/StartPrinting/StartPrinting';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },{
      path:"/services",
      element: <Services/>
    },{
      path:"/Materials",
      element: <Materials/>
    },{
      path:"/Learn",
      element: <Learn/>
    },{
      path:"/ContactUs",
      element: <ContactUs/>
    },{
      path:"/Login",
      element: <Login/>
    },{
      path:"/Start3dPrinting",
      element: <StartPrinting/>
    },{
      path:"/cart",
      element: <Cartpage/>
    }
  ]);

  return (
    <RouterProvider router={router} />
   
  )
}

export default App
