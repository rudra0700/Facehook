import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useAxios } from "../hooks/useAxios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { auth } = useAuth();
  const { api } = useAxios();
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`,
        );

        console.log(response);

        setUser(response?.data?.user);
        setPosts(response?.data?.posts);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>fetching profile....</p>;
  }

  return (
    <div>
      Welcome, {user?.firstName} {user?.lastName}
      <p>You have {posts?.length} posts.</p>
    </div>
  );
};

export default ProfilePage;
