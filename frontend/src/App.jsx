import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import {Home} from './pages/Home/indexHome';
import { Cart } from './pages/Cart/indexCart';
import { AuthLogin } from './pages/AuthLogin/indexAuthLogin';
import { SignUp } from './components/SignUp/indexSignUp';
function App() {
  

  return (
    <Routes>
      <Route path="/" element ={<Home />} />
      <Route path="/cart" element ={<Cart />} />
      <Route path="/auth/login" element ={<AuthLogin />} />
      <Route path="/signUp" element = {<SignUp/>} />
    </Routes>
  );
}

export default App
