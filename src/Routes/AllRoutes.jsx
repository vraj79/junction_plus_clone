import React from 'react'
import {Route, Routes} from "react-router-dom"
import Account from '../Pages/Account'
import Home from '../Pages/Home'
import Details from '../Pages/Details'
const AllRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/account"   element={<Account/>}/>
    <Route path="details/:id" element={<Details/>}/>
    </Routes>
  )
}

export default AllRoutes