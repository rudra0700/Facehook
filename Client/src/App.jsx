import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} exact></Route>
        <Route path="/me" element={<ProfilePage />} ></Route>
        <Route path="/register" element={<RegisterPage />} ></Route>
        <Route path="/login" element={<LoginPage />} ></Route>
        <Route path="*" element={<NotFoundPage />} ></Route>
      </Routes>
    </div>
  );
};

export default App;
