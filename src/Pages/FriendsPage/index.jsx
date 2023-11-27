import FriendsList from "../../components/Friends/FriendList"
import FindUser from "../../components/Friends/FindUser"
import {useState, useEffect} from 'react'
import * as friendService from '../../utilities/friends-api';


function FriendsPage () {
    const [friends, setFriends] = useState([]);
    async function fetchFriends() {
        const data = await friendService.getFriends();
        setFriends(data)
    }
    useEffect(() => {
        fetchFriends();
      }, []);   

    return (
    <>
    <h1>FriendsPage</h1>
    <FriendsList friends={friends} setFriends={setFriends} fetchFriends={fetchFriends}/>  
    <FindUser fetchFriends={fetchFriends}/>
    </>
    );
}

export default FriendsPage;