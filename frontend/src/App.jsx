import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from './pages/Home/Home';
import { Login } from "./pages/Login/Login";
import Register from "./pages/RegisterUser/Register";

import { AuthProvider } from "./context/Context";

import './styles/Global.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={ <Home /> }/>
          <Route path='/login' element={ <Login /> }/>
          <Route path='/registerUser' element={ <Register /> }/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
