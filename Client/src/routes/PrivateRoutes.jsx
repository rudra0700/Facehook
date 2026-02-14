import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const PrivateRoutes = () => {
  const { auth } = useAuth();
  return (
    <div>
      {auth?.user ? (
        <main className="mx-auto max-w-255 py-8">
          <div className="container">
            <Outlet />
          </div>
        </main>
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
};

export default PrivateRoutes;
