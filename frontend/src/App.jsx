import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from './pages/Home';
import { Login } from "./pages/Login";
import Register from "./pages/Register";
import CreateEvent from './pages/CreateEvent';
import EventInfo from './pages/EventInfo';
import UpdateEvent from './pages/UpdateEvent';
import Profile from './pages/Profile';

import { AuthProvider } from "./context/Context";

import './styles/Global.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={ <Home /> }/>
          <Route path='/event/:id' element={ <EventInfo />} />
          <Route path='/login' element={ <Login /> }/>
          <Route path='/registerUser' element={ <Register /> }/>
          <Route path='/create-event'element={ <CreateEvent /> }/>
          <Route path='/update-event'element={ <UpdateEvent /> }/>
          <Route path='/profile/:nickname' element={ <Profile /> }/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
