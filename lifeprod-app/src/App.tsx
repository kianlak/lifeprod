import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import './AppFonts.css';
import './Components/CSS/Gradient-Background.css'

import { Login } from './Screens/Login/Login'
import { SignUp } from './Screens/SignUp/SignUp';

function App() {
  return (
    <div className='gradient-background'>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App
