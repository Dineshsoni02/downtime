import "./App.scss";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import Header from "./components/homepage/header/Header";
import Authentication from "./components/form/Authentication";
import Dashboard from "./components/Dashboard/Dashboard";
import { connect } from "react-redux";

function App(props) {
  return (
    <div className="App">
      <Toaster />
      <svg
        className="bg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#0099ff"
          fillOpacity="1"
          d="M0,256L48,261.3C96,267,192,277,288,250.7C384,224,480,160,576,149.3C672,139,768,181,864,218.7C960,256,1056,288,1152,256C1248,224,1344,128,1392,80L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
      <Router>
        <Header />
        {/* <Dashboard /> */}
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/auth">
            {props.Auth ? <Redirect to="/" /> : <Authentication />}
          </Route>
          <Route path="/dashboard">
            {props.Auth ? <Dashboard /> : <Redirect to="/auth" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
const mapStatetoProps = (state) => {
  return {
    Auth: state.Auth,
  };
};

export default connect(mapStatetoProps)(App);
