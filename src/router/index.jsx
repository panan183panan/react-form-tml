import React from 'react'
import {HashRouter,Navigate,Route,Routes} from 'react-router-dom'
import Home from '../pages/Home/index.jsx';
import Detail from '../pages/Detail/index.jsx';
import Preview from '../pages/Preview/index.tsx';
import Login from '../pages/Login'


export default function Router() {
  return (
    <HashRouter>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route exact path="/home/:id" element={<Home/>}/>
            <Route path="/detail/:id" element={<Detail/>}/>
            <Route path="/preview/:id" element={<Preview/>}/>
            {/* 第一次默认跳入/home/1的页面中 */}
            <Route path="/" element={<Navigate to="/login"/>}/>
            <Route path="/home" element={<Navigate to="/home/1"/>}/>
        </Routes>
    </HashRouter>
  )
}
