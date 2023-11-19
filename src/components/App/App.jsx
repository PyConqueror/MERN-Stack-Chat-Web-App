import './App.css';
import { useState } from "react"
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service';
import NewOrderPage from '../NewOrderPage';
import AuthPage from '../AuthPage';
import OrderHistoryPage from '../OrderHistoryPage';
import NavBar from '../NavBar';

export default function App() {
  const [user, setUser] = useState(getUser)

  return (
    <main className="App">
      { user ?
      <>
        <NavBar user={user} setUser={setUser}/>
        <Routes>
          <Route path='/orders/new' element={<NewOrderPage/>}/>
          <Route path='/orders/history' element={<OrderHistoryPage/>}/>
        </Routes>
      </>
      :
      <AuthPage setUser={setUser}/>

      }
    </main>
  );
};
  