import './App.css';
import { useState } from "react"
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service';
import AuthPage from '../LoginPage/AuthPage';
import Aside from '../../Components/Aside';
import LandingPage from '../LandingPage'
import ChatPage from '../ChatPage'
import CommunityPage from '../CommunityPage'

export default function App() {
  const [user, setUser] = useState(getUser)

  return (
    <main className="App">
      { user ?
      <>
        <Aside user={user}/>
        <Routes>
          <Route path='/' element={<ChatPage/>} exact/>
          <Route path='/community' element={<CommunityPage/>}/>
        </Routes>
      </>
      :
      <>
      <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/login' element={<AuthPage setUser={setUser}/>}/>
      </Routes>
      </>
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
// Include <Aside> component for user information and conversations list(conversation list only available in chatPage)
//   Use React Router to switch between <ChatPage>, <ProfileEdit> and <CommunityPage> page based on URL