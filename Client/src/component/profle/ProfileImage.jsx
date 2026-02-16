import { useAxios } from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";
import EditIcon from "../../assets/icons/edit.svg";
import { useRef } from "react";
import { actions } from "../../actions";

const ProfileImage = () => {
  const { api } = useAxios();
  const fileUploadRef = useRef();

  const { state, dispatch } = useProfile();

  const handleImageUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.addEventListener("change", updateImageDisplay)
    fileUploadRef.current.click();

  }

  const updateImageDisplay = async () => {
    try {
        const formData = new FormData();
        for(const file of fileUploadRef.current.files){
            formData.append("avatar", file)
        }

        const response = await api.post(`/profile/${state?.user?.id}/avatar`, formData);
        if(response.status === 200){
          dispatch({type: actions.profile.IMAGE_UPDATED, data: response.data})
        }
    } catch (error) {
      dispatch({type: actions.profile.DATA_FETCH_ERROR, error: error.message})  
    }
  }
  return (
    <div className="relative mb-8 max-h-45 max-w-45 rounded-full lg:mb-11 lg:max-h-54.5 lg:max-w-54.5">
      <img
        className="max-w-full"
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`}
        alt={state?.user?.avatar}
      />

      <form>
        <button
          onClick={handleImageUpload}
          type="submit"
          className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
        >
          <img src={EditIcon} alt="Edit" />
        </button>
        <input ref={fileUploadRef} id="file" type="file" hidden />
      </form>
    </div>
  );
};

export default ProfileImage;
