
import Navbar from './Navbar';
import About from './About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import Contact from './Contact';
import Login from './Login';
import PacientLogIn from './PacientLogIn';
import MedicLogIn from './MedicLogIn';
import CreateAccMedic from './CreateAccMedic';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/login-medic">
              <MedicLogIn />
            </Route>
            <Route path="/login-pacient">
              <PacientLogIn />
            </Route>
            <Route path="/register">
              <CreateAccMedic />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
