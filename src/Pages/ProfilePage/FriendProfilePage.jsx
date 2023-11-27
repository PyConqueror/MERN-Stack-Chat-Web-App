import { useLocation } from 'react-router-dom'

function FriendProfilePage(){
    const { state } = useLocation();
    const friendId = state.friendId

    
    // const bio = user.biography
    // const location = user.location
  
    return(
        <p>anything</p>
    )
}

export default FriendProfilePage


// <p>{user.name}</p>
// <div className="profile-image" 
// style={user.avatar.startsWith('hsl') 
// ? { backgroundColor: user.avatar } : { backgroundImage: `url(${user.avatar})`}}>
//     <p>{ user.avatar.startsWith('hsl') ? user.name.charAt(0) : ""}</p>
// </div>
// <p>Biography:</p>
// <p>{ bio.length === 0 ? "No Biography" : bio }</p>
// <p>Location:</p>
// <p>{ location.length === 0 ? "No Location" : location }</p>
// <button onClick={_handleClick}>Edit Profile</button>