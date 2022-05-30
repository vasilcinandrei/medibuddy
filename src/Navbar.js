import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>MediBuddy</h1>
      <div className="links">
        <Link to="/">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Log In</Link>
      </div>
    </nav>
  );
}

export default Navbar;