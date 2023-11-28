import { useState } from "react";
import * as communityServices from '../../utilities/community-api'

const CreatePost = () => {
    const [newPost, setNewPost] = useState({
        
    })

    const _handleAddPost = (event) => {
        event.preventDefault();
        addPost({ text: newPost });
        setNewPost("");
    }

    return (
        <>
            <form onSubmit={_handleAddPost}>
                <input 
                    placeholder="Enter a post"
                    value={newPost}
                    onChange={(event) => setNewPost(event.target.value)}
                    required
                />
                <button type="submit">SUBMIT POST</button>
            </form>
        </>
    );
}

export default CreatePost;