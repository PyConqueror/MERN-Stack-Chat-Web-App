// This is for the logged-in user to edit their own profile
//   Display form with the logged-in user's current details prefilled
//   Include editable fields for Email, Bio, Interests, etc.
//   Include a save button to update the user's profile information

import * as profileAPI from '../../utilities/profile-api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

function ProfilePage({user}){
    const bio = user.biography
    const location = user.location
    const navigate = useNavigate()

    console.log(user.avatar)

    function _handleClick(){
        navigate('/profile/edit') 
    }

    return(
        <div className='content-container'>
            <div className='profile-container'>
                <div className={user.avatar.startsWith('hsl') ? "profile-image" : "profile-image-large"}
                style={user.avatar.startsWith('hsl') 
                ? { backgroundColor: user.avatar } : { backgroundImage: `url(${user.avatar})`, width: '30vmin'}}>
                    <p>{ user.avatar.startsWith('hsl') ? user.name.charAt(0) : ""}</p>
                </div>
                <p>{user.name}</p>
                <p>Biography:</p>
                <p>{ bio.length === 0 ? "No Biography" : bio }</p>
                <p>Location:</p>
                <p>{ location.length === 0 ? "No Location" : location }</p>
                <button onClick={_handleClick}>Edit Profile</button>
            </div>
        </div>
    )
}

export default ProfilePage