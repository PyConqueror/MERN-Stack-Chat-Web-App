import PostItem from "./PostItem"



const PostList = ({ posts }) => {

    if(!posts){
        return(
            <>
                <p>No posts</p>
            </>
        )
    }
    
    return (
        <div>
            {posts.map((p, index) => <PostItem post={p} key={index} />)}
            <p>post list coming</p>
        </div>
            
    );
}

export default PostList;