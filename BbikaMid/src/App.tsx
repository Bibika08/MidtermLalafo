
import './App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import CreateAd from "./pages/CreateAd.tsx";
import Header from "./components/Header.tsx";
import CreateCategory from './pages/CreateCategory.tsx';
function App() {

  return (
      <>
          <Header></Header>
    <Routes>
        <Route path={'/'} element={<HomePage/>}></Route>
        <Route path={'/createAd'} element={<CreateAd/>}></Route>
        <Route path={'/createCategory'} element={<CreateCategory/>}></Route>
    </Routes>
      </>
  )
}

export default App