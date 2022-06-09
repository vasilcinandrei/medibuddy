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

    // const fetchData = async (params) => {
    //     setLoading(true);
    //     setisPending(true);
    //     try {
    //         const result = await authAxios.get('doctor/profile');
    //         if (isMounted.current) { setData(result.data); }


    //     } catch (curError) {
    //         if (axios.isCancel(curError)) {
    //             return false;
    //         }
    //         // error handling code 
    //     }
    //     return null;
    // };

    // useEffect(() => {
    //     const cancelToken = axios.CancelToken;
    //     const source = cancelToken.source();

    //     fetchData({

    //         cancelToken: source.token
    //     });

    //     return () => {
    //         source.cancel("axios request cancelled");
    //     };
    // }, []);



    // useEffect(async () => {

    //     try {

    //         const result = await authAxios.get('doctor/profile').then(data => {
    //             if (isMounted.current) { setState(data); }
    //         });


    //         // console.log(result.data);
    //         // isPending = useState(false);
    //         // console.log(isPending);
    //     }
    //     catch (err) {
    //         setRequestError(err.message);
    //     }

    // }, []);
    // const controller = new AbortController();

    // const getData = () => {
    //     setIsLoading(true)
    //     authAxios.get('doctor/profile', {
    //         signal: controller.signal
    //     }).then((response) => {
    //         setEvent([data, response.data.data])
    //         setIsLoading(false)
    //     })
    // }

    // useEffect(() => {
    //     getData();

    //     return () => {
    //         controller.abort();
    //     };
    // }, []);

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
    // useEffect(async () => {
    //     let mounted2 = true;

    //     async function fetchData2() {
    //         const patientResult = await authAxios.get('doctor/patients/');
    //         if (mounted2) {
    //             if (dataHelper) {
    //                 for (let index = 0; index < dataHelper.length; index++) {
    //                     setPatientData(patientResult.data[index]);

    //                 }
    //             }



    //         }
    //     };



    //     fetchData2();



    //     // console.log(data);

    //     console.log(patientResult);
    //     setTimeout(() => {
    //         setisPending(false);
    //     }, 2000);

    //     return () => { mounted2 = false }
    // }, [dataHelper]);





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

