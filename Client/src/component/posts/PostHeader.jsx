import { useState } from "react";
import ThreeDotsIcon from "../../assets/icons/3dots.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import TimeIcon from "../../assets/icons/time.svg";
import { useAvatar } from "../../hooks/useAvatar";
import { getDateDifferenceFromNow } from "../../utils";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";
import { actions } from "../../actions";

const PostHeader = ({ post }) => {
  const { auth } = useAuth();
  const { avatarURL } = useAvatar(post);
  const [showAction, setShowAction] = useState(false);
  const isMe = post?.author?.id === auth?.user?.id;
  const {api} = useAxios();
  const {dispatch} = usePost();

  const toggleAction = () => {
    setShowAction(!showAction);
  };

  const handleDelete = async () => {
    dispatch({type: actions.post.DATA_FETCHING});

    try {
      const response = await api.delete(`/posts/${post.id}`);
      if(response.status === 200){
        dispatch({type: actions.post.POST_DELETED, data: post.id})
      } 
    } catch (error) {
     dispatch({type: actions.post.DATA_FETCH_ERROR, error: error.message}) 
    }
  }
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img
          className="max-w-10 max-h-10 rounded-full lg:max-h-14.5 lg:max-w-14.5"
          src={avatarURL}
          alt="avatar"
        />
        <div>
          <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
          <div className="flex items-center gap-1.5">
            <img src={TimeIcon} alt="time" />
            <span className="text-sm text-gray-400 lg:text-base">{`${getDateDifferenceFromNow(
              post?.createAt,
            )} ago`}</span>
            <span className="text-sm text-gray-400 lg:text-base"></span>
          </div>
        </div>
      </div>

      <div className="relative">
        {isMe && (
          <button onClick={toggleAction}>
            <img src={ThreeDotsIcon} alt="3dots of Action" />
          </button>
        )}

        {showAction && (
          <div className="action-modal-container">
            <button className="action-menu-item hover:text-lwsGreen">
              <img src={EditIcon} alt="Edit" />
              Edit
            </button>
            <button onClick={handleDelete} className="action-menu-item hover:text-red-500">
              <img src={DeleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default PostHeader;
