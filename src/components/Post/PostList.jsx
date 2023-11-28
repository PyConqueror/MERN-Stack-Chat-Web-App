import PostItem from "./PostItem"



const PostList = ({posts}) => {
    return (
        <div>
            {posts.map((p, index) => <PostItem post={p} key={index} />)}
        </div>
            
    );
}

export default PostList;