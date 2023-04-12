import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import style from './Navbar.module.scss'

export const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const logoutHandler = () => {
    logout();
  };
  return (
    <div className={style.container}>
      <div>
        <Link to="/"> Create</Link>
      </div>
      <div>
        <Link to="/links">Links</Link>
      </div>
      <div>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
};
