import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from './pages/Home/Home';
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/RegisterUser/Register";

import './styles/Global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> }/>
        <Route path='/login' element={ <Login /> }/>
        <Route path='/registerUser' element={ <Register /> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
