import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
//import { Home } from "../pages/Home";
import About from "../pages/About";
import PME from "../pages/PME";
import Home from "../pages/Home";
import Success from "../pages/Success";
import { PriceQuote } from "../pages/PriceQuote";



const Routes = () => (
  
  <BrowserRouter forceRefresh={false} >
    <Switch>
      {/*<Route exact path="/" component={Home} />*/}
      <Route exact path="/" >
         <Redirect to="/inicio" />
      </Route>
      <Route exact path="/sobre-voce" component={About} forceRefresh={true} />
      <Route exact path="/cotacao" component={PriceQuote} />   
      <Route exact path="/sobre-a-empresa" component={PME} />
      <Route exact path="/inicio" component={Home} />
      <Route exact path="/sucesso" component={Success} />
    
    </Switch>
  </BrowserRouter>
);

export default Routes;
