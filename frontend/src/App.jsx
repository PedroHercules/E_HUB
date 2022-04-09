import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from './pages/Home';
import { Login } from "./pages/Login";
import Register from "./pages/Register";
import CreateEvent from './pages/CreateEvent';

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
          <Route path='/create-event'element={ <CreateEvent /> }/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
