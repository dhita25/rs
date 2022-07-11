import React from "react";

//import react-router-dom
import { Switch, Route } from "react-router-dom";

//import login
import Login from "./pages/login";

//import reset
import reset from "./pages/reset";

//import register
import Register from "./pages/register";




function Auth() {
  return (
      <div className="App">
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/reset" component={reset} />
            <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    );
  
}

export default Auth;
