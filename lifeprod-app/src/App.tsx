import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import './AppFonts.css';
import './Components/CSS/Gradient-Background.css'

import { Login } from './Screens/Login/Login'
import { SignUp } from './Screens/SignUp/SignUp';
import { Dashboard } from './Screens/Dashboard/Dashboard';
import { ForgotPassword } from './Screens/ForgotPassword/ForgotPassword';

function App() {
  return (
    <div className='gradient-background'>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App
