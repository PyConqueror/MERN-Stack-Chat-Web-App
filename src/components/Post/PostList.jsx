import PostItem from "./PostItem"
import { useState, useEffect } from 'react'
import * as communityServices from '../../utilities/community-api'

const PostList = ({ user, community }) => {
    const [posts, setPosts] = useState('');

    useEffect(function(){

        async function getAllPosts(){
            const allPosts = await communityServices.getPosts(community._id)
            setPosts(allPosts)
        }
        getAllPosts()

    }, [])

    if(!posts){
        return(
            <>
                <p>No posts</p>
            </>
        )
    }
    
    return (
        <div>
            {posts.map((p, index) => <PostItem post={p} key={index} user={ user } />)}
        </div>
    );
}

export default PostList;