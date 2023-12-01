import FriendsList from "../../components/Friends/FriendList"
import FindUser from "../../components/Friends/FindUser"
import {useState, useEffect} from 'react'
import * as friendService from '../../utilities/friends-api';
import PendingRequest from "../../components/Friends/PendingRequest";
import * as usersAPI from '../../utilities/users-api'
import io from 'socket.io-client';
const socket = io()

function FriendsPage ({ user }) {
    const [friends, setFriends] = useState([]);
    const [pendingFriends, setPendingFriends] = useState([])
    
    useEffect(() => {
        fetchPendingFriends()
        fetchFriends()
        const generalRoom = 'onlineUsersRoom';

        socket.emit(generalRoom, { userID: user._id });
        
        socket.on('friendRequestReceived', ({receiverID, senderData}) => {
          if(receiverID === user._id) {
          setPendingFriends((previous) => [...previous, senderData]);
          }
        });
    
        socket.on('friendRequestAccepted', ({receiverID, senderData, secondReceiverID, receiverData}) => {
          if(receiverID === user._id) {
            setFriends((previous) => [...previous, senderData])
          }
          if(secondReceiverID === user._id) {
            setFriends((previous) => [...previous, receiverData])
          }
          fetchPendingFriends()
        });
    
        socket.on('friendRequestRejected', ({receiverID}) => {
          if(receiverID === user._id) {
            fetchPendingFriends()
          }
        });
    
    
        return () => {
          socket.emit('leaveGeneralRoom', { userID: user._id });
          socket.off('friendRequestReceived');
          socket.off('friendRequestAccepted');
          socket.off('friendRequestRejected');
          socket.off('newUserOnline');
          socket.off('userOffline');
        };
      }, []);

    function sendFriendRequest(friendID) {
    socket.emit('sendFriendRequest', { senderID: user._id, friendID: friendID });
    console.log("userID:", user._id)
    console.log("friendID:", friendID)
    };

    function acceptFriendRequest(friendID) {
    socket.emit('acceptFriendRequest', { userID: user._id, friendID: friendID });
    };

    function rejectFriendRequest (friendID) {
    socket.emit('rejectFriendRequest', { userID: user._id, friendID: friendID });
    };

    async function fetchPendingFriends() {
        const data = await usersAPI.getPending()
        setPendingFriends(data)
    }

    async function fetchFriends() {
        const data = await friendService.getFriends();
        setFriends(data)
    }

    return (
    <div className="content-container">
      <h1>Friends</h1>
      <FindUser fetchFriends={fetchFriends} sendFriendRequest={sendFriendRequest}/>
      <PendingRequest 
      pendingFriends={pendingFriends} 
      acceptFriendRequest={acceptFriendRequest}
      rejectFriendRequest={rejectFriendRequest}
      />  
      <FriendsList friends={friends} setFriends={setFriends} fetchFriends={fetchFriends}/>
    </div>
    );
}

export default FriendsPage;