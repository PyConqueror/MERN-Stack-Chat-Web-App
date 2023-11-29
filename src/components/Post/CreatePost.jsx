import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import PostList from '../../components/Post/PostList';
import * as communityServices from '../../utilities/community-api'
import '../../pages/CommunityListPage/index.css'

const CreatePost = ({ user, community }) => {
    const [postImage, setPostImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileRef = useRef()
    const cloudinaryPreset = import.meta.env.VITE_CLOUDINARY
    let newPostImageURL = ''
    const navigate = useNavigate();

    const [newPost, setNewPost] = useState({
        author: user._id,
        group: community._id,
        content: '',
        images: ''
    })

    async function _handleAddPost(event){
        try{
            communityServices.createPost(newPost)
            navigate(`/community/${newPost.group}`);
        } catch (err){
            console.log(err)
        }        
        setNewPost("");
    }

    function _handleInputChange(event){
        setNewPost({
            ...newPost,
            content: event.target.value
        })
    }

    async function updatePostImage(newPostImageURL){
        setNewPost({ 
            ...newPost,
            images: newPostImageURL 
        })
    }

    function _handleImageChange(event){
        setPostImage(event.target.files[0])
        setImagePreview(URL.createObjectURL(event.target.files[0]))
    }

    async function _uploadImage(event){
        event.preventDefault()
        setIsLoading(true)
        try {
            if(
                postImage && (
                    postImage.type === "image/png" ||
                    postImage.type === "image/jpg" ||
                    postImage.type === "image/jpeg" ||
                    postImage.type === "image/JPG"
                )
            ){
                const image = new FormData()
                image.append("file", postImage)
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
                newPostImageURL = imageData.url.toString()
                setImagePreview(null)
                setIsLoading(false)
                fileRef.current.value = null
                setPostImage(null)
            }
            updatePostImage(newPostImageURL)
            
        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }
    }

    return (
        <div className="posts-container">
            <form>
                <textarea 
                    placeholder="Enter a post"
                    value={newPost.content}
                    onChange={_handleInputChange}
                    required
                >
                </textarea>
            </form>
            <form onSubmit ={_uploadImage}>
                <input 
                    type="file" 
                    accept="image/png, image/jpg" 
                    name="image" 
                    onChange={_handleImageChange}
                    ref={ fileRef }>
                </input><br/>
                <p>
                    { postImage ? (
                        isLoading ? (
                            "Uploading ..."
                        ) : (
                        <button>Upload post picture</button>
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
            <button onClick={_handleAddPost}>Submit Post</button>
            <h3>All Posts</h3>
            <div className="post-card">
                <PostList user={ user } community={ community }/>
            </div>
        </div>
    );
}

export default CreatePost;