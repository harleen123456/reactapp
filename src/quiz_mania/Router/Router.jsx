import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SelectTeamScreen from '../Screens/SelectTeamScreen'
import InviteScreen from '../Screens/InviteScreen'
import QuizScreen from '../Screens/QuizScreen'
import OpponentConfirmation from '../Screens/OpponentConfirmation'
import NotFound from '../Screens/NotFound';
import ChalangeFriend from '../Screens/ChalangeFriend';
import SplashScreen from '../Screens/SplashScreen';
import FriendSelected from '../Screens/FriendSelected';
import GameStartSplash from '../Screens/GameStartSplash'

export default class AppRoute extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <Router>
                <Switch>

                    <Route path="/splash" component={GameStartSplash} />
                    <Route path="/confirmation" component={OpponentConfirmation} />
                    <Route path="/team-selection" component={SelectTeamScreen} />
                    <Route path="/invite-friend/:team" component={InviteScreen} />
                    <Route path="/quiz" component={QuizScreen} />
                    <Route path="/chalange-friends" component={ChalangeFriend} />
                    <Route path="/friend-selected" component={FriendSelected} />
                    <Route path="/" component={SplashScreen} />
                    <Route path="/not-found" component={NotFound} />

                </Switch>
            </Router>
        )
    }
}