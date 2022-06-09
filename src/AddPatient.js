import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "./hooks/useAuth";
import axios from './api/axios';
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const REGISTER_URL = 'signup/doctor';
const REGISTER_URL = 'signup/patient/ ';

const AddPatient = () => {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();
    const { auth } = useAuth();
    const theToken = auth?.token;

    const [username, setUserName] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [first_name, setfirst_name] = useState('');
    const [last_name, setlast_name] = useState('');
    const [email, setEmail] = useState('');

    const [cnp, setCNP] = useState('');
    const [birthday, setBirthday] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [phone, setPhone] = useState('');
    const [profession, setProfession] = useState('');
    const [workplace, setWorkplace] = useState('');

    const [alergies, setAlergies] = useState('');

    const [is_doctor, setis_doctor] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);



    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg('');
    }, [username, first_name, last_name, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify(
                    {
                        "user": {
                            "username": username,
                            "email": email,
                            "password": password,
                            "first_name": first_name,
                            "last_name": last_name
                        },
                        "cnp": cnp,
                        "birthday": birthday,
                        "street": street,
                        "city": city,
                        "state": state,
                        "phone": phone,
                        "profession": profession,
                        "workplace": workplace,
                        "records": "",
                        "alergies": alergies,
                        "cardio_check": ""
                    }

                ),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Request-Private-Network': true,
                        'Authorization': `Token ${theToken}`

                    },
                    withCredentials: true
                }
            );

            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUserName('');
            setfirst_name('');
            setlast_name('');
            setPassword('');
            setMatchPassword('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }
    console.log(">>>", username, password, first_name, last_name, email, is_doctor);
    return (
        <>
            {success ? navigate('/medic-main-page') : (
                <section className='medic-login-block'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit} className="registerForm">
                        <label htmlFor="username" className="registerLabel">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !username ? "hide" : "invalid"} />
                        </label>
                        <input
                            className="registerInput"
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUserName(e.target.value)}
                            value={username}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="first_name" className="registerLabel">
                            First Name:
                        </label>
                        <input
                            className="registerInput"
                            type="text"
                            id="first_name"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setfirst_name(e.target.value)}
                            value={first_name}
                            required
                        // aria-invalid={validName ? "false" : "true"}
                        // aria-describedby="uidnote"
                        // onFocus={() => setUserFocus(true)}
                        // onBlur={() => setUserFocus(false)}
                        />

                        <label htmlFor="last_name" className="registerLabel">
                            Last Name:
                        </label>
                        <input
                            className="registerInput"
                            type="text"
                            id="last_name"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setlast_name(e.target.value)}
                            value={last_name}
                            required
                        // aria-invalid={validName ? "false" : "true"}
                        // aria-describedby="uidnote"
                        // onFocus={() => setUserFocus(true)}
                        // onBlur={() => setUserFocus(false)}
                        />

                        <label htmlFor="email" className="registerLabel">
                            Email:
                        </label>
                        <input
                            className="registerInput"
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        // aria-invalid={validName ? "false" : "true"}
                        // aria-describedby="uidnote"
                        // onFocus={() => setUserFocus(true)}
                        // onBlur={() => setUserFocus(false)}
                        />

                        <label htmlFor="cnp" className="registerLabel">
                            CNP:
                        </label>
                        <input
                            className="registerInput"
                            type="text"
                            id="cnp"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setCNP(e.target.value)}
                            value={cnp}
                            required

                        />
                        <label htmlFor="Birthday" className="registerLabel">
                            Birthday:
                        </label>
                        <input
                            className="registerInput"
                            type="date"
                            id="birthday"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setBirthday(e.target.value)}
                            value={birthday}
                            required

                        />
                        <label htmlFor="Street" className="registerLabel">
                            Street:
                        </label>
                        <input
                            className="registerInput"
                            type="text"
                            id="street"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setStreet(e.target.value)}
                            value={street}
                            required

                        />
                        <label htmlFor="City" className="registerLabel">
                            City:
                        </label>
                        <input
                            className="registerInput"
                            type="text"
                            id="city"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                            required

                        />
                        <label htmlFor="State" className="registerLabel">
                            State:
                        </label>
                        <input
                            className="registerInput"
                            type="text"
                            id="state"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setState(e.target.value)}
                            value={state}
                            required

                        />
                        <label htmlFor="phone" className="registerLabel">
                            Phone:
                        </label>
                        <input
                            className="registerInput"
                            type="number"
                            id="phone"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            required

                        />
                        <label htmlFor="Profession" className="registerLabel">
                            Profession:
                        </label>
                        <input
                            className="registerInput"
                            type="text"
                            id="profession"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setProfession(e.target.value)}
                            value={profession}
                            required

                        />
                        <label htmlFor="Workplace" className="registerLabel">
                            Workplace:
                        </label>
                        <input
                            className="registerInput"
                            type="text"
                            id="workplace"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setWorkplace(e.target.value)}
                            value={workplace}
                            required

                        />
                        <label htmlFor="Alergies" className="registerLabel">
                            Alergies:
                        </label>
                        <input
                            className="registerInput"
                            type="text"
                            id="alergies"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setAlergies(e.target.value)}
                            value={alergies}
                            required

                        />

                        <label htmlFor="password" className="registerLabel">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                        </label>
                        <input
                            className="registerInput"
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd" className="registerLabel">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
                        </label>
                        <input
                            className="registerInput"
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPassword}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button className="registerButton" disabled={!validName || !validPassword || !validMatch ? true : false}>Sign Up</button>
                    </form>

                </section>
            )}
        </>
    )
}

export default AddPatient