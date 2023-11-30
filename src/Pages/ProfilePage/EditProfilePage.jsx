import * as profileAPI from '../../utilities/profile-api'
import { useState, useRef, useEffect } from 'react'
import { getUser } from '../../utilities/users-service'

function EditProfilePage({ user, setUser}){
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [bioText, setBioText] = useState("")
    const [locationText, setLocationText] = useState("")

    const fileRef = useRef()
    const bio = user.biography
    const location = user.location
    const cloudinaryPreset = import.meta.env.VITE_CLOUDINARY
    let newProfileImageURL = ""

    async function updateProfileImage(newProfileImageURL){
        const token = await profileAPI.updateProfileImage(newProfileImageURL)
        localStorage.setItem('token', token);
        const updatedUser = getUser()
        setUser(updatedUser)
    }

    function _handleImageChange(event){
        setProfileImage(event.target.files[0])
        setImagePreview(URL.createObjectURL(event.target.files[0]))
    }

    function _handleBioTextChange(event){
        setBioText(event.target.value)
    }

    async function _updateBiography(event){
        event.preventDefault()
        const token = await profileAPI.updateBio(bioText)
        localStorage.setItem('token', token)
        const updatedUser = getUser()
        setUser(updatedUser)
    }

    function _handleLocationTextChange(event){
        setLocationText(event.target.value)
    }

    async function _updateLocation(event){
        event.preventDefault()
        const token = await profileAPI.updateLocation(locationText)
        localStorage.setItem('token', token)
        const updatedUser = getUser()
        setUser(updatedUser)
    }

    async function _uploadImage(event){
        event.preventDefault()
        setIsLoading(true)
        try {
            if(
                profileImage && (
                    profileImage.type === "image/png" ||
                    profileImage.type === "image/jpg" ||
                    profileImage.type === "image/jpeg" ||
                    profileImage.type === "image/JPG"
                )
            ){
                const image = new FormData()
                image.append("file", profileImage)
                image.append("cloud_name", "dbgh78xk9")
                image.append("upload_preset", cloudinaryPreset)

                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/dbgh78xk9/image/upload",
                    {
                        method: 'POST',
                        body: image
                    }
                )

                const imageData = await response.json()
                newProfileImageURL = imageData.url.toString()
                setImagePreview(null)
                setIsLoading(false)
                fileRef.current.value = null
                setProfileImage(null)
            }
            updateProfileImage(newProfileImageURL)
            
        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }
    }

    if(!user.avatar){  
        return(
            <p>loading...</p>
        )
    }

    return(
        <div className='content-container'>
            <div className='profile-edit-container'>
                <div className={user.avatar.startsWith('hsl') ? "profile-image" : "profile-image-large"}
                    style={user.avatar.startsWith('hsl') 
                        ? { backgroundColor: user.avatar } : { backgroundImage: `url(${user.avatar})`}}>
                    <p>{ user.avatar.startsWith('hsl') ? user.name.charAt(0) : ""}</p>
                </div>
                <p>{user.name}</p>
                <form onSubmit ={_uploadImage}>
                    <input 
                        type="file" 
                        accept="image/png, image/jpg" 
                        name="image" 
                        onChange={_handleImageChange}
                        ref={ fileRef }>
                    </input>
                    <p>
                        { profileImage ? (
                            isLoading ? (
                                "Uploading ..."
                            ) : (
                            <button>Upload new profile picture</button>
                            )
                        ) : ("")
                        }
                    </p>
                </form>
                <div>
                    { imagePreview && (
                        <img src={imagePreview && imagePreview} />
                    )}
                </div>
                <div>
                    <form onSubmit={_updateLocation}>
                        <label>Current location:</label>
                        <p>{ location.length === 0 ? "No Location" : location }</p>
                        <input type="text" onChange={_handleLocationTextChange}></input>
                        <button>Update Location</button>
                    </form>
                    <form  onSubmit={_updateBiography}>
                        <label>Current biography:</label>
                        <p>{ bio.length === 0 ? "No Biography" : bio }</p>
                        <textarea onChange={_handleBioTextChange}></textarea>
                        <button>Update Biography</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProfilePage