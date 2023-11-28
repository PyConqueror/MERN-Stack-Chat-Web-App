import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as profileAPI from '../../utilities/profile-api'

function FriendProfilePage(){
    const { state } = useLocation();
    const friendId = state?.friendId
    const [friend, setFriendData] = useState([])

    useEffect(function(){
        async function getFriendData(){
            const friendData = await profileAPI.getFriendData(friendId)
            setFriendData(friendData)
        }
        getFriendData()

    }, [])
      
    if(!friend.avatar){
        return(
            <p>loading...</p>
        )
    }

    return(
        <>
            <p>{ friend.name }</p>
            <p>Location:</p>
            <p>{ friend.location ? friend.location : "No location"}</p>
            <div className={friend.avatar.startsWith('hsl') ? "profile-image" : "profile-image-large"}
                style={friend.avatar.startsWith('hsl') 
                    ? { backgroundColor: friend.avatar } : { backgroundImage: `url(${friend.avatar})`}}>
                <p>{ friend.avatar.startsWith('hsl') ? friend.name.charAt(0) : ""}</p>
            </div>
            <p>Biography:</p>
            <p>{ friend.biography ? friend.biography : "No biography"}</p>
        </>
    )
}

export default FriendProfilePage

