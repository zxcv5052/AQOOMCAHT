import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {Analytic, Setting, Group, Interaction , Member, Message} from "../pages";

const Section = () => {
    return (
        <div className ="section">
            <Switch>
                <Route exact path="/" component={Group}/>
                <Route exact path="/analytics" component={Analytic}/>
                <Route exact path="/interactions" component={Interaction}/>
                <Route exact path="/messages" component={Message}/>
                <Route exact path="/members" component={Member}/>
                <Route exact path="/settings" component={Setting}/>
            </Switch>
        </div>
    )
}

export default Section;