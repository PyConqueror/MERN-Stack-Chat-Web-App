import * as profileAPI from '../../utilities/my-profile-api'
import { useState, useRef } from 'react'

function EditProfilePage({ user }){
    const [profileImage, setProfileImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileRef = useRef()

    const bio = user.biography
    const location = user.location
    const cloudinaryPreset = import.meta.env.VITE_CLOUDINARY

    function _handleImageChange(event){
        setProfileImage(event.target.files[0])
        setImagePreview(URL.createObjectURL(event.target.files[0]))
    }

    async function _uploadImage(event){
        event.preventDefault()
        setIsLoading(true)
        try {
            let imageURL = '';
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
                console.log(imageData)
                imageURL = imageData.url.toString()
                setImagePreview(null)
                setIsLoading(false)
                fileRef.current.value = null
            }
            //do something with image URL
        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }
    }

    return(
        <>
            <p>{user.name}</p>
            <div className="profile-image" style={user.avatar.startsWith('hsl') 
            ? { backgroundColor: user.avatar } : { backgroundImage: `url(${user.avatar})`}}>
                {user.name.charAt(0)}
            </div>
            <form onSubmit ={_uploadImage}>
                <input 
                    type="file" 
                    accept="image/png, image/jpg" 
                    name="image" 
                    onChange={_handleImageChange}
                    ref={ fileRef }></input><br/>
            <p>
                {
                    isLoading ? ("Uploading ...") : 
                    <button type="sbumit">Upload new profile picture</button>
                }
            </p>
            </form>
            <div>
                { imagePreview && (
                    <img src={imagePreview && imagePreview} />
                )}
            </div>

            <p>Current biography:</p>
            <p>{ bio.length === 0 ? "No Biography" : bio}</p>
            <textarea></textarea>
            <button >Edit Biography</button>
            <p>Current location:</p>
            <p>{ location.length === 0 ? "No Location" : bio}</p>
            <input type="text"></input>
            <button>Edit Location</button>
        </>
    )
}

export default EditProfilePage