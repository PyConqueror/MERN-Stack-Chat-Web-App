import FriendsList from "../../components/Friends/FriendList"
import FindUser from "../../components/Friends/FindUser"
import {useState, useEffect} from 'react'
import * as friendService from '../../utilities/friends-api';
import PendingRequest from "../../components/Friends/PendingRequest";
import * as usersAPI from '../../utilities/users-api'
import '../FriendsPage/index.css'

function FriendsPage ({ user }) {
    const [friends, setFriends] = useState([]);
    const [pendingFriends, setPendingFriends] = useState([])
    
    async function fetchPendingFriends() {
        const data = await usersAPI.getPending()
        setPendingFriends(data)
    }

    
    async function fetchFriends() {
        const data = await friendService.getFriends();
        setFriends(data)
    }

    useEffect(function(){
        fetchFriends(), fetchPendingFriends();
    }, []);   

    return (
    <div className="content-container">
        <h1>Friends</h1>
        <FindUser fetchFriends={fetchFriends}/>
        <FriendsList friends={friends} setFriends={setFriends} fetchFriends={fetchFriends}/>
        <PendingRequest pendingFriends={pendingFriends} fetchFriends={fetchFriends}/>  
    </div>
    );
}

export default FriendsPage;