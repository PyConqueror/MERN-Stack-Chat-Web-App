import * as profileAPI from '../../utilities/profile-api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

function ProfilePage({user}){
    const bio = user.biography
    const location = user.location
    const navigate = useNavigate()

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
                <h1 className='username'>{user.name}</h1>
                <div className='text-container'>
                    <h3>Location:</h3>
                    <p>{ location.length === 0 ? "No Location" : location }</p>
                </div>
                <div className='text-container'>
                    <h3>About me:</h3>
                    <p>{ bio.length === 0 ? "No Biography" : bio }</p>
                </div>
                <button onClick={_handleClick}>Edit Profile</button>
            </div>
        </div>
    )
}

export default ProfilePage