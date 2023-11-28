// This is for the logged-in user to edit their own profile
//   Display form with the logged-in user's current details prefilled
//   Include editable fields for Email, Bio, Interests, etc.
//   Include a save button to update the user's profile information

import * as profileAPI from '../../utilities/profile-api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProfilePage({user}){
    const bio = user.biography
    const location = user.location
    const navigate = useNavigate()

    function _handleClick(){
        navigate('/profile/edit') 
    }

    return(
        <>
            <p>{user.name}</p>
            <div className={user.avatar.startsWith('hsl') ? "profile-image" : "profile-image-large"}
            style={user.avatar.startsWith('hsl') 
            ? { backgroundColor: user.avatar } : { backgroundImage: `url(${user.avatar})`}}>
                <p>{ user.avatar.startsWith('hsl') ? user.name.charAt(0) : ""}</p>
            </div>
            <p>Biography:</p>
            <p>{ bio.length === 0 ? "No Biography" : bio }</p>
            <p>Location:</p>
            <p>{ location.length === 0 ? "No Location" : location }</p>
            <button onClick={_handleClick}>Edit Profile</button>
        </>
    )
}

export default ProfilePage