import './App.css';
import Header from './Container/Header.jsx'
import Register from './Components/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Homepage from './Container/Homepage';
import Footer from './Container/Footer';
import Restaurant from './Container/Restaurant';
import Allrestautants from './Container/Allrestautants';
import Orders from './Components/Orders';
import Profile from './Components/Profile';
import Cart from './Container/Cart';
import Checkout from './Components/Checkout';
import { useSelector } from 'react-redux';
import Menu from './Restaurant/Menu';
import RestroHeader from './Restaurant/RestroHeader';
import RestroOrders from './Restaurant/RestroOrders';
import RestroProfile from './Restaurant/RestroProfile';
import RestroLogin from './Restaurant/RestroLogin';
import RestroRegister from './Restaurant/RestroRegister';
import { useEffect } from 'react';

function App() {
  const cartdisplay = useSelector(state => state.cart)
  const auth = useSelector(state => state.login)
  const role = useSelector(state => state.role)
  useEffect(()=>{},[])
  return (
    <>
    {!auth && <Router>
          <Header />
        <Routes>
          <Route path="*" element={<Homepage />} />  
          <Route path='/' element={<Homepage/>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/seller/register' element={<RestroRegister/>}></Route>
      <Route path='/seller/login' element={<RestroLogin/>}></Route>
      <Route path='/restaurant' element={<Restaurant />}></Route>
          <Route path='/restaurants' element={<Allrestautants />}></Route>

        </Routes>
        <Footer />
      </Router>}
 {role ===  "user" &&  <Router>
        <Header />
        {cartdisplay && <Cart />}
        <Routes>
          <Route path='/' element={<Homepage/>}></Route>
          <Route path="*" element={<Homepage />} />  
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/orders' element={<Orders />}></Route>
                   <Route path='/checkout' element={<Checkout />} ></Route>
        
          <Route path='/restaurant' element={<Restaurant />}></Route>
          <Route path='/restaurants' element={<Allrestautants />}></Route>
        </Routes>
        <Footer />
      </Router>}

      {role === "restaurant" &&   <Router>
    <RestroHeader/>
   <Routes>
   <Route path="*" element={<Menu />} />  
      <Route path='/seller' element={<Menu/>}></Route>
      <Route path='/seller/orders' element={<RestroOrders/>}></Route>
      <Route path='/seller/profile' element={<RestroProfile/>}></Route>
    </Routes>
   </Router>} 
    </>
  );
}

export default App;
