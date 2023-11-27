import PostItem from "./PostItem"

const PostList = ({posts}) => {
    return (
        <ul>
            {posts.map((p, index) => <PostItem post={p} key={index} />)}
        </ul>
    );
}

export default PostList;