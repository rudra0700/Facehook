import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";
import { useProfile } from "../../hooks/useProfile";
import AddPhoto from "../../assets/icons/addPhoto.svg";
import Field from "../../common/Field";
import { actions } from "../../actions";

const PostEntry = ({onCreate}) => {
  const { auth } = useAuth();
  const { dispatch } = usePost();
  const { api } = useAxios();
  const { state: profile } = useProfile();

  const user = profile?.user ?? auth?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handlePostSubmit = async (formData) => {
    dispatch({type: actions.post.DATA_FETCHING});

    try {
      const response = await api.post(`/posts`, {formData});
      if(response.status === 200){
        dispatch({type: actions.post.DATA_CREATED, data: response.data});
        onCreate()
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: error.message
      })
    }
  };
  return (
    <div className="rounded-md border border-[#3F3F3F] bg-mediumDark px-4 py-4 lg:px-7 lg:py-5 relative">
      <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
        Create Post
      </h6>
      <form onSubmit={handleSubmit(handlePostSubmit)}>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-14.5 lg:max-w-14.5"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firstName} {user?.lastName}{" "}
              </h6>

              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>

          <label
            className="flex-center gap-2 rounded-md text-sm font-medium lg:text-lg cursor-pointer text-gray-700"
            htmlFor="photo"
          >
            <img src={AddPhoto} alt="Add Photo" />
            Add Photo
          </label>
          <input type="file" name="photo" id="photo" className="hidden" />
        </div>
        <Field label="" error={errors.content}>
          <textarea
            {...register("content", {
              required: "Adding some text is mandatory!",
            })}
            name="content"
            id="content"
            placeholder="Share your thoughts..."
            className="h-30 w-full bg-transparent focus:outline-none lg:h-40"
          ></textarea>
        </Field>
        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            className="w-full rounded-md border border-[#CCCCCC]/14 bg-lighterDark  p-1.5 focus:outline-none lg:p-3 bg-green-500 font-bold text-white transition-all hover:opacity-90"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEntry;
