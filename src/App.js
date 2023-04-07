
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './Pages/Cart';

import Homepage from './Pages/Homepage';
import Location from './Pages/Location';
import Login from './Pages/Login';
import Mealtype from './Pages/Mealtype';
import Register from './Pages/Register';
import RestMenu from './Pages/RestMenu';
import Loader from './components/Loader';

function App() {

  window.onload = function() {
    <Loader/>
  }
  
  return (
    <Routes>
      <Route exact path='/' element={<Homepage/>}/>
      <Route exact path='/mealtype/:id' element={<Mealtype/>}/>
      <Route exact path='/location/:id' element={<Location/>}/>
      <Route exact path='/restaurant/menu/:id' element={<RestMenu/>}/>
      <Route exact path='/cart' element={<Cart/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/register' element={<Register/>}/>
    </Routes>
  );
}

export default App;
