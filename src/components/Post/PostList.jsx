import PostItem from "./PostItem"
import { useState, useEffect } from 'react'
import * as communityServices from '../../utilities/community-api'

const PostList = ({ posts, setPosts, user, community }) => {
   

    if(posts === null || posts.length === 0){
        return(
            <>
                <p>No posts</p>
            </>
        )
    }
    
    return (
        <div>
            {posts.map((p, index) => <PostItem post={p} key={index} user={ user } community={ community }/> )}
        </div>
    );
}

export default PostList;