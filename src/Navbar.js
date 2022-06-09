import useAuth from "./hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthProvider";
const Navbar = () => {
  const { auth } = useAuth();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context 
    // axios to /logout endpoint 
    setAuth({});
    navigate('/linkpage');
  }
  return (


    auth?.username ?
      < nav className="navbar" >
        <h1>MediBuddy</h1>
        <div className="links">

          <Link to="/medic-main-page">Profile</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/" onClick={logout}>Log Out</Link>
        </div>
      </nav >
      :
      < nav className="navbar" >
        <h1>MediBuddy</h1>
        <div className="links">

          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login-medic">Log In</Link>
        </div>
      </nav >
  );
}

export default Navbar;