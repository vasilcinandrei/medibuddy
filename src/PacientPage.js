import { Link, useNavigate, useParams } from "react-router-dom";
// import AddPatient from "./AddPatient";
import useFetch from "./useFetch";
import useAuth from "./hooks/useAuth";
import BarChart from "./components/BarChart";
import { useState } from "react";
const PacientPage = () => {
    const { auth } = useAuth();
    const theToken = auth?.token;
    const { id } = useParams();
    const { data: user, error, isPending } = useFetch('http://ec2-34-234-75-154.compute-1.amazonaws.com/api/doctor/patients/' + id)
    const navigate = useNavigate();

    const handleClick = () => {
        fetch('http://ec2-34-234-75-154.compute-1.amazonaws.com/api/doctor/patients/' + id, {
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
        <div className="blog-details" >
            {isPending && <div>Loading...</div>}
            {error && <div> {error} </div>
            }
            {
                user && (
                    <article>
                        <div className="pacient-info">

                            <h2> {user.user.first_name}  {user.user.last_name}</h2>
                            <h4><b>Address:</b> {user.street}, {user.city}, {user.state} </h4>
                            <h4><b>Birthday:</b> {user.birthday} </h4>
                            <h4><b>Phone:</b> {user.phone} </h4>
                            <h4><b>Profession:</b> {user.profession} </h4>
                            <h4><b>Workplace:</b> {user.workplace} </h4>
                            <h4><b>Alergies:</b> {user.alergies} </h4>
                            {/* <p>Written by {blog.author}</p> */}
                            {/* <div>{blog.body}</div>*/}
                            <br />
                            <Link to={`/edit-patient/${id}`}> Edit the informatios </Link>
                            <br />
                            <br />
                            <button onClick={handleClick}>Delete</button>
                        </div>
                        <div className="pacient-info">
                            <br /><br />
                            <h1>Graphs and measurements</h1>
                            <br /><br />
                            <BarChart />
                        </div>

                    </article>
                )
            }
        </div >
    );
}

export default PacientPage;