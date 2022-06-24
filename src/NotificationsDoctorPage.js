import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import useAuth from "./hooks/useAuth";
import axios from "./api/axios";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import { useIsMounted } from "./hooks/useIsMounted";

const NotificationsDoctorPage = ({ notif }) => {
    const { auth } = useAuth();
    // const { id } = useParams();
    const [users, setUsers] = useState();
    const [requestError, setRequestError] = useState();
    const theToken = auth?.token;
    const [result, setData] = useState();
    const [dataHelper, setDataHelper] = useState();
    const [result2, setData2] = useState();
    // const [id, setID] = useState();

    const [dataHelper2, setDataHelper2] = useState();
    const [patientResult, setPatientData] = useState();
    const [patients, setPatient] = useState([]);
    const [isPending, setisPending] = useState(true);
    const isMounted = useIsMounted();
    const [event, setEvent] = useState();
    const navigate = useNavigate();



    const { data: pacient, error2, isPending2 } = useFetch('http://ec2-34-234-75-154.compute-1.amazonaws.com/api/doctor/patients/');

    console.log("pacient<<", pacient);

    const apiURL = 'http://ec2-34-234-75-154.compute-1.amazonaws.com/api/';
    const authAxios = axios.create({
        baseURL: apiURL,
        headers: {
            Authorization: `Token ${theToken}`
        },
    });
    useEffect(async () => {
        let mounted = true;

        async function fetchData() {
            const result = await authAxios.get('doctor/notifications');
            if (mounted) {
                setData(result.data);
                setDataHelper(result.data.patients);

            }


        };


        fetchData();
        console.log("notif>>", result);
        // console.log(dataHelper);


        return () => { mounted = false }
    }, []);
    const handleClick = (id) => {
        fetch('http://ec2-34-234-75-154.compute-1.amazonaws.com/api/doctor/notifications/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Private-Network': true,
                'Authorization': `Token ${theToken}`

            }
        }).then(() => {
            navigate('/medic-main-page');
        })
    }


    return (
        <>

            {result && pacient && (
                <div className="about">
                    <div className="blog-list">
                        {result.map(notif => (

                            <div className="about-block" key={notif.id} >
                                {/* <Link to={`/blogs/${blog.id}`}> */}
                                <h2>From {notif.start_date} to {notif.end_date}</h2>

                                <h3>

                                    Notification for:
                                    {pacient.map(pacient => (

                                        notif.patient === pacient.user.id ? ' ' + pacient.user.first_name + ' ' + pacient.user.last_name : ''







                                    ))}
                                </h3>
                                <div className="buttonLeft">
                                    <button onClick={() => handleClick(notif.id)}>Delete Notification</button>
                                </div>



                                <br></br>
                                <p>{notif.message}</p>
                                {/* </Link> */}
                            </div>

                        ))}






                    </div>
                </div>

            )
            }


        </>



    );

}

export default NotificationsDoctorPage;