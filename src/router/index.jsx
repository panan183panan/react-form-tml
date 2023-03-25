import React from 'react'
import {HashRouter,Navigate,Route,Routes} from 'react-router-dom'
import Home from '../pages/Home/index.jsx';
import Detail from '../pages/Detail/index.jsx';
import Preview from '../pages/Preview/index.tsx';
import Login1 from '../pages/Login'
import Regester from '../pages/regester/index.jsx';
import Login from '../pages/login1/index.jsx'


export default function Router() {
  return (
    <HashRouter>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/regester" element={<Regester/>}/>
            <Route exact path="/home/:id" element={<Home/>}/>
            <Route path="/detail/:id" element={<Detail/>}/>
            {/* <Route path="/preview" element={<Login1/>}/> */}
            <Route path="/" element={<Navigate to="/login"/>}/>
            {/* 第一次默认跳入/home/1的页面中 */}
            <Route path="/home" element={<Navigate to="/home/1"/>}/>
        </Routes>
    </HashRouter>
  )
}
