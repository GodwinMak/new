import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'
import {Outlet} from "react-router-dom"
const Main = () => {
  return (
    <div>
      <Header/>
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default Main
