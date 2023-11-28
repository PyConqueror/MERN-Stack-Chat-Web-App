import FriendsList from "../../components/Friends/FriendList"
import FindUser from "../../components/Friends/FindUser"
import {useState, useEffect} from 'react'
import * as friendService from '../../utilities/friends-api';
import PendingRequest from "../../components/Friends/PendingRequest";
import * as usersAPI from '../../utilities/users-api'

function FriendsPage () {
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
    <>
    <h1>FriendsPage</h1>
    <FriendsList friends={friends} setFriends={setFriends} fetchFriends={fetchFriends}/>
    <PendingRequest pendingFriends={pendingFriends} fetchFriends={fetchFriends}/>  
    <FindUser fetchFriends={fetchFriends}/>
    </>
    );
}

export default FriendsPage;