import React from 'react';
import { Route , Switch } from 'react-router-dom';
import { Analytic , Group , Message , Member , Interaction , Setting , Home } from "../pages";

function App() {
    return(
        <div>
            <Route exact path="/" component={Home}/>
            <Switch>
                <Route path="/Home" component={Home}/>
                <Route path="/Analytic" component={Analytic}/>
                <Route path="/Group" component={Group}/>
            </Switch>
        </div>
    )
}

export default App;
