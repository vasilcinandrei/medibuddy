import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "./hooks/useAuth";
import axios from './api/axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import React from "react";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const REGISTER_URL = 'signup/doctor';


const EditPatients = () => {

    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();
    const { auth } = useAuth();
    const theToken = auth?.token;
    const { id } = useParams();
    const REGISTER_URL = 'doctor/patients/' + id;
    const { data: user, error, isPending } = useFetch('http://ec2-34-234-75-154.compute-1.amazonaws.com/api/doctor/patients/' + id);

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



    const inputRef = useRef(null);



    useEffect(() => {
        setValidName(USER_REGEX.test(username));
        setlast_name(last_name);

    }, [username])

    useEffect(() => {
        if (user) {
            setlast_name(user.user.last_name);
            setfirst_name(user.user.first_name);
            setCNP(user.cnp);
            setBirthday(user.birthday);
            setEmail(user.user.email);
            setState(user.state);
            setStreet(user.street);
            setCity(user.city);
            setPhone(user.phone);
            setProfession(user.profession);
            setAlergies(user.alergies);
            setWorkplace(user.workplace);
        }


    }, [user])

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
        const v1 = USER_REGEX.test(user.user.username);
        const v2 = PWD_REGEX.test(user.user.password);
        // console.log(user.user.last_name);
        console.log("<<", alergies);
        console.log("<<", first_name);
        console.log("<<", last_name);
        if (!v1) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.patch(REGISTER_URL,
                JSON.stringify(
                    {
                        "user": {
                            // "username": user.user.username,
                            "email": email,
                            // "password": user.user.password,
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
    // console.log(">>>", user.user.first_name);
    console.log(">>>", user);


    return (
        <>
            {success ? navigate('/medic-main-page') : (
                <section className='medic-login-block'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit} className="registerForm">

                        <label htmlFor="first_name" className="registerLabel">
                            First Name:
                        </label>
                        {user && (<input
                            className="registerInput"
                            type="text"
                            id="first_name"
                            ref={inputRef}
                            autoComplete="on"
                            onChange={(e) => setfirst_name(e.target.value)}
                            onLoad={(e) => setfirst_name(e.target.value)}
                            defaultValue={user.user.first_name}
                            // defaultValue={first_name}
                            required
                        // aria-invalid={validName ? "false" : "true"}
                        // aria-describedby="uidnote"
                        // onFocus={() => setUserFocus(true)}
                        // onBlur={() => setUserFocus(false)}
                        />
                        )}

                        <label htmlFor="last_name" className="registerLabel">
                            Last Name:
                        </label>
                        {user && (<input
                            className="registerInput"
                            type="text"
                            id="last_name"
                            ref={inputRef}
                            autoComplete="off"
                            onLoad={(e) => setlast_name(e.target.value)}
                            onChange={(e) => setlast_name(e.target.value)}

                            defaultValue={user.user.last_name}
                            // defaultValue={last_name}
                            required
                        // aria-invalid={validName ? "false" : "true"}
                        // aria-describedby="uidnote"
                        // onFocus={() => setUserFocus(true)}
                        // onBlur={() => setUserFocus(false)}
                        />
                        )}

                        <label htmlFor="email" className="registerLabel">
                            Email:
                        </label>
                        {user && (<input
                            className="registerInput"
                            type="text"
                            id="email"
                            ref={inputRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            onLoad={(e) => setEmail(e.target.value)}
                            defaultValue={user.user.email}
                            // defaultValue={email}
                            required
                        // aria-invalid={validName ? "false" : "true"}
                        // aria-describedby="uidnote"
                        // onFocus={() => setUserFocus(true)}
                        // onBlur={() => setUserFocus(false)}
                        />
                        )}
                        <label htmlFor="cnp" className="registerLabel">
                            CNP:
                        </label>
                        {user && (<input
                            className="registerInput"
                            type="text"
                            id="cnp"
                            ref={inputRef}
                            autoComplete="off"
                            onChange={(e) => setCNP(e.target.value)}
                            onLoad={(e) => setCNP(e.target.value)}
                            defaultValue={user.cnp}
                            // defaultValue={cnp}
                            required

                        />
                        )}
                        <label htmlFor="Birthday" className="registerLabel">
                            Birthday:
                        </label>
                        {user && (<input
                            className="registerInput"
                            type="date"
                            id="birthday"
                            ref={inputRef}
                            autoComplete="off"
                            onChange={(e) => setBirthday(e.target.value)}
                            onLoad={(e) => setBirthday(e.target.value)}
                            defaultValue={user.birthday}
                            // defaultValue={birthday}
                            required

                        />)}
                        <label htmlFor="Street" className="registerLabel">
                            Street:
                        </label>
                        {user && (<input
                            className="registerInput"
                            type="text"
                            id="street"
                            ref={inputRef}
                            autoComplete="off"
                            onChange={(e) => setStreet(e.target.value)}
                            onLoad={(e) => setStreet(e.target.value)}
                            defaultValue={user.street}
                            // defaultValue={street}
                            required

                        />)}
                        <label htmlFor="City" className="registerLabel">
                            City:
                        </label>
                        {user && (<input
                            className="registerInput"
                            type="text"
                            id="city"
                            ref={inputRef}
                            autoComplete="off"
                            onChange={(e) => setCity(e.target.value)}
                            onLoad={(e) => setCity(e.target.value)}
                            defaultValue={user.city}
                            // defaultValue={city}
                            required

                        />)}
                        <label htmlFor="State" className="registerLabel">
                            State:
                        </label>
                        {user && (<input
                            className="registerInput"
                            type="text"
                            id="state"
                            ref={inputRef}
                            autoComplete="off"
                            onChange={(e) => setState(e.target.value)}
                            onLoad={(e) => setState(e.target.value)}
                            defaultValue={user.state}
                            // defaultValue={state}
                            required

                        />)}
                        <label htmlFor="phone" className="registerLabel">
                            Phone:
                        </label>
                        {user && (<input
                            className="registerInput"
                            type="number"
                            id="phone"
                            ref={inputRef}
                            autoComplete="off"
                            onChange={(e) => setPhone(e.target.value)}
                            onLoad={(e) => setPhone(e.target.value)}
                            defaultValue={user.phone}
                            // defaultValue={phone}
                            required

                        />)}
                        <label htmlFor="Profession" className="registerLabel">
                            Profession:
                        </label>
                        {user && (<input
                            className="registerInput"
                            type="text"
                            id="profession"
                            ref={inputRef}
                            autoComplete="off"
                            onChange={(e) => setProfession(e.target.value)}
                            onLoad={(e) => setProfession(e.target.value)}
                            defaultValue={user.profession}
                            // defaultValue={profession}
                            required

                        />)}
                        <label htmlFor="Workplace" className="registerLabel">
                            Workplace:
                        </label>
                        {user && (<input
                            className="registerInput"
                            type="text"
                            id="workplace"
                            ref={inputRef}
                            autoComplete="off"
                            onChange={(e) => setWorkplace(e.target.value)}
                            onLoad={(e) => setWorkplace(e.target.value)}
                            defaultValue={user.workplace}
                            // defaultValue={workplace}
                            required

                        />)}
                        <label htmlFor="Alergies" className="registerLabel">
                            Alergies:
                        </label>
                        {user && (<input
                            className="registerInput"
                            type="text"
                            id="alergies"
                            ref={inputRef}
                            autoComplete="off"
                            onChange={(e) => setAlergies(e.target.value)}
                            onLoad={(e) => setAlergies(e.target.value)}
                            defaultValue={user.alergies}
                            // defaultValue={alergies}
                            required

                        />)}


                        <button className="registerButton">Update Patient</button>
                    </form>

                </section>
            )}
        </>
    )
}

export default EditPatients
