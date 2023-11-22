import './App.css';
import { useState } from "react"
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service';
import NewOrderPage from '../../Components/NewOrderPage';
import AuthPage from '../LoginPage/AuthPage';
import OrderHistoryPage from '../../Components/OrderHistoryPage';
import NavBar from '../../Components/NavBar';

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
  
//  Initialize router to manage navigation between different pages
// Include routes for:
// - Home/Landing Page before user logged in
// - Login Page
// - Register Page
// - User Dashboard @ probably chats page after logged in
// - Community Section