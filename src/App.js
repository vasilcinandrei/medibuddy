

import About from './About';

import NotFound from './NotFound';
import Contact from './Contact';

import MedicLogIn from './components/MedicLogIn';
import CreateAccMedic from './CreateAccMedic';
import MedicMainPage from './MedicMainPage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import AddPatient from './AddPatient';
import PacientPage from './PacientPage';
import EditPatients from './EditPatients';


function App() {
  return (
    // <Router>
    //   <div className="App">
    //     <Navbar />
    //     <div className="content">
    //       <Routes>
    //         <Route exact path="/">
    //           <About />
    //         </Route>
    //         <Route path="/contact">
    //           <Contact />
    //         </Route>
    //         {/* <Route path="/login">
    //           <Login />
    //         </Route> */}
    //         <Route path="/login-medic">
    //           <MedicLogIn />
    //         </Route>
    //         {/* <Route path="/login-pacient">
    //           <PacientLogIn />
    //         </Route> */}
    //         <Route path="/register">
    //           <CreateAccMedic />
    //         </Route>
    //         <Route path="/medic-main">
    //           <MedicMainPage />
    //         </Route>
    //         <Route path="*">
    //           <NotFound />
    //         </Route>
    //       </Routes>
    //     </div>
    //   </div>
    // </Router>
    <div className='App'>
      <div className='content'>
        <Routes>
          <Route path="/" element={<Layout />} >

            {/* public routes */}
            <Route path="about" element={<About />} />

            <Route path="contact" element={<Contact />} />

            <Route path="login-medic" element={<MedicLogIn />} />
            <Route path="register" element={<CreateAccMedic />} />


            {/* we want to protect these routes */}
            <Route element={<RequireAuth />}>
              <Route path="medic-main-page" element={<MedicMainPage />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="add-patient" element={<AddPatient />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="patient-details/:id" element={<PacientPage />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="edit-patient/:id" element={<EditPatients />} />
            </Route>


            {/* catch all */}
            {/* <Route path="*" element={<Missing />} />*/}
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App
