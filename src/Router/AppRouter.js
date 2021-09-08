import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { baseUrl } from '../Config/Config'

import Home from '../Components/Home'
import Reward from '../Components/Reward'
import Faq from '../Components/Faq'
import Leaderboard from '../Components/Leaderboard'
import Tnc from '../Components/Tnc'
import AdsCoupon from '../Components/AdsCoupon';
import ClaimPrize from '../Components/ClaimPrize';
import HowPlay from '../Components/HowPlay';
import ScoreDetails from '../Components/ScoreDetails';
import QuizRouter from "../quiz_mania/Router/Router"

import SelectTeamScreen from '../quiz_mania/Screens/SelectTeamScreen'
import InviteScreen from '../quiz_mania/Screens/InviteScreen'
import QuizScreen from '../quiz_mania/Screens/QuizScreen'
import OpponentConfirmation from '../quiz_mania/Screens/OpponentConfirmation'
import NotFound from '../quiz_mania/Screens/NotFound';
import ChalangeFriend from '../quiz_mania/Screens/ChalangeFriend';
import SplashScreen from '../quiz_mania/Screens/SplashScreen';
import FriendSelected from '../quiz_mania/Screens/FriendSelected';
import GameStartSplash from '../quiz_mania/Screens/GameStartSplash'
export default class AppRouter extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path={baseUrl + "/prize-claim"} component={ClaimPrize} />
                    <Route path={baseUrl + "/reward"} component={Reward} />
                    <Route path={baseUrl + "/faq"} component={Faq} />
                    <Route path={baseUrl + "/leaderboard"} component={Leaderboard} />
                    <Route path={baseUrl + "/tnc"} component={Tnc} />
                    <Route path={baseUrl + "/show-reward"} component={AdsCoupon} />
                    <Route path={baseUrl + "/how-to-play"} component={HowPlay} />
                    <Route path={baseUrl + "/score-details"} component={ScoreDetails} />
                    

                    {/* <Route exact path={baseUrl + "/quiz-mania"} component={QuizRouter} /> */}
                    <Route path={baseUrl + "/quiz-mania/splash"} component={GameStartSplash} />
                    <Route path={baseUrl + "/quiz-mania/team-selection"} component={SelectTeamScreen} />
                    <Route path={baseUrl + "/quiz-mania/invite-friend/:team"} component={InviteScreen} />
                    {/* <Route path={baseUrl + "/quiz-mania/confirmation"} component={OpponentConfirmation} /> */}
                    <Route path={baseUrl + "/quiz-mania/quiz"} component={QuizScreen} />
                    <Route path={baseUrl + "/quiz-mania/chalange-friends"} component={ChalangeFriend} />
                    <Route path={baseUrl + "/quiz-mania/friend-selected"} component={FriendSelected} />
                    <Route path={baseUrl + "/quiz-mania"} component={SelectTeamScreen} />
                    <Route path={baseUrl + "/not-found"} component={NotFound} />

                    <Route exact path={baseUrl + "/"} component={Home} />
                </Switch>
            </Router>
        );
    }
}