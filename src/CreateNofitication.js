import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "./hooks/useAuth";
import axios from './api/axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import React from "react";
import { useLocation } from 'react-router-dom';

const CreateNotification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const userRef = useRef();
    const errRef = useRef();
    const { auth } = useAuth();
    const theToken = auth?.token;
    const [title, setTitle] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [active, setActive] = useState(true);

    const [Cdate, setDate] = useState(new Date().toLocaleDateString());


    const [message, setMessage] = useState();
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const NOTIF_URL = 'doctor/notifications/';
    const { data: pacient, error2, isPending2 } = useFetch('http://ec2-34-234-75-154.compute-1.amazonaws.com/api/doctor/patients/' + location.state.id);
    const { data: doctor, error, isPending } = useFetch('http://ec2-34-234-75-154.compute-1.amazonaws.com/api/doctor/profile');


    console.log("doctor", doctor);
    console.log("pacient", pacient);
    // console.log("date-formated", formatDate(Cdate));
    // console.log("date", Cdate);


    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    useEffect(() => {
        userRef.current.focus();
    }, [])
    useEffect(() => {
        setErrMsg('');
    }, [title, message, start_date, end_date])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack

        try {
            const response = await axios.post(NOTIF_URL,
                JSON.stringify(
                    {

                        "patient_id": pacient.user.id,
                        // "sender": title,
                        "message": message,
                        "created_on": Cdate,
                        "active": active,
                        "start_date": start_date,
                        "end_date": end_date,
                        "doctor": doctor.user.id
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
            // setTitle('');
            // setMessage('');
            // setStartDate('');
            // setEndDate('')
            // setlast_name('');
            // setPassword('');
            // setMatchPassword('');
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



    return (

        <>

            {success ? navigate('/medic-main-page') : (

                <section className='medic-login-block'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    {pacient && doctor && (
                        <h1>Add new notification for {pacient.user.first_name} {pacient.user.last_name}</h1>
                    )}
                    <form onSubmit={handleSubmit} className="registerForm">



                        <label htmlFor="message" className="registerLabel">
                            Message
                        </label>
                        <input
                            className="registerInput"
                            type="text"
                            id="message"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            required
                        // aria-invalid={validName ? "false" : "true"}
                        // aria-describedby="uidnote"
                        // onFocus={() => setUserFocus(true)}
                        // onBlur={() => setUserFocus(false)}
                        />

                        <label htmlFor="start_date" className="registerLabel">
                            Start Date
                        </label>
                        <input
                            className="registerInput"
                            type="date"
                            id="start_date"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setStartDate(e.target.value)}
                            value={start_date}
                            required
                        // aria-invalid={validName ? "false" : "true"}
                        // aria-describedby="uidnote"
                        // onFocus={() => setUserFocus(true)}
                        // onBlur={() => setUserFocus(false)}
                        />
                        <label htmlFor="end_date" className="registerLabel">
                            End Date
                        </label>
                        <input
                            className="registerInput"
                            type="date"
                            id="end_date"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEndDate(e.target.value)}
                            value={end_date}
                            required
                        // aria-invalid={validName ? "false" : "true"}
                        // aria-describedby="uidnote"
                        // onFocus={() => setUserFocus(true)}
                        // onBlur={() => setUserFocus(false)}
                        />








                        <button className="registerButton" >Add Notification</button>
                    </form>

                </section>
            )}
        </>

    );
}

export default CreateNotification;