import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import PostEntry from "./PostEntry";

const NewPost = () => {
  const { auth } = useAuth();
  const [showPostEntry, setShowPostEntry] = useState(false);
  return (
    <>
      {showPostEntry ? (
        <PostEntry />
      ) : (
        <div className="rounded-md border border-gray-500 px-4 py-4 lg:px-7 lg:py-5">
          <div className="flex-center mb-3 gap-2 lg:gap-4">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-14.5 lg:max-w-14.5"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${auth?.user?.avatar}`}
              alt="avatar"
            />

            <div className="flex-1">
              <textarea
                onClick={() => setShowPostEntry(true)}
                className="h-16 w-full rounded-md border border-gray-500 p-3 focus:outline-none sm:h-20 sm:p-6"
                name="post"
                id="post"
                placeholder="What's on your mind?"
              ></textarea>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPost;
