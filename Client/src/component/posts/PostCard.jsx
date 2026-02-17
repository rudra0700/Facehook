import PostAction from "./PostAction";
import PostBody from "./PostBody";
import PostComment from "./PostComment";
import PostHeader from "./PostHeader";

const PostCard = ({post}) => {
  return (
    <article className="card mt-6 lg:mt-8 border border-gray-200 py-1 px-2 rounded-md">
      <PostHeader post={post} />
      <PostBody poster={post?.image} content={post?.content} />
      <PostAction postId={post?.id}
                commentCount={post?.comments?.length} />
      <PostComment post={post}/>
    </article>
  );
};

export default PostCard;
