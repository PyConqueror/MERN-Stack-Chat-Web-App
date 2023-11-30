import { useParams, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import * as communityService from '../../utilities/community-api'

const EditCommunityPage = () => {
    const { communityId } = useParams();
    const [currentCommunity, setCurrentCommunity] = useState([])
    const [updatedCommunity, setUpdatedCommunity] = useState({
        communityId: communityId,
        name: currentCommunity.name,
        description: currentCommunity.description,
        coverPhoto: currentCommunity.coverPhoto,
        category: currentCommunity.category,
    })
    const [communityImage, setCommunityImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileRef = useRef()
    const cloudinaryPreset = import.meta.env.VITE_CLOUDINARY
    let newCommunityImageURL = ''
    const navigate = useNavigate()

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

    useEffect(function(){
        async function fetchCommunity(){
            const currentCommunity = await communityService.getOneCommunity(communityId)
            setCurrentCommunity(currentCommunity)
            setUpdatedCommunity(currentCommunity)
        }
        fetchCommunity()
    }, [])

    function _handleChange(event) {
        const { name, value } = event.target;
        setUpdatedCommunity({ ...updatedCommunity, [name]: value });
    };

    async function updateCommunityImage(newCommunityImageURL){
        setUpdatedCommunity({
            ...updatedCommunity,
            coverPhoto: newCommunityImageURL 
        })
    }

    async function _handleSubmit(event){
        event.preventDefault();
        try {
            await communityService.updateCommunity(updatedCommunity)
            navigate(`/communities/communities/${currentCommunity._id}`)
        } catch (err) {
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
            <h1>Edit community</h1>
            <form onSubmit={_handleSubmit}>
                <p>Current community name: {currentCommunity.name}</p>
                <label>New community name:
                    <input type="text" name="name" onChange={_handleChange}/>
                </label>
                <p>Current Description: {currentCommunity.description}</p>
                <label>New description:
                    <textarea name="description" onChange={_handleChange}></textarea>
                </label>
                <p>Current category: {currentCommunity.category}</p>
                <label>Choose a new category:
                    <select name="category" onChange={_handleChange}>
                        {sortedCategories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </label>
            </form>
            <br/>
            <p>Current community photo: </p>
            <img src={currentCommunity.coverPhoto} />
            <form onSubmit ={_uploadImage}>
                <input 
                    type="file" 
                    accept="image/png, image/jpg" 
                    name="image" 
                    onChange={_handleImageChange}
                    ref={ fileRef }>
                </input><br/>
                <p>
                    { communityImage ? (
                        isLoading ? (
                            "Uploading ..."
                        ) : (
                        <button>Upload community picture</button>
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

export default EditCommunityPage;