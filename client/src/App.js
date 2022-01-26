import './style/Root.css';

import { BrowserRouter as 
    Router,
    Route, 
    Switch, 
} from "react-router-dom";

function App() {
  return (
    <Router>
        <Switch>
            <Route exact path={"/"} >
                <div className="App">
                </div>
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
