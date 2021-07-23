import "./App.css";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SignUp from "./components/signup/SignUp";
import {Homepage,Aboutpage,Header} from './components/homepage/Homepage'
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
       
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route exact path="/about" component={Aboutpage} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </Router>
        
    </div>
  );
}

export default App;
