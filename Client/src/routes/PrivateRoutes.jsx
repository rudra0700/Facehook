import Header from "../common/Header";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router";
import ProfileProvider from "../providers/ProfileProvider";
import PostProvider from "../providers/PostProvider";

const PrivateRoutes = () => {
  const { auth } = useAuth();
  return (
    <div>
      {auth?.authToken ? (
        <>
          <PostProvider>
            <ProfileProvider>
              <Header />
              <main className="mx-auto max-w-255 py-8">
                <div className="container">
                  <Outlet />
                </div>
              </main>
            </ProfileProvider>
          </PostProvider>
        </>
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
};

export default PrivateRoutes;
