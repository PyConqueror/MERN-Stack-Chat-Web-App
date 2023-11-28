import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as communityService from '../../utilities/community-api'

function CreateCommunityPage() {
    const [groupImage, setGroupImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileRef = useRef()
    const cloudinaryPreset = import.meta.env.VITE_CLOUDINARY
    let newGroupImageURL = ''

    const navigate = useNavigate();
    const categories = [
        "Technology", "Books", "Fitness", "Travel",
        "Art", "Language Exchange", "Environment",
        "Career Development", "Food", "Gaming",
        "Music", "Film & Television", "Fashion",
        "Health & Wellness", "Sports", "Education",
        "Business", "Photography", "Science",
        "DIY & Crafts", "All"
    ];
    const sortedCategories = categories.slice().sort()

    const [newCommunity, setNewCommunity] = useState({
        name: '',
        description: '',
        coverPhoto: '',
        category: 'All',
    });

    function _handleChange(event) {
        const { name, value } = event.target;
        setNewCommunity({ ...newCommunity, [name]: value });
    };

    async function updateGroupImage(newGroupImageURL){
        setNewCommunity((newCommunity) => ({ 
            ...newCommunity,
            coverPhoto: newGroupImageURL 
        }))
    }

    async function _handleSubmit(event) {
        event.preventDefault()
        try{
            const newGroup = await communityService.createGroup(newCommunity)
            navigate(`/community/${encodeURIComponent(newGroup._id)}`);
        } catch (err){
            console.log(err)
        }
    }

    function _handleImageChange(event){
        setGroupImage(event.target.files[0])
        setImagePreview(URL.createObjectURL(event.target.files[0]))
    }

    async function _uploadImage(event){
        event.preventDefault()
        setIsLoading(true)
        try {
            if(
                groupImage && (
                    groupImage.type === "image/png" ||
                    groupImage.type === "image/jpg" ||
                    groupImage.type === "image/jpeg" ||
                    groupImage.type === "image/JPG"
                )
            ){
                const image = new FormData()
                image.append("file", groupImage)
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
                newGroupImageURL = imageData.url.toString()
                console.log(imageData)
                setImagePreview(null)
                setIsLoading(false)
                fileRef.current.value = null
                setGroupImage(null)
            }
            updateGroupImage(newGroupImageURL)
            
        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }
    }

    return (
        <div className='content-container'>
            <h1>Create new community form</h1>
            <form>
                <label>Community name:
                    <input name="name" type="text" onChange={_handleChange}/>
                </label>

                <label >Description:
                    <textarea name="description" cols="30" rows="10" onChange={_handleChange}></textarea>
                </label>

                <label>Choose a category:
                <select name="category" onChange={_handleChange}>
                    {sortedCategories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>   
                </label>
            </form><br/>
            <form onSubmit ={_uploadImage}>
                <input 
                    type="file" 
                    accept="image/png, image/jpg" 
                    name="image" 
                    onChange={_handleImageChange}
                    ref={ fileRef }>
                </input><br/>
                <p>
                    { groupImage ? (
                        isLoading ? (
                            "Uploading ..."
                        ) : (
                        <button>Upload group picture</button>
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

            <button onClick={_handleSubmit}>Save</button>
 
        </div>
    );
}

export default CreateCommunityPage;