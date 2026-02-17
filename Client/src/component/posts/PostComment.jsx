import { useState } from "react";
import { useAvatar } from "../../hooks/useAvatar";
import PostCommentList from "./PostCommentList";

const PostComment = ({ post }) => {
  const { avatarURL } = useAvatar(post);
  const [showComment, setShowComment] = useState(false)
  return (
    <div>
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="max-w-7 max-h-7 rounded-full lg:max-h-8.5 lg:max-w-8.5"
          src={avatarURL}
          alt="avatar"
        />

        <div className="flex-1">
          <input
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
      {
        showComment && ( <PostCommentList comments={post?.comments} />)
      }
     
    </div>
  );
};

export default PostComment;
