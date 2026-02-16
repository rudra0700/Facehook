import Header from "../common/Header";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router";
import ProfileProvider from "../providers/ProfileProvider";

const PrivateRoutes = () => {
  const { auth } = useAuth();
  return (
    <div>
      {auth?.authToken ? (
        <>
        <ProfileProvider>
          <Header />
          <main className="mx-auto max-w-255 py-8">
            <div className="container">
              <Outlet />
            </div>
          </main>

        </ProfileProvider>
        </>
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
};

export default PrivateRoutes;
