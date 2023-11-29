import './App.css';
import { useState } from "react"
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service';
import { communities } from '../../data'
import AuthPage from '../AuthPage';
import NavBar from '../../components/Navbar'
import LandingPage from '../LandingPage'
import ChatPage from '../ChatsPage'
import CommunityListPage from '../CommunityListPage'
import CommunityDetailPage from '../CommunityDetailPage';
import CreateCommunityPage from '../CommunityListPage/CreateCommunityPage';
import FriendsPage from '../FriendsPage/index Websocket.jsx'
import ProfilePage from '../ProfilePage'
import FriendProfilePage from '../ProfilePage/FriendProfilePage.jsx';
import EditProfilePage from '../ProfilePage/EditProfilePage'

export default function App() {
  const [user, setUser] = useState(getUser)

  return (
    <main className="App">
      { user ?
      <>
        <NavBar user={user}/>
        <Routes>
          <Route path='/' element={<ChatPage user={user}/>} exact/>
          <Route path='/community' element={<CommunityListPage communities={communities} user={ user }/>}/>
          <Route path='/community/:communityName' element={<CommunityDetailPage user={ user }/>}/>
          <Route path='/community/new' element={<CreateCommunityPage user={ user }/>}/>
          <Route path='/friends' element={<FriendsPage user={ user }/>}/>
          <Route path='/profile' element={<ProfilePage user={ user }/>}/>
          <Route path='/profile/:friendName' element={<FriendProfilePage/>}/>
          <Route path='/profile/edit' element={<EditProfilePage user={ user } setUser={ setUser }/>}/>
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