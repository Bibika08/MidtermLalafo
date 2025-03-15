// import { useState } from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import CreateAd from "./pages/CreateAd.tsx";
import Header from "./components/Header.tsx";
import CreateCategory from './pages/CreateCategory.tsx';
import AdDetail from './pages/AdDetail.tsx';
import EditCategory from './pages/EditCategory.tsx';
import EditAd from './pages/EditAd.tsx';
function App() {

  return (
      <>
          <Header></Header>
    <Routes>
        <Route path={'/'} element={<HomePage/>}></Route>
        <Route path={'/createAd'} element={<CreateAd/>}></Route>
        <Route path={'/createCategory'} element={<CreateCategory/>}></Route>
        <Route path="/ad/:id" element={<AdDetail />} />
        <Route path="/edit-category/:id" element={<EditCategory/>} />
        <Route path="/edit-ad/:id" element={<EditAd/>} />
    </Routes>
      </>
  )
}

export default App