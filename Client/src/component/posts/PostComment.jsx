import { useState } from "react";
import PostCommentList from "./PostCommentList";
import { useAxios } from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";

const PostComment = ({ post }) => {
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const { api } = useAxios();
  const { auth } = useAuth();

  const addComment = async (e) => {
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      try {
        const response = await api.patch(`/posts/${post.id}/comment`, {comment});
        if (response.status === 200) {
          setComments([...response.data.comments]);
          setComment("")
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="max-w-7 max-h-7 rounded-full lg:max-h-8.5 lg:max-w-8.5"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/${auth?.user?.avatar}`}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => addComment(e)}
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs border border-black focus:outline-none sm:h-9.5"
            name="post"
            id="post"
            placeholder="What's on your mind?"
          />
        </div>
      </div>
      <div onClick={() => setShowComment(!showComment)} className="mt-4">
        <button className="text-gray-600 max-md:text-sm">All Comment ▾</button>
      </div>
      {showComment && <PostCommentList comments={comments} />}
    </div>
  );
};

export default PostComment;
