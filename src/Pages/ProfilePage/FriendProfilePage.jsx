import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import * as profileAPI from '../../utilities/profile-api'

function FriendProfilePage(){
    const { state } = useLocation();
    const friendId = state.friendId

    useEffect(function(){
        async function getFriendData(){
            const friend = await profileAPI.getFriendData(friendId)
        }
        getFriendData()

    }, [])
    

    // const bio = user.biography
    // const location = user.location
  
    // if(!friend){
    //     return(
    //         <p>loading...</p>
    //     )
    // }

    return(
        <p>anything</p>
    )
}

export default FriendProfilePage

