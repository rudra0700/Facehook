import { useProfile } from "../../hooks/useProfile";
import EditIcon from "../../assets/icons/edit.svg";
import CheckIcon from "../../assets/icons/check.svg";
import { useState } from "react";
import { actions } from "../../actions";
import { useAxios } from "../../hooks/useAxios";
const Bio = () => {
  const { api } = useAxios();
  const { state, dispatch } = useProfile();
  const [bio, setBio] = useState(state?.user?.bio);
  const [editMode, setEditMode] = useState(false);

  const handleEditBio = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const response = await api.patch(`/profile/${state?.user?.id}`, { bio });
      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response.data,
        });
      }

      setEditMode(false);
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };
  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!editMode ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {state?.user?.bio}
          </p>
        ) : (
          <textarea
            className='p-2 className="leading-[188%] text-gray-600 lg:text-lg rounded-md'
            value={bio}
            rows={5}
            cols={55}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        )}
      </div>
      {!editMode ? (
        <button
          onClick={() => setEditMode(true)}
          className="flex-center h-7 w-7 rounded-full"
        >
          <img className="bg-gray-500" src={EditIcon} alt="Edit" />
        </button>
      ) : (
        <button
          onClick={handleEditBio}
          className="flex-center h-7 w-7 rounded-full"
        >
          <img className="bg-gray-500" src={CheckIcon} alt="Check" />
        </button>
      )}
    </div>
  );
};

export default Bio;
