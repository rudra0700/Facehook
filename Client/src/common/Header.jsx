import Logo from "../assets/images/logo.svg";
import HomeIcon from "../assets/icons/home.svg";
import Notification from "../assets/icons/notification.svg";
import Avatar from "../assets/images/avatars/avatar_1.png";
import Logout from "../component/auth/Logout";
import { useAuth } from "../hooks/useAuth";

import { Link } from "react-router";

const Header = () => {
 const {auth} = useAuth()
  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Link to="/">
          <img className="max-w-25 lg:max-w-35" src={Logo} alt="logo" />
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/" className="flex-center gap-2 rounded-md bg-lighterDark px-5 py-2.5 text-sm font-medium text-white hover:bg-deepDark lg:text-lg">
            <img src={HomeIcon} alt="Home" />
          </Link>
          <button className="flex-center rounded-md bg-lighterDark  p-1.5  font-medium  text-white hover:bg-deepDark">
            <img src={Notification} alt="Notification" />
          </button>

          <Logout />

          <Link to="/me" className="flex-center ml-8 gap-3">
            <span className="text-lg font-medium lg:text-xl text-white">{auth?.user?.firstName}</span>
            <img
              className="max-h-8 max-w-8 lg:max-h-11 lg:max-w-11"
              src={Avatar}
              alt="avatar"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
