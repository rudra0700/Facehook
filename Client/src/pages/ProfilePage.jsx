import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useAxios } from "../hooks/useAxios";
import { actions } from "../actions";
import { useProfile } from "../hooks/useProfile";
import ProfileInfo from "../component/profle/ProfileInfo";
import MyPosts from "../component/profle/MyPosts";

const ProfilePage = () => {
  // const [user, setUser] = useState(null);
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const { state, dispatch } = useProfile();

  const { auth } = useAuth();
  const { api } = useAxios();
  useEffect(() => {
    const fetchProfile = async () => {
      dispatch({ type: actions.profile.DATA_FETCHING });
      try {
        const response = await api.get(`/profile/${auth?.user?.id}`);

        console.log(response);

        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            data: response?.data,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  if (state?.loading) {
    return <p>fetching profile....</p>;
  }

  return (
    <>
      <ProfileInfo />
      <MyPosts />
    </>
  );
};

export default ProfilePage;
