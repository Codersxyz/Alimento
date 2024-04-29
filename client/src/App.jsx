import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './Components/Header';
import About from './pages/About';
import Restaurantsignin from './pages/RestaurantsignIn';
import NGOsignin from './pages/NGOsignIn';
import NGOsignup from './pages/NGOsignup';
import Restaurantsignup from './pages/Restaurantsignup';
import NGOForgotpassword from './pages/NGOForgotpassword';
import NGOotp from './pages/NGOotp';

export default function App() {
  return(
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='/restaurantsignin' element={<Restaurantsignin />} />
    <Route path='/NGOsignin' element={<NGOsignin />} />
    <Route path='/NGOsignup' element={<NGOsignup />} />
    <Route path='/Restaurantsignup' element={<Restaurantsignup />} />
    <Route path='/Restaurantsignup' element={<Restaurantsignup />} />
    <Route path='/NGOForgotpassword' element={<NGOForgotpassword />} />
    <Route path='/NGOotp' element={<NGOotp/>} />
  </Routes>
</BrowserRouter>
  );
}
