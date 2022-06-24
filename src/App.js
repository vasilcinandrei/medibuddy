

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
import PacientMainPage from './PacientMainPage';
import PatientMeasurements from './PatientMeasurements';
import MockDataMeasurements from './MockDataMeasurements';
import CreateNotification from './CreateNofitication';
import NotificationsDoctorPage from './NotificationsDoctorPage';
import NotificationsPacientPage from './NotificationsPacientPage';

function App() {
  return (

    <div className='App'>
      <div className='content'>
        <Routes>
          <Route path="/" element={<Layout />} >

            {/* public routes */}
            <Route path="/" element={<About />} />

            <Route path="contact" element={<Contact />} />

            <Route path="login-medic" element={<MedicLogIn />} />
            <Route path="register" element={<CreateAccMedic />} />


            {/* we want to protect these routes */}
            <Route element={<RequireAuth />}>
              <Route path="medic-main-page" element={<MedicMainPage />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="pacient-main-page" element={<PacientMainPage />} />
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
            <Route element={<RequireAuth />}>
              <Route path="patient-measurements" element={<PatientMeasurements />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="mock-data" element={<MockDataMeasurements />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route exact path="add-notification-page" element={<CreateNotification />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route exact path="medic-notification-page" element={<NotificationsDoctorPage />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route exact path="patient-notification-page" element={<NotificationsPacientPage />} />
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
