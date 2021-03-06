import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import useAuth from "./hooks/useAuth";
import axios from "./api/axios";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import { useIsMounted } from "./hooks/useIsMounted";


const MedicMainPage = () => {
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
            const result = await authAxios.get('doctor/profile');
            if (mounted) {
                setData(result.data);
                setDataHelper(result.data.patients);

            }


        };


        fetchData();
        console.log(result);
        console.log(dataHelper);


        return () => { mounted = false }
    }, []);

    useEffect(() => {
        (async () => {
            try {
                // fetching all patirnts
                let res = await await authAxios.get('doctor/patients/');
                setPatient(res.data);
                // console.log(patients);
                setisPending(false);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

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
                            <br />
                            <h4><b>Speciality:</b> {result.speciality}</h4>
                            <h4><b>Number of patients:</b> {result.patients.length}</h4>
                            <br />
                            <Link to={'/add-patient'}>Add a new patient</Link>
                        </div>



                        {patients && (
                            <div className="flex-child text-right">
                                <h1>Patients list</h1>
                                {patients?.map(patient => (
                                    <div className="blog-preview" key={patient.user.id} >

                                        <Link to={`/patient-details/${patient.user.id}`}>
                                            {patient.user.first_name} {patient.user.last_name}
                                        </Link>

                                    </div>
                                ))}





                            </div>
                        )}
                    </div>


                </article>


            )}





        </div >
    );
}

export default MedicMainPage;

