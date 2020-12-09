
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// Import routers
import TopLevel from "./components/TopLevel";
import Folders from "./components/Folders";
import NewFolder from "./components/NewFolder";


function App() {
  return (
    <Router>
      <Switch>

        <Route path="/folders/:id">
          <Folders />
        </Route>

        <Route path="/newfolder/:id">
          <NewFolder />
        </Route>

        <Route path="/">
          <TopLevel />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
