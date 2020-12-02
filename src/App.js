import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import routers
import TopLevel from "./components/TopLevel";



function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <TopLevel/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
