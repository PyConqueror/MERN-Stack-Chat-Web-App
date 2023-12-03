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
        <div className='content-container'>
            <div className='profile-container'>
                <div className={friend.avatar.startsWith('hsl') ? "profile-image" : "profile-image-large"}
                    style={friend.avatar.startsWith('hsl') 
                        ? { backgroundColor: friend.avatar } : { backgroundImage: `url(${friend.avatar})`, width:'30vmin'}}>
                    <p>{ friend.avatar.startsWith('hsl') ? friend.name.charAt(0) : ""}</p>
                </div>
                <h1 className='username'>{ friend.name }</h1>
                <div className='text-container'>
                    <h3>Location:</h3>
                    <p>{ friend.location ? friend.location : "No location"}</p>
                </div>
                <div className='text-container'>
                    <h3>About me:</h3>
                    <p>{ friend.biography ? friend.biography : "No biography"}</p>
                </div>
            </div>
        </div>
    )
}

export default FriendProfilePage

