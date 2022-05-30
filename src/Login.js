import { Link } from "react-router-dom";
const Login = () => {
    return (
        <div className="login-block">

            <h4>Select the login option:</h4>
            <div className="links">
                <Link to="/login-medic">Medic</Link>
                <Link to="/login-pacient">Pacient</Link>
            </div>


        </div>
    );
}

export default Login;