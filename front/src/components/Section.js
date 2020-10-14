import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {Analytic, Setting, Group, Interaction , Member, Message, Future, User, Login, Function} from "../pages";

const Section = () => {
    return (
        <div className ="section">
            <Switch>
                <Route exact path="/groups" component={Group}/>
                <Route exact path="/analytics" component={Analytic}/>
                <Route exact path="/interactions" component={Interaction}/>
                <Route exact path="/messages" component={Message}/>
                <Route exact path="/members" component={Member}/>
                <Route exact path="/settings" component={Setting}/>
                <Route exact path="/functions" component={Function}/>
                <Route exact path="/users" component={User}/>
                <Route exact path="/future" component={Future}/>
                <Route exact path="/login" component={Login}/>
                <Route
                    render={({ location }) => (
                        <div>
                            <h2>No Exist Page</h2>
                            <p>{location.pathname}</p>
                        </div>
                    )}
                />
            </Switch>
        </div>
    )
}

export default Section;