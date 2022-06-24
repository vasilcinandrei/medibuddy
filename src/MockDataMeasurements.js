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
    const REGISTER_URL = 'patient/measurements/';
    const { data: user, error, isPending } = useFetch('http://ec2-34-234-75-154.compute-1.amazonaws.com/api/patient/measurements/');

    const [ecg, setEcg] = useState('');
    const [humidity, setHumidity] = useState(false);
    const [temperature, setTemperature] = useState(false);

    const [pulse, setPulse] = useState('');



    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);



    const inputRef = useRef(null);








    useEffect(() => {
        setErrMsg('');
    }, [temperature])



    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack

        // console.log(user.user.last_name);

        // if (!v1) {
        //     setErrMsg("Invalid Entry");
        //     return;
        // }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify(

                    {
                        "ecg": ecg,
                        "humidity": humidity,
                        "temperature": temperature,
                        "pulse": pulse
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
            setEcg('');
            setHumidity('');
            setPulse('');
            setTemperature('');

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
            {success ? navigate('/patient-measurements') : (
                <section className='medic-login-block'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Add Mock MEasurement</h1>
                    <form onSubmit={handleSubmit} className="registerForm">

                        <label htmlFor="ecg" className="registerLabel">
                            ECG:
                        </label>
                        {user && (<input
                            className="registerInput"
                            type="text"
                            id="ecg"
                            ref={inputRef}
                            autoComplete="on"
                            onChange={(e) => setEcg(e.target.value)}

                            // defaultValue={first_name}
                            required
                        // aria-invalid={validName ? "false" : "true"}
                        // aria-describedby="uidnote"
                        // onFocus={() => setUserFocus(true)}
                        // onBlur={() => setUserFocus(false)}
                        />
                        )}

                        <label htmlFor="temperature" className="registerLabel">
                            Temperature:
                        </label>
                        {user && (<input
                            className="registerInput"
                            type="text"
                            id="temperature"
                            ref={inputRef}
                            autoComplete="off"

                            onChange={(e) => setTemperature(e.target.value)}

                            // defaultValue={user.user.last_name}
                            // defaultValue={last_name}
                            required
                        // aria-invalid={validName ? "false" : "true"}
                        // aria-describedby="uidnote"
                        // onFocus={() => setUserFocus(true)}
                        // onBlur={() => setUserFocus(false)}
                        />
                        )}

                        <label htmlFor="Humidity" className="registerLabel">
                            Humidity:
                        </label>
                        {user && (<input
                            className="registerInput"
                            type="text"
                            id="humidity"
                            ref={inputRef}
                            autoComplete="off"
                            onChange={(e) => setHumidity(e.target.value)}
                            // onLoad={(e) => setEmail(e.target.value)}
                            // defaultValue={user.user.email}
                            // defaultValue={email}
                            required
                        // aria-invalid={validName ? "false" : "true"}
                        // aria-describedby="uidnote"
                        // onFocus={() => setUserFocus(true)}
                        // onBlur={() => setUserFocus(false)}
                        />
                        )}
                        <label htmlFor="pulse" className="registerLabel">
                            Pulse:
                        </label>
                        {user && (<input
                            className="registerInput"
                            type="text"
                            id="pulse"
                            ref={inputRef}
                            autoComplete="off"
                            onChange={(e) => setPulse(e.target.value)}
                            // onLoad={(e) => setCNP(e.target.value)}
                            // defaultValue={user.cnp}
                            // defaultValue={cnp}
                            required

                        />
                        )}





                        <button className="registerButton">Update Patient</button>
                    </form>

                </section>
            )}
        </>
    )
}

export default EditPatients
