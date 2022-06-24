import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import useAuth from "./hooks/useAuth";
import axios from "./api/axios";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import { useIsMounted } from "./hooks/useIsMounted";


const PacientMainPage = () => {
    const { auth } = useAuth();
    const { id } = useParams();
    const [users, setUsers] = useState();
    const [requestError, setRequestError] = useState();
    const theToken = auth?.token;
    const [result, setData] = useState()
    const [dataHelper, setDataHelper] = useState()
    const [patientResult, setPatientData] = useState()
    const [patients, setPatient] = useState([])
    const [isPending, setisPending] = useState(true);
    const isMounted = useIsMounted();
    const [event, setEvent] = useState();
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
            const result = await authAxios.get('patient/profile/');
            if (mounted) {
                setData(result.data);
                setDataHelper(result.data.patients);

            }


        };


        fetchData();

        // console.log(dataHelper);


        return () => { mounted = false }
    }, []);

    useEffect(() => {
        (async () => {
            try {
                // fetching all patirnts
                let res = await await authAxios.get('patient/profile/');
                setPatient(res.data);
                // console.log(patients);
                setisPending(false);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);
    console.log("Pacient >>", result);
    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }


    return (

        <div className="blog-details ">
            {isPending && <div>Loading...</div>}
            {result && (
                <article>
                    <div className="flex-container pacient-info">

                        <div className="flex-child">
                            <h2>Welcome, {result.user.first_name} {result.user.last_name} </h2>
                            <br></br>

                            <h4><b>Email:</b> {result.user.email}</h4>
                            <h4><b>Address:</b> {result.street}, {result.city}, {result.state}</h4>

                            <h4><b>Age:</b> {getAge(result.birthday)}</h4>


                            <h4><b>Phone:</b> {result.phone} </h4>
                            <h4><b>Profession:</b> {result.profession} </h4>
                            <h4><b>Workplace:</b> {result.workplace} </h4>
                            <h4><b>Alergies:</b> {result.alergies} </h4>
                        </div>

                        <div className="flex-child text-right">
                            <h2>Device Data</h2>
                            <br />

                            <Link to="/patient-measurements">Check My Measurements</Link>
                            {/* <Link to="/mock-data">add data</Link> */}





                        </div>


                    </div>


                </article>


            )}





        </div >
    );
}

export default PacientMainPage;

