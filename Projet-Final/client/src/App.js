
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home'
import { Routes , Route } from 'react-router';
import Reservation from './components/Reservation';
import LoginUser from './components/LoginUser';
import ListRooms from './components/ListRooms';
import Invoice from './components/Invoice';
 

const App=()=> {
  return (<>


  <Routes>

    <Route path='/' element={<Home/>}>

    
    <Route path='LoginUser' element={<LoginUser/>}/>
    <Route path='ListRooms' element={<ListRooms/>}/>
    <Route path='reservation/:roomId' element={<Reservation/>}/>
    <Route path='Invoice' element={<Invoice/>}/>
    
    </Route>
  </Routes>

  </>
   
  );
}

export default App;
