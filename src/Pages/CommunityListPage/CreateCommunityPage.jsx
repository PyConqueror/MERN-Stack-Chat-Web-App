import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as communityService from '../../utilities/community-api'
import './index.css'

function CreateCommunityPage({ user }) {
    const [communityImage, setCommunityImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileRef = useRef()
    const cloudinaryPreset = import.meta.env.VITE_CLOUDINARY
    let newCommunityImageURL = ''

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
        coverPhoto: null,
        category: 'All',
        admins: user._id 
    });

    function _handleChange(event) {
        const { name, value } = event.target;
        setNewCommunity({ ...newCommunity, [name]: value });
    };

    async function updateCommunityImage(newCommunityImageURL){
        setNewCommunity((newCommunity) => ({ 
            ...newCommunity,
            coverPhoto: newCommunityImageURL 
        }))
    }

    async function _handleSubmit(event) {
        event.preventDefault()
        try{
            await communityService.createCommunity(newCommunity)
            navigate(`/communities`);
        } catch (err){
            console.log(err)
        }
    }

    function _handleImageChange(event){
        setCommunityImage(event.target.files[0])
        setImagePreview(URL.createObjectURL(event.target.files[0]))
    }

    async function _uploadImage(event){
        event.preventDefault()
        setIsLoading(true)
        try {
            if(
                communityImage && (
                    communityImage.type === "image/png" ||
                    communityImage.type === "image/jpg" ||
                    communityImage.type === "image/jpeg" ||
                    communityImage.type === "image/JPG"
                )
            ){
                const image = new FormData()
                image.append("file", communityImage)
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
                newCommunityImageURL = imageData.url.toString()
                setImagePreview(null)
                setIsLoading(false)
                fileRef.current.value = null
                setCommunityImage(null)
            }
            updateCommunityImage(newCommunityImageURL)
            
        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }
    }

    return (
        <div className='content-container'>
            <h1>Create New Community</h1>
            <form className='create-community'>
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
            <form onSubmit ={_uploadImage} className='create-community'>
                <label>Cover Image
                <input 
                    type="file" 
                    accept="image/png, image/jpg" 
                    name="image" 
                    onChange={_handleImageChange}
                    ref={ fileRef }>
                </input><br/>
                <div>
                    { communityImage ? (
                        isLoading ? (
                            "Uploading ..."
                        ) : (
                        <button>Upload community picture</button>
                        )
                    ) : (
                        newCommunity.coverPhoto ? (
                            <div>
                                <p>Image successfully uploaded</p> 
                                <img src={newCommunity.coverPhoto}/><br/>
                                <button style={{ display: 'block', margin: '0 auto' }} onClick={_handleSubmit}>Save community</button>
                            </div>) : null
                    )}
                </div>
                </label>
            </form>
            <div>
                { imagePreview && (
                    <img src={imagePreview && imagePreview} />
                )}
            </div>
            <div>
                
            </div>
        </div>
    );
}

export default CreateCommunityPage;