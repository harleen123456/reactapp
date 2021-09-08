import React, { Component } from 'react'
import Header from './Header'
import News from './News'
import Game from './Game'
import Footer from './Footer'
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import $ from 'jquery';
import queryString from 'query-string';
import { handshake, directhandshake, getNews, getHomePageLeaderboard, getCricketScore, getGameList, getSpinInit, getGames, setFlagData, getJson } from '../Services/Service';
import InProgressScore from '../Components/InProgressScore';
import UpcomingScore from '../Components/UpcomingScore';
import RecentScore from '../Components/RecentScore';
import About from '../Components/About';
import { Bling as GPT } from "react-gpt";
import Countdown from 'react-countdown';
import moment from 'moment';
import { baseUrl, configRedirect, baseURI, aaTrackPageview, openAirtel, aaTrackACB, url } from '../Config/Config'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-177875138-1');

//ReactGA.initialize('UA-97665797-1');

GPT.enableSingleRequest();
var testListner = false;

export default class Home extends Component {

    constructor(props) {
        super(props);
        let qs = queryString.parse(this.props.location.search);
        this.state = {
            token: 'token' in qs ? qs.token : null,
            mobile: 'm' in qs ? qs.m : null,
            secret: 'secret' in qs ? qs.secret : null,
            utm_source: 'utm_source' in qs ? qs.utm_source : null,
            utm_medium: 'utm_medium' in qs ? qs.utm_medium : null,
            utm_campaign: 'utm_campaign' in qs ? qs.utm_campaign : null,
            utm_term: 'utm_term' in qs ? qs.utm_term : null,
            utm_content: 'utm_content' in qs ? qs.utm_content : null,
            username: '',
            points: localStorage.getItem('points'),
            newsData: null,
            leaderData: null,
            isShowLoader: false,
            isShowInprogress: true,
            isShowUpcoming: false,
            isShowRecent: false,
            isShowDrawer: true,
            userObj: {},
            cricketScoreData: {},
            gameData: [],
            isShowSpinTimer: false,
            timer: "",
            showYesPoint: true,
            pre2winPop: false,
            showSomeWentWrg: false,
            SomeWentWrgMsg : "Something Went Wrong!",
            updated_username: localStorage.getItem('username'),
            content: null,
            showGame: false,
            showGameData: null,
            visibilityCounter: "",
            prediction: true,
            spinner: true,
            displayGame: null

        }

    }

    toggleGamePopup = (id = null, name = null, url = null) => {
        let showGameData = {};
        let eventId = "acb_home_click"
        let eventLabel = ""
        let eventAction = "Home Page Clicks"
        let pageName = "ACB_homepage"

        if (name == null) {
            this.sendTrack('Close');
        } else {
            let g = {
                "predict_to_win": "Predict To Win Popup",
                "fielder-challenge": "Fielder Challenge Popup",
                "super-cricket": "Super Cricket Popup",
                "quizmania": "Quizmania Popup"
            }
            if (id === "predict_to_win") {
                eventLabel = "Predict To Win Popup"
                aaTrackACB(eventId, eventAction, eventLabel, pageName)
                aaTrackPageview("pageview", "Predict To Win", "ACB_predict_2_win")
            } else if (id === "quizmania") {
                eventLabel = "Quiz Mania Popup"
                aaTrackACB(eventId, eventAction, eventLabel, pageName)
                aaTrackPageview("pageview", "Quizmania", "ACB_Quiz_mania")
            } else if (id === "fielder-challenge") {
                eventLabel = "Fielder Challenge Popup"
                aaTrackACB(eventId, eventAction, eventLabel, pageName)
                //aaTrackPageview("pageview", "Home", "ACB_homepage")
            } else if (id === "super-cricket") {
                eventLabel = "Super Cricket Popup"
                aaTrackACB(eventId, eventAction, eventLabel, pageName)
                //aaTrackPageview("pageview", "Home", "ACB_homepage")
            }
            ReactGA.pageview(g[id]);

        }
        if (id) {
            showGameData.id = id
            showGameData.name = name
            showGameData.url = url
        }
        this.setState({ showGame: !this.state.showGame, showGameData: showGameData })

    }

    refreshUserName = (data) => {
        this.setState({ updated_username: data })
    }
    setFlag = async () => {
        this.setState({ isShowLoader: true })
        let info = localStorage.getItem("info")
        let yest = localStorage.getItem("yest")
        if (info == 'true') {
            info = false
        } else if (info == 'false') {
            info = false
        }
        if (yest == "true") {
            yest = false
        } else if (yest == "false") {
            yest = false
        }
        let payload = {
            "info": info,
            "yest": yest
        }
        let res = await setFlagData(payload);

        this.setState({ isShowLoader: false })
    }
    showDrawer = (eventLabel = null) => {
        if (this.state.isShowDrawer) {
            localStorage.setItem('showAbout', true);
        }
        localStorage.setItem('info', false);
        this.setFlag()
        this.setState({ isShowDrawer: !this.state.isShowDrawer })
        if (eventLabel) {
            aaTrackACB('acb_info_click', 'Info Drawer Clicks', "Start Playing", 'ACB_info_drawer');
        }
    }

    gotoSpinner = () => {
        if (!this.state.spinner) {
            var now = new Date();
            var night = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate() + 1, // the next day, ...
                0, 0, 0 // ...at 00:00:00 hours
            );
            var miliseconds = night.getTime() - now.getTime();
            aaTrackACB("acb_free_hit_click", "Free Hit Clicks", 'next spin', "ACB_free_hit")
            this.setState({ timer: miliseconds, isShowSpinTimer: true, }, console.log(this.state))
        } else {
            openAirtel(baseURI + '?screen=spinner');
            //openAirtel(baseURI + 'spinner.html');
            aaTrackACB("acb_free_hit_click", "Free Hit Clicks", "Play", "ACB_free_hit")
        }

    }
    gotoPre2Win = () => {
        //ReactGA.pageview("Predict To Win");
        let pre2winPop = false;
        aaTrackACB("acb_predict_to_win_click", "Predict to Win Clicks", "Play", "Acb_Predict_2_win_Play")
        if (this.state.prediction) {
            openAirtel(baseURI + '?screen=predict');
        } else {
            pre2winPop = true
        }
        this.setState({
            pre2winPop,
            showGame: false
        })



    }
    closePre2Win = () => {
        this.sendTrack('Acb_Predict_2_win_Close');
        this.setState({ pre2winPop: false })
    }

    closeTimer = () => {
        this.sendTrack('Acb_Free_Hit_Close');
        this.setState({ isShowSpinTimer: false })
    }
    getCricketScoreData = async () => {
        // let api_url = 'https://ndtv-airtel-testfrontend.opalina.in/agames/agamesapi/match.json'
        let res = await getJson(`${baseUrl}/agamesapi/match.json`)
        if (res.success) {
            localStorage.setItem("crr_mtch", res.data.matchId)
            this.setState({ cricketScoreData: res.data })
        }
    }

    async componentDidMount() {
        document.title = "Airtel Cricket Bonanza"
        // alert('test')
        $("html, body").animate({ scrollTop: 0 }, "slow");
        this.loadHomePage()
        // ReactGA.pageview("Home Page");
        GPT.syncCorrelator([true])

        // register a interval dor every 20 sec to update score
        this.interval = setInterval(async () => {
            // make an api call to fetch Cricket Score data

            let cricket_score = await getCricketScore();
            //this.getCricketScoreData()
            let cricketScoreData = {}
            let content = null
           
            if (cricket_score.data !== null && 'success' in cricket_score && cricket_score.success) {
                cricketScoreData = 'data' in cricket_score ? cricket_score.data : {};
                content = 'data' in cricket_score ? cricket_score.data.venue.content : null;
                localStorage.setItem("crr_mtch", cricketScoreData.matchId)
            }
    
            this.setState({
                content, cricketScoreData
            })
        }, 20000);
    }
    msToTime = (duration) => {
        var milliseconds = parseInt((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds;
    }
    loadHomePage = async () => {
        let qs = queryString.parse(this.props.location.search);
        // if(qs){
        //     alert(JSON.stringify(qs))
        // }

        /*let accessToken = localStorage.getItem("accessToken")
        if (accessToken == null) {
            const urlParams = new URLSearchParams(window.location.search);
            const urlParam1 = urlParams.get('constructId');
            const secret = urlParams.get('secret');
            const username = urlParams.get('appusername');
            var urlParam2 = localStorage.getItem("token_id");
            if ('token' in qs && 'm' in qs) {
            } else {
                const gameID = 'quizmania';
                $.ajax({
                    headers: {
                        "Content-Type": "application/json"
                    },
                    url: url + "user/handshake",
                    type: "POST",
                    datatype: "json",
                    data: JSON.stringify({ "token": urlParam2, "secret": secret, "m": "1111111111", "ip": "10.12.12.12", "dvcid": "111111", "username": username }),
                    success: function (res) {
                        localStorage.setItem("accessToken", res.data.accessToken);
                        accessToken = res.data.accessToken;
                    },
                    error: function (err) {
                        console.log("error", err);
                        this.setState({ showSomeWentWrg: true })
                        return
                    }
                })

            }
        }*/

        // if (this.state.token != null && this.state.secret != null) {
        // api call with new data
        // localStorage.clear();
        // }

        this.setState({ isShowLoader: true })
        // make an api call to get news
        //let newsData = await getNews();
        let newsData = await getJson(`${baseUrl}/agamesapi/news.json`);
        //let newsData = await getJson(`${url}news/list`);

        let resNewsData = [];
        if (typeof (newsData) == 'object' && 'total' in newsData && newsData.total > 0) {
            resNewsData = newsData.results
        }

        // make an api call to fetch user data
        let userData;
        if (this.state.token && this.state.mobile && this.state.secret) {
            userData = await handshake(this.state.token, this.state.mobile, this.state.secret)
            // console.log(userData)

            // if (true) {
            if (userData.success == false) {
                // api failed
                let msg = userData.message == "BLOCKED_USER" ? "You are unable to access the page as we have noticed some suspicious activities from your number." : "Something Went Wrong!"
                // show the popup------
                this.setState({ showSomeWentWrg: true, isShowLoader: false, SomeWentWrgMsg: msg })
                return;
            }

            let points = userData.data.item.points;
            if (points == 'null') {
                points = 0;
            }
            localStorage.setItem('user_id', userData.data.item.userID);
            localStorage.setItem('token_id', this.state.token);
            localStorage.setItem('accessToken', userData.data.accessToken);
            localStorage.setItem('location', userData.data.item.location);
            localStorage.setItem('mobile', userData.data.item.mobile);
            localStorage.setItem('points', points);
            localStorage.setItem('username', userData.data.item.username);



            /////---------------------------------------------
            localStorage.setItem('utm_source', this.state.utm_source);
            localStorage.setItem('utm_medium', this.state.utm_medium);
            localStorage.setItem('utm_campaign', this.state.utm_campaign);
            localStorage.setItem('utm_term', this.state.utm_term);
            localStorage.setItem('utm_content', this.state.utm_content);

        } else {
            let urlParams = new URLSearchParams(window.location.search);

            let constructId = qs.constructId;
            let tokenId = qs.token_id;
            let secret = qs.secret;
            let username = qs.appusername;
            userData = await directhandshake(tokenId, "1111111111", secret, username);
            // if (true) {
            if (userData.success == false) {
                // api failed
                let msg = userData.message == "BLOCKED_USER" ? "You are unable to access the page as we have noticed some suspicious activities from your number." : "Something Went Wrong!"
                // show the popup------
                this.setState({ showSomeWentWrg: true, isShowLoader: false, SomeWentWrgMsg: msg })
                return;
            }

            let points = userData.data.item.points;
            if (points == 'null') {
                points = 0;
            }
            localStorage.setItem('user_id', userData.data.item.userID);
            localStorage.setItem('token_id', tokenId);
            localStorage.setItem('tokenId', tokenId);
            localStorage.setItem('accessToken', userData.data.accessToken);
            localStorage.setItem('location', userData.data.item.location);
            localStorage.setItem('mobile', userData.data.item.mobile);
            localStorage.setItem('points', points);
            localStorage.setItem('username', username);
            localStorage.setItem("constructId", constructId);
            localStorage.setItem("secret", secret);
            this.state.token = tokenId;
            this.state.secret = secret;
            /////---------------------------------------------
            localStorage.setItem('utm_source', this.state.utm_source);
            localStorage.setItem('utm_medium', this.state.utm_medium);
            localStorage.setItem('utm_campaign', this.state.utm_campaign);
            localStorage.setItem('utm_term', this.state.utm_term);
            localStorage.setItem('utm_content', this.state.utm_content);
        }

        //aaTrackPageview("pageview", "Home", "ACB_homepage")

        //-- COMMENTED BY ANOOP TO REMOVE ISSUE CAUSED DUE TO ACCESSING QUIZ DIRECTLY WITHOUT HOME START
        // make an api call to fetch leaderboard data 
       /* let getLeaders = await getHomePageLeaderboard();
        if (!getLeaders.success) {
            return
        }

        let highScore = 0;
        if (getLeaders.highestScore) {
            highScore = getLeaders.highestScore
        }
        localStorage.setItem("highestScore", highScore);
        localStorage.setItem('points', getLeaders.data.user.points);*/
        //-- COMMENTED BY ANOOP TO REMOVE ISSUE CAUSED DUE TO ACCESSING QUIZ DIRECTLY WITHOUT HOME END

        // // on date change handle the show yesterday popup --------------------
        // let today = moment().format('DD-MM-YYYY')
        // if (localStorage.getItem('yesterdayDate') && localStorage.getItem('yesterdayDate') == today) {
        //     // localstorage yesterday date changed, so remove its show- true
        //     // we need to show popup
        //     localStorage.removeItem('yesterdayDate')
        //     localStorage.removeItem('yesterdayPoint')
        // } else {
        //     // no date in localstorage
        //     localStorage.setItem('yesterdayPoint', getLeaders.yesterdayPoint);
        //     localStorage.setItem('yesterdayDate', getLeaders.yesterdayDate);
        //     // TESTING only
        //     localStorage.setItem('yesterdayDate', '18-09-2020');
        //     localStorage.setItem('yesterdayPoint', '20');
        // }

        //COMMENTED BY ANOOP
        /*let yes = localStorage.getItem('yesterdayDate')
        if (yes !== getLeaders.yesterdayDate) {
            localStorage.setItem("showpopup", true);

            localStorage.setItem("yesterdayDate", getLeaders.yesterdayDate)
            localStorage.setItem('yesterdayPoint', getLeaders.yesterdayPoint);
        }*/
        //COMMENTED BY ANOOP
        const props = this.props;
        if (this.state.token == null && this.state.secret == null) {
            // api call with new data
            if ('screen' in qs && qs.screen == 'joinquiz') {
                if ('room_code' in qs) {
                    localStorage.setItem("room_code", qs.room_code)
                } else {
                    localStorage.setItem("room_code", "")
                }
                //alert(baseURI + '?screen=joinquiz&room_code=' + qs.room_code)
                //props.history.push(baseUrl + "/quiz-mania/team-selection")
                window.location.href = baseURI + '?screen=joinquiz&room_code=' + qs.room_code;
            } else if ('screen' in qs && qs.screen == 'myprize') {
                window.location.href = baseUrl + '/?screen=myprize';
            } else if ('screen' in qs && qs.screen == 'claimprize') {
                window.location.href = baseUrl + '/?screen=claimprize';
            } else if ('screen' in qs && qs.screen == 'leaderboard') {
                window.location.href = baseUrl + '/?screen=leaderboard';
            } else if ('screen' in qs && qs.screen == 'quizmania') {
                if ('room_code' in qs) {
                    localStorage.setItem("room_code", qs.room_code)
                }
                window.location.href = baseUrl + '/?screen=quizmania';
            } else if ('screen' in qs && qs.screen == 'spinner') {
                //this.gotoSpinner()
                window.location.href = baseUrl + '/spinner.html';
            }else if ('screen' in qs && qs.screen == 'scorecard') {
                //this.gotoSpinner()
                window.location.href = baseUrl + '/?screen=scorecard';
            } else if ('screen' in qs && qs.screen == 'predict') {
                //this.gotoPre2Win()
                window.location.href = baseUrl + '/match_widget.html?constructId=1234';
            } else if ('screen' in qs && qs.screen == 'fielder') {
                window.location.href = baseUrl + "/games/fielder/index.html"
                //window.location.href = baseUrl + '/quiz-mania/team-selection';

            } else if ('screen' in qs && qs.screen == 'supercricket') {
                window.location.href = baseUrl + "/games/supercricket/index.html"
                //window.location.href = baseUrl + '/quiz-mania/team-selection';

            } else {
                window.location.href = baseUrl + '/';
            }
            return;
        }

        // make an api call to fetch Game List

        let gameRes = await getJson(`${baseUrl}/agamesapi/game-list.json`);
        if (!gameRes.success) {
            return;
        }

        // make an api call to fetch Cricket Score data
        let cricket_score = await getCricketScore();
        // this.getCricketScoreData()
        //props.history.push(baseUrl + "/reward")
        //return;
        if ('screen' in qs && qs.screen == 'joinquiz') {
            if ('room_code' in qs) {
                localStorage.setItem("room_code", qs.room_code)
            }
            //props.history.push(baseUrl + "/quiz-mania/team-selection")
            
            //window.location.href = baseUrl + '/quiz-mania/team-selection';
            if (window.history.length === 2) {

                props.history.push(baseUrl + "/quiz-mania/team-selection?constructId=" + localStorage.getItem("constructId") + "&token_id=" + localStorage.getItem("tokenId") + "&secret=" + localStorage.getItem("secret") + "&appusername=" + qs.appusername)

            } else {
                window.history.back(-1);
            }
            return;
        } else if ('screen' in qs && qs.screen == 'myprize') {
            props.history.push(baseUrl + "/reward")
            return;
        }else if ('screen' in qs && qs.screen == 'scorecard') {
            props.history.push(baseUrl + "/score-details")
            //window.location.href = baseUrl + '/reward';
            return;
        }else if ('screen' in qs && qs.screen == 'leaderboard') {
            props.history.push(baseUrl + "/leaderboard")
            //window.location.href = baseUrl + '/reward';
            return;
        } else if ('screen' in qs && qs.screen == 'claimprize') {
            props.history.push(baseUrl + "/prize-claim")
            //window.location.href = baseUrl + '/reward';
            return;
        } else if ('screen' in qs && qs.screen == 'quizmania') {
            
            if ('room_code' in qs) {
                localStorage.setItem("room_code", qs.room_code)
            } 

            
            if (window.history.length === 2) {

                props.history.push(baseUrl + "/quiz-mania/team-selection?appusername=" + localStorage.getItem("username") + "&constructId=" + localStorage.getItem("constructId") + "&token_id=" + localStorage.getItem("tokenId") + "&secret=" + localStorage.getItem("secret"));

            } else {
                window.history.back(-1);
            }


            //props.history.push(baseUrl + "/quiz-mania/team-selection?appusername=" + localStorage.getItem("username") + "&constructId=" + localStorage.getItem("constructId") + "&token_id=" + localStorage.getItem("tokenId") + "&secret=" + localStorage.getItem("secret"));
            //window.location.href = baseUrl + '/quiz-mania/team-selection';
            return;
        } else if ('screen' in qs && qs.screen == 'spinner') {
            window.location.href = baseUrl + '/spinner.html';
            return;
        } else if ('screen' in qs && qs.screen == 'predict') {
            //this.gotoPre2Win()
            //ReactGA.pageview("Predict To Win");
            window.location.href = baseUrl + '/match_widget.html?constructId=1234';
            return;
        } else if ('screen' in qs && qs.screen == 'fielder') {
            window.location.href = baseUrl + "/games/fielder/index.html"
            //window.location.href = baseUrl + '/quiz-mania/team-selection';
            return;

        } else if ('screen' in qs && qs.screen == 'supercricket') {
            window.location.href = baseUrl + "/games/supercricket/index.html"
            //window.location.href = baseUrl + '/quiz-mania/team-selection';
            return;
        } else {
            ReactGA.pageview("Home Page");
        }

        this.handleLoad();

        //COMMENTED BY ANOOP
        /*localStorage.setItem("info", getLeaders.info)
        localStorage.setItem("yest", getLeaders.yest)*/
        //COMMENTED BY ANOOP
        // For testing
        // localStorage.setItem("info", false)
        // localStorage.setItem("yest", false)

        let cricketScoreData = {}
        let content = null
        if (cricket_score.data !== null && 'success' in cricket_score && cricket_score.success) {
            
            cricketScoreData = 'data' in cricket_score ? cricket_score.data : {};
            content = 'data' in cricket_score ? cricket_score.data.venue.content : null;
            localStorage.setItem("show_batting","show_batting" in cricketScoreData ?cricketScoreData.show_batting : 0 )
            localStorage.setItem("show_bowling", "show_bowling" in cricketScoreData ?cricketScoreData.show_bowling : 0)
            localStorage.setItem("show_points", "show_points" in cricketScoreData ?cricketScoreData.show_points : 0)
        }

        let payload_spinner = {
            game_id: "spin_wheel"
        }
        let res_spin = await getSpinInit(payload_spinner);
        let payload_predict = {
            game_id: "predict_to_win"
        }
        let res_predict = await getGames(payload_predict);




        // handle display game-------------
        let displayGame = gameRes.data.free.reduce((obj, item) => {
            return {
                ...obj,
                [item['id']]: item.priority,
            };
        }, {});

        // console.log(displayGame)
        //COMMENTED BY ANOOP
        /*this.setState({
            isShowLoader: false, points: localStorage.getItem('points'), username: localStorage.getItem('username'),
            newsData: resNewsData, leaderData: getLeaders.data.item, userObj: getLeaders.data.user,
            cricketScoreData: cricketScoreData,
            content: content,
            gameData: gameRes.data.free, prediction: res_predict.success, spinner: res_spin.success, displayGame
        });*/

        this.setState({
            isShowLoader: false, points: localStorage.getItem('points'), username: localStorage.getItem('username'),
            newsData: resNewsData, leaderData: null, userObj: null,
            cricketScoreData: cricketScoreData,
            content: content,
            gameData: gameRes.data.free, prediction: res_predict.success, spinner: res_spin.success, displayGame
        });
        //COMMENTED BY ANOOP
    }
    handleLoad = (type = "add") => {
        let ref = this;

        //check the visiblility of the page
        var hidden, visibilityState, visibilityChange;

        if (typeof document.hidden !== "undefined") {
            hidden = "hidden"
            visibilityChange = "visibilitychange"
            visibilityState = "visibilityState";
        }
        else if (typeof document.mozHidden !== "undefined") {
            hidden = "mozHidden"
            visibilityChange = "mozvisibilitychange"
            visibilityState = "mozVisibilityState";
        }
        else if (typeof document.msHidden !== "undefined") {
            hidden = "msHidden"
            visibilityChange = "msvisibilitychange"
            visibilityState = "msVisibilityState";
        }
        else if (typeof document.webkitHidden !== "undefined") {
            hidden = "webkitHidden"
            visibilityChange = "webkitvisibilitychange"
            visibilityState = "webkitVisibilityState";
        }


        if (typeof document.addEventListener === "undefined" || typeof hidden === "undefined") {
            // not supported
        }
        else {
            if (type == "add") {
                if (!testListner) {
                    //console.log("listener added")
                    document.removeEventListener(visibilityChange, () => {
                        //console.log("removed listener")
                    });
                    document.addEventListener(visibilityChange, function () {

                        switch (document[visibilityState]) {
                            case "visible":
                                //console.log("visibility", document[visibilityState])
                                ref.loadHomePage();
                                break;
                            case "hidden":
                                break;
                        }
                    }, false);
                    testListner = true;
                }

            } else {
                document.removeEventListener(visibilityChange, () => {
                    //console.log("removed listener") 
                });
            }

        }
    }

    urlencode = (str) => {
        str = (str + '').toString();
        // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
        // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
        return encodeURIComponent(str)
            .replace('!', '%21')
            .replace('\'', '%27')
            .replace('(', '%28')
            .replace(')', '%29')
            .replace('*', '%2A')
        //   .replace('%20', '+');
    }
    componentWillUnmount() {
       
        localStorage.setItem('showAbout', true);
        this.handleLoad("remove");
        clearInterval(this.interval);
    }
    gotoMatchDetails = (value) => {
        if (value == "goMatchDetails") {
            this.sendTrack('ACB_Cricket_score')
            let id = this.state.cricketScoreData.matchId
            if (id != "" && id != null) {
                openAirtel(baseURI + '?screen=scorecard');
                //this.props.history.push(baseUrl + "/score-details", id)
            }
        }
    }

    selectedTab = (tab) => {
        if (tab == "In Progress") {
            this.setState({ isShowInprogress: true, isShowUpcoming: false, isShowRecent: false })
        }
        if (tab == "Upcoming") {
            this.setState({ isShowInprogress: false, isShowUpcoming: true, isShowRecent: false })
        }
        if (tab == "Recent") {
            this.setState({ isShowInprogress: false, isShowUpcoming: false, isShowRecent: true })
        }
    }
    playGame = (id) => {
        this.setState({ showGame: false })
        //window.location.href = this.state.showGameData.url
    }
    hideYesPoint = () => {
        // localStorage.setItem('userShowYesterday', 'true');
        localStorage.setItem('yest', 'false');
        localStorage.setItem('showpopup', 'false');
        this.setState({ showYesPoint: false })
        this.setFlag()

    }
    redirectToGame = (url) => {
        aaTrackACB(`acb_home_click`, "Home Page Clicks", url, "Home")
        // const URLS = {
        //     "fielder-challenge": "fielder",
        //     "super-cricket": "supercricket"
        // }
        // let url = `${baseURI}?screen=${URLS[id]}`
        openAirtel(baseURI + url);
        this.setState({ showGame: false });
    }

    redirectQuiamania = () => {
        openAirtel(baseURI + "?screen=quizmania")
        this.setState({ showGame: false });
        this.sendTrack('Acb_Quizmania')
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // do things with nextProps.someProp and prevState.cachedSomeProp
        return {
            points: localStorage.getItem("points")
            // ... other derived state properties
        };
    }



    sendTrack = (eventLabel) => {

        let user_id = localStorage.getItem('user_id')
        let token_id = localStorage.getItem('token_id')

        // (user_id, event_id, token_id, eventAction, eventLabel, page_name)
        aaTrackACB('acb_home_click', 'Home Page Clicks', eventLabel, 'ACB_homepage');

    }

    clickViewLeader = (e, url) => {
        e.preventDefault();
        localStorage.setItem("ldr_frm", true)
        openAirtel(url)
        this.sendTrack('Acb_leaderboard_view_details')
    }

    clickNews = () => {
        this.sendTrack('ACB_News')
    }

    render() {
        let allNews, allLeaders;
        if (this.state.newsData && this.state.newsData.length > 0) {
            allNews = this.state.newsData.map((el) => {
                return (
                    <News
                        image={el.thumb_image}
                        link={el.link}
                        title={el.title}
                        description={el.description}
                        key={el.id}

                    />)
            })
        }

        let yesterday = moment().subtract(1, 'days').format('DD-MM-YYYY');
        // console.log('yesterday', yesterday)

        const renderer = ({ hours, minutes, seconds, completed }) => {
            if (completed) {
                // Render a completed state
                return;
            } else {
                // Render a countdown
                // return <span className="hr">{hours}:{minutes}:{seconds}</span>;
                return (<>
                    <input id="counter_time" className="counter_time" type="hidden" value="2020/09/15 23:00:00" />
                    <div className="counter_box">
                        <div className="timecount">
                            <div className="counter d-flex jus-c-center al-i-center">
                                <ul id="future_date" className="future_date">
                                    <li>{hours >= 10 ? hours : '0' + hours}<span>Hours</span></li>
                                    <li>{minutes >= 10 ? minutes : '0' + minutes}<span>Minutes</span></li>
                                    <li>{seconds >= 10 ? seconds : '0' + seconds}<span>Seconds</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>)
            }
        };

        // if (this.state.leaderData && this.state.leaderData.length > 0) {
        //     allLeaders = this.state.leaderData.map((el) => {
        //         return (
        //             <tr className="" key={el.userName}>
        //                 <td>{el.rank}</td>
        //                 <td>{el.mobile}</td>
        //                 <td>{el.points}</td>
        //             </tr>

        //         )
        //     })
        // }


        return (
            <>
                {this.state.isShowLoader == true ? <div className="loader_main">
                    <div className="loaderBg"></div>
                    <div className="loadingTXt">Loading...</div>
                    <div className="loader">Loading...</div>
                </div> : null}

                <Header
                    points={this.state.points}
                    username={this.state.username}
                    refreshUserName={this.refreshUserName}
                    screen={"home"}
                    sendTrack={this.sendTrack}
                />

                {(this.state.displayGame && 'spin-to-wheel' in this.state.displayGame && this.state.displayGame['spin-to-wheel'] == 1) ? <section className="freeHit-Bx mt-15">
                    <div className="container2 brdr-rad12 of-hdn pd15 pos-rel"
                        onClick={this.gotoSpinner}
                    >
                        {/* <a href="spinner.html" className="d-flex jus-s-between al-i-center"> */}
                        <a className="d-flex jus-s-between al-i-center">
                            <div className="bg-lft"></div>
                            <div className="txtBtn">
                                <strong>Free Hit</strong>
                                <span>Spin to win exciting coupons</span>
                            </div>
                            <span className="arwBtn"></span>
                        </a>
                    </div>
                </section>
                    : null}

                {this.state.cricketScoreData.venue && this.state.cricketScoreData.match_started >= 1?<RenderScoreCard cricketScoreData={this.state.cricketScoreData} content={this.state.content} gotoMatchDetails={this.gotoMatchDetails}/>: null}
                {(this.state.displayGame && 'predict-to-win' in this.state.displayGame && this.state.displayGame['predict-to-win'] == 1) ?
                    <section className="predictBx mt-15">
                        {/* onClick={this.gotoPre2Win} */}
                        <div className="container2 brdr-rad12 pos-rel" onClick={() => this.toggleGamePopup('predict_to_win', 'Predict To Win')} >
                            {/* <a href="select_team.html" className="d-flex jus-s-between al-i-center col-wht"> */}
                            <a className="d-flex jus-s-between al-i-center col-wht">
                                <div className="lft">
                                    <span className="ttlSty1 d-block">Predict to Win</span>
                                    <span className="ttlSty2">A Samsung M31 with every match</span>
                                    <span className="btnYlw d-flex jus-s-between al-i-center">Click To Play</span>
                                </div>
                                <div className="ryt">
                                    <div className="imgBx">
                                        <img src="images/award-img.png" />
                                    </div>
                                </div>
                            </a>
                        </div>
                    </section>
                    : null}


                {(this.state.displayGame && 'quiz-mania' in this.state.displayGame && this.state.displayGame['quiz-mania'] == 1) ?
                    <section className="qmBx mt-15">
                        <div className="container2 brdr-rad12 pos-rel">

                            {/* onClick={() => { openAirtel(baseURI + "?screen=quizmania") }} */}
                            <div className="d-flex jus-s-between al-i-center col-wht" onClick={() => this.toggleGamePopup('quizmania', 'Quizmania')} >
                                <div className="lft">
                                    <span className="ttlSty1 ftw-600 pos-rel t-uppercase"><span className="pos-rel">Quiz<i className="col2">mania</i></span></span>
                                    <span className="ttlSty2 d-block">Challenge your friends to take a quiz</span>
                                    <span className="btnwht d-flex jus-s-between al-i-center">Click To Play</span>
                                </div>
                                <div className="ryt">
                                    <div className="imgBx">
                                        <img className="d-block" src="images/qm-gfx.svg" />
                                    </div>
                                </div>
                            </div>
                            {/* </a> */}
                        </div>
                    </section>
                    : null}

                {/* <section className="cricket_score_card">
 <h4 className="cr_sc_title">Cricket Score</h4>
 
 <div className="cricket_scroll">
 
 {this.state.cricketScoreData.length > 0 ?
 this.state.cricketScoreData.map((data, index) =>
 <div className="card_shadow mr10">
 <h4 className="cr_sc_row1">{data.venue.content}</h4>
 <div className="cr_card_white">
 <div className="cr_card_white_row1">
 <div className="cr_l_row">
 <div className="cr_team_left">
 <img src="/images/svg/city/delhi.svg" className="cr_team_img" />
 </div>
 <div className="crml10">
 <h2 className="cr_tm_name_txt">{data.team1}</h2>
 <h2 className="cr_tm_score">234/4</h2>
 <h2 className="cr_tm_over">20.0 ov</h2>
 </div>
 </div>
 <div className="cr_l_row">
 
 <div className="crmr10">
 <h2 className="cr_tm_name_txt">{data.team2}</h2>
 <h2 className="cr_tm_score">234/4</h2>
 <h2 className="cr_tm_over">20.0 ov</h2>
 </div>
 <div className="cr_team_right">
 <img src="/images/svg/city/punjab.svg" className="cr_team_img" />
 </div>
 </div>
 </div>
 <h4 className="crftr_txt">CSK needs 45 runs in 22 balls at 7.6</h4> 
 </div>
 </div>) : null}
 </div>
 </section> */}

                {this.state.cricketScoreData.venue && this.state.cricketScoreData.match_started < 1 ? <RenderScoreCard cricketScoreData={this.state.cricketScoreData} content={this.state.content} gotoMatchDetails={this.gotoMatchDetails}/>: null}


                <section className="gamesContnr mt-15">
                    <div className="container2 d-flex">
                        {this.state.gameData.length > 0 ?
                            this.state.gameData.map((data) => {
                                if (data.id == 'spin-to-wheel' || data.id == 'predict-to-win' || data.id == 'quiz-mania') {
                                    return;
                                } else if (data.priority) {
                                    return (<Game
                                        banner={data.banner_image}
                                        name={data.name}
                                        url={data.url}
                                        key={data.name}
                                        id={data.id}
                                        toggleGamePopup={this.toggleGamePopup}
                                    />);
                                }

                            }
                            ) : null}
                    </div>
                </section>


                <section className="advrtiseBx mt-15" onClick={() => this.sendTrack('Acb_Ad')}>
                    <div className="container2 homepagead">
                        <span>Advertisement</span>

                         {/* <img src="images/ad-banner.png" />  */}

                        <div id="div-gpt-ad-1599470843941-1" >
                            <GPT
                                adUnitPath="/1068322/NDTV_Airtel_IPL_APP_300x250BTF"
                                slotSize={[300, 250]}
                            />
                        </div>


                    </div>
                </section>

                <section className="ldrboard mt-15">
                    <div className="container2">
                        <div className="d-flex jus-s-between mb-10 al-i-center">
                            <h2 className="widgtTtl1">Leaderboard</h2>
                            <div className="btnRyt">
                                <a onClick={(e) => { this.clickViewLeader(e, baseURI + "?screen=leaderboard") }}>View Details &nbsp;</a>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                        <div className="tablStyl1 mb-20 mt-30 brdr-rad12 col2">
                            <div className="topRow d-flex jus-s-between brdr-rad8 pd10 pos-rel">
                                <div>
                                    <span className="d-block transform-cap">{this.state.updated_username}</span>
                                    <span className="d-block">Your Avtar</span>
                                </div>
                                <div>
                                    <span className="d-block">
                                        <span className="crcl d-flex al-i-center jus-c-center">{this.state.userObj.rank}</span>
                                    </span>
                                    <span className="d-block">Your Rank</span>
                                </div>
                                <div className="t-right">
                                    <span className="d-block">{this.state.userObj.points}</span>
                                    <span className="d-block">Score</span>
                                </div>
                            </div>
                            <div className="pdlr10">
                                <table className="" cellPadding="0" cellSpacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Rank</th>
                                            <th>&nbsp;</th>
                                            <th>Avtar Name</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.leaderData && this.state.leaderData.length > 0 ?
                                            this.state.leaderData.map((el) =>
                                                <tr className="active" key={el.userName}>
                                                    {el.rank == "1" ? <td className="orange1">{el.rank}</td> :
                                                        el.rank == "2" ? <td className="grey1">{el.rank}</td> :
                                                            el.rank == "3" ? <td className="orange2">{el.rank}</td> : <td className="">{el.rank}</td>}

                                                    {/* <td>{el.rank}</td> */}

                                                    <td>
                                                        {el.rank == "1" ? <img src={"images/svg/award-1.svg"} className="tbl_ico" /> :
                                                            el.rank == "2" ? <img src={"images/svg/award-2.svg"} className="tbl_ico" /> :
                                                                <img src={"images/svg/award-3.svg"} className="tbl_ico" />}</td>
                                                    <td className="transform-cap">{el.userName}</td>


                                                    {el.rank == "1" ? <td className="cup_brown_active orange1">{el.points}</td> :
                                                        el.rank == "2" ? <td className="cup_brown_active grey1">{el.points}</td> :
                                                            el.rank == "3" ? <td className="cup_brown_active orange2">{el.points}</td> : <td className="cup_brown_active">{el.points}</td>}

                                                    {/* <td>{el.points}</td> */}

                                                </tr>) : null}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section className="predictBx mt-30">
 <div className="container2 container3 brdr-rad12 pos-rel">
 <a href="#" className="d-flex jus-s-between al-i-center col-wht">
 <div className="lft">
 
 </div>
 <div className="ryt">
 <div className="imgBx">
 
 </div>
 </div>
 </a>
 </div>
 </section> */}


                {/* <section className="ldrboard mt-30">
 <div className="container2">
 <div className="d-flex jus-s-between al-i-center">
 <h2 className="widgtTtl">Leaderboard</h2>
 
 <div className="btnRyt">
 <Link to="leaderboard">More</Link>
 </div>
 
 </div>
 <div className="">
 <table className="tablStyl1 mb-20 mt-10 brdr-rad12 of-hdn" cellPadding="0" cellSpacing="0" width="100%">
 <thead>
 <tr>
 <th>Rank</th>
 <th>Mo. Number</th>
 <th>Score</th>
 </tr>
 </thead>
 <tbody>
 {allLeaders}
 </tbody>
 </table>
 </div>
 </div>
 </section> */}


                {/* <section className="cricketScor mt-30">
 <div className="container2">
 <div className="d-flex jus-s-between al-i-center">
 <h2 className="widgtTtl">Cricket Score</h2>
 </div>
 <div className="tabsDta mt-10">
 <div className="tabsHdr">
 <ul className="d-flex">
 <li className={this.state.isShowInprogress ? "actvTb" : ""}
 onClick={() => this.selectedTab("In Progress")}><a>In Progress</a></li>
 
 <li className={this.state.isShowUpcoming ? "actvTb" : ""}
 onClick={() => this.selectedTab("Upcoming")}><a>Upcoming</a></li>
 
 <li className={this.state.isShowRecent ? "actvTb" : ""}
 onClick={() => this.selectedTab("Recent")}><a>Recent</a></li>
 </ul>
 </div>
 <div className="tabsCont pd15">
 {this.state.isShowInprogress == true ? <InProgressScore /> : null}
 {this.state.isShowUpcoming == true ? <UpcomingScore /> : null}
 {this.state.isShowRecent == true ? <RecentScore /> : null}
 </div>
 </div>
 </div>
 </section> */}


                {this.state.newsData && this.state.newsData.length > 0 ? <section className="newsWdgt mt-15">
                    <div className="container2">
                        <div className="">
                            <h2 className="widgtTtl">News</h2>
                        </div>
                    </div>
                    <div className="newsScrl pb-20 d-flex" id="newstext" onClick={this.clickNews}>
                        {allNews}
                    </div>
                </section> : null}


                {/* Drawer */}
                {localStorage.getItem("info") == 'true' ? <About closeDrawer={this.showDrawer} /> : null}
                <Footer screen="home" />


                {/* Spin Timer Popup */}
                {this.state.isShowSpinTimer ? <>
                    <div className="couponPopup activePopup">
                        <div className="couponPopupBg"></div>
                        <div className="couponPopupBx countDwn brdr-rad12">
                            <a href="#" className="skpBtn pd10 ft-14" onClick={this.closeTimer}>Close</a>
                            <h3 className="t-uppercase mt-10 mb-20 ft-24 ftw-600 col-blk">Next Spin</h3>
                            <div className="clearfix"></div>
                            <div className="countDwnBx">
                                <Countdown daysInHours={true} date={Date.now() + parseInt(this.state.timer)} renderer={renderer} /><br />
                                {/* <span>hh mm ss</span> */}
                            </div>
                            <div className="clearfix"></div>
                            <div className="predictBtn pos-stc">
                                <a className="btnArea btnStyl1" onClick={this.closeTimer}>
                                    <span className="btnStyl1 d-inlnblk t-uppercase">Play More Games</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </> : null}



                {this.state.showGame == true ? <div className="couponPopup activePopup">
                    <div className="couponPopupBg "></div>
                    <div className="couponPopupBx predictBtn">
                        <a className="skpBtn pd10 ft-14" onClick={this.toggleGamePopup}>Close</a>
                        {/* <div className="imgBx">
         <img src="images/samsung.png" />
         </div> */}
                        <h4 className="ft-16 col-blk coupon-txt mt-20 mb-20 ft-20 t-uppercase ftw-600 mlr-auto lh-1pt4">{this.state.showGameData.name}</h4>
                        <div className="clearfix"></div>
                        <span className="noteTxt d-block t-left mb-20 lh-1pt3 ptwtext">
                            {this.state.showGameData.id == 'fielder-challenge' ? 'Show your fielding and catching skills and Challenge different teams. This game tests your reflexes of how well you defend the wicket. This is a sports game which works well in all devices.' : this.state.showGameData.id == 'super-cricket' ? 'Play this fantastic and exciting cricket game on any device to test your batting as well as bowling skills. Choose from different types of tournaments such as Quick Game, One-on-One or World Cup and play against the team of your choice.' : this.state.showGameData.id == 'quizmania' ? <><ul>
                                <li>Play Quiz Mania with your friend</li>
                                <li>It’s a 2 player quiz, you can select your team to start</li>
                                <li>Player 1 can challenge their friend by creating a room and sharing the code with them.</li>
                                <li>Both players need to answer 3 questions related to their chosen team within 15 seconds.</li>
                                <li>Players will be awarded 10 points for each correct answer.</li>
                                <li>The Player with the highest points wins the game.</li>
                                <li>The opponent’s points will be added to the winner’s overall points pool.</li>
                                <li>In case of a tie, there will be a tie breaker question. </li>
                                <li>Play QuizMania, score points, and get a chance to win Royal Enfield Classic 350.</li>

                            </ul></> : this.state.showGameData.id == 'predict_to_win' ? <><ul>
                                <li>Answer 3 questions related to the match.</li>
                                <li>Earn 50 points for each correct answer.</li>
                                <li>Player 1 can challenge their friend by creating a room and sharing the code with them.</li>
                                <li>You can earn bonus 50 points if all the three answers are correct.</li>
                                <li>These points will be added to your overall points pool.</li>
                                <li>Win assured brand coupons by participating in Predict and Win </li>
                                <li>You also get a chance to win a Samsung M31 with every match & a Royal Enfield Classic 350.</li>
                                <li>Predict to Win will be live till the mid innings of every match.</li>
                                <li>Winners of the contest will be announced at 10 AM the next day.</li>


                            </ul></> : null}</span>

                        {this.state.showGameData.id == 'fielder-challenge' ?

                            <table className="table-bordered">
                                <thead  >
                                    <tr>
                                        <th colSpan="3" className="t-center bgtbl">Cricket Fielder Challenge</th>
                                    </tr>
                                    <tr>
                                        <th width="50%" className="t-center">Event</th>
                                        <th className="t-center">Points</th>
                                    </tr>
                                </thead>
                                <tbody className="pointBody">

                                    <tr>
                                        <td className="">4 catches</td>
                                        <td className="">5 pts</td>
                                    </tr>
                                </tbody>
                            </table> : this.state.showGameData.id == 'super-cricket' ?
                                <table className="table-bordered">
                                    <thead className="pointTableHead">
                                        <tr>
                                            <th colSpan="3" className="t-center bgtbl">Super Cricket</th>
                                        </tr>
                                        <tr>
                                            <th width="50%">Event</th>
                                            <th>Points</th>
                                        </tr>
                                    </thead>
                                    <tbody className="pointBody">

                                        <tr>
                                            <td>One to one match</td><td>5 pts</td>
                                        </tr>
                                        <tr><td>Quick Play</td><td>5 pts</td></tr>
                                        <tr><td>Q-final</td><td>5 pts</td></tr>
                                        <tr><td>S-final</td><td>10 pts</td></tr>
                                        <tr><td>Final</td><td>10 pts</td></tr>
                                    </tbody>
                                </table>

                                : null}




                        {this.state.showGameData.id == 'quizmania' ? <a className="btnArea btnStyl1" onClick={this.redirectQuiamania}><span className="btnStyl1 d-inlnblk t-uppercase">play</span></a> : null}


                        {this.state.showGameData.id == 'predict_to_win' ? <a className="btnArea btnStyl1" onClick={this.gotoPre2Win}><span className="btnStyl1 d-inlnblk t-uppercase">play</span></a> : null}

                        {this.state.showGameData.id == 'fielder-challenge' || this.state.showGameData.id == 'super-cricket' ? <a className="btnArea btnStyl1" onClick={() => { this.redirectToGame(this.state.showGameData.url) }}><span className="btnStyl1 d-inlnblk t-uppercase">play</span></a> : null}

                    </div>
                </div>
                    : null
                }





                {/* Yesterday Point Popup */}
                { localStorage.getItem("showpopup") == 'true' && localStorage.getItem('yesterdayPoint') > 0 ?
                    <div id="popup2" className="couponPopup repeat-user activePopup">
                        <div className="couponPopupBg"></div>
                        <div className="couponPopupBx predictBtn winn_animation">
                            <div className="confettiBx"></div>
                            <div className="confettiCnt">
                                <a href="#" className="skpBtn pd10 ft-14" onClick={this.hideYesPoint}>Close</a>
                                <h2 className="mtb-15 mlr-auto lh-1pt3 ftw-600"></h2>
                                <h3 className="ftw-600 mb-20">Your Yesterdays’s Point</h3>
                                <span className="scrBx mlr-auto d-flex jus-c-center al-i-center ftw-600">{localStorage.getItem('yesterdayPoint')}</span>
                                <div className="ttlScrBx width-80p mtb-15 mlr-auto pd10">Your Total Points <b>{localStorage.getItem('points')}</b><br />
                Highest Score <b>{localStorage.getItem('highestScore')}</b>
                                </div>

                                <div className="">

                                    {/* <Link to="#" className="btnArea btnStyl1"><span className="btnStyl1 d-inlnblk t-uppercase" onClick={this.hideYesPoint}>Continue Playing</span></Link> */}

                                    <a className="btnArea btnStyl1" onClick={this.hideYesPoint}>
                                        <span className="btnStyl1 d-inlnblk t-uppercase">Keep Playing</span>
                                    </a>

                                </div>

                                <Link className="blueLnk ft-13 mb-10 d-block" to={baseUrl + "/how-to-play"} onClick={this.hideYesPoint}>Learn how to earn points.</Link>


                                <div className="btnCnftti d-none">
                                    <button id="startConfetti">Start</button>
                                    <button id="stopConfetti">Stop</button>
                                    <button id="restartConfetti">Restart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
                }

                {/* prediction-closed-popup */}
                {
                    this.state.pre2winPop ? <div className="couponPopup activePopup">
                        <div className="couponPopupBg"></div>
                        <div className="couponPopupBx countDwn brdr-rad12">
                            <a className="skpBtn pd10 ft-14" onClick={this.closePre2Win}>Close</a>
                            <h3 className="mt-10 mb-20 ft-24 ftw-600 col-blk">Sorry!</h3>
                            <div className="clearfix"></div>
                            <div className="sorryImg">
                                <img src="/agames/images/sorry-gfx.svg" />
                            </div>
                            <div className="clearfix"></div>
                            <div className="ft-16 mb-5 mt-10">Today's prediction is closed, winners will be announced at 10 AM tomorrow.</div>
                            <div className="ft-16">Come and play again tomorrow.</div>
                        </div>
                    </div> : null
                }
                {/* prediction-closed-popup */}

                {/* Something Went Wrong Popup */}
                {/*
                    this.state.showSomeWentWrg ? <div className="couponPopup activePopup">
                        <div className="couponPopupBg"></div>
                        <div className="couponPopupBx countDwn brdr-rad12">
                <h3 className="mt-10 mb-20 ft-24 ftw-600 col-blk">{this.state.SomeWentWrgMsg}</h3>
                            <div className="clearfix"></div>
                            <div className="sorryImg">
                                <img src="/agames/images/sorry-gfx.svg" />
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div> : null
                */}



            </>
        )

    }
    
}
const RenderScoreCard = ({cricketScoreData, content, gotoMatchDetails}) => {
    return <section className="cricketScor mt-15">
    <div className="container2">
        <div className="d-flex jus-s-between al-i-center">
            <h2 className="widgtTtl">Cricket Score</h2>
        </div>
    </div>

    <div className="container2 mt-10"
         onClick={cricketScoreData.match_started == 1 ? () => gotoMatchDetails("goMatchDetails") : () => gotoMatchDetails("notGoMatchDetails")}
    >
        <div className="cricket_scroll">
            <div className="scrCrd">
                <div className="sC_Adrs pd6 mlr-auto t-center">{content}</div>
                <div className="sC_Dtls brdr-rad12 pd20 pb-10">
                    <div className="sC_Dtls_Insd d-flex jus-s-between width-100p">
                        <div className="lft orange d-flex al-i-center">
                            <div className="icnContr1 d-flex jus-c-center al-i-center brdr-rad12">
                                {/* <img src="images/chennai-lc-icon.svg" /> */}
                                <div className={"team_card_circle_ptw team_grd_" + cricketScoreData.team1}>
                                    <img src={"images/city/" + cricketScoreData.team1 + ".svg"}
                                        className="team_card_circle_img" />
                                </div>
                            </div>
                            <div className="txtContr ml-20">
                                <span className="ft-12 d-block">{cricketScoreData.team1}</span>
                                <span className="ft-18 d-block ftw-600">
                                    {cricketScoreData.team_1_secore + "/" + cricketScoreData.team_1_wicket}
                                </span>
                                <span className="ft-12 d-block">{cricketScoreData.team_1_over} ov</span>
                            </div>
                        </div>
                        <div className="ryt red d-flex al-i-center">
                            <div className="txtContr mr-20">
                                <span className="ft-12 d-block">{cricketScoreData.team2}</span>
                                <span className="ft-18 d-block ftw-600">{cricketScoreData.team_2_secore + "/" + cricketScoreData.team_2_wicket}</span>
                                <span className="ft-12 d-block">{cricketScoreData.team_2_over} ov</span>
                            </div>
                            <div className="icnContr1 d-flex jus-c-center al-i-center brdr-rad12">
                                {/* <img src="images/delhi-lc-icon.svg" /> */}
                                <div className={"team_card_circle_ptw team_grd_" + cricketScoreData.team2}>
                                    <img src={"images/city/" + cricketScoreData.team2 + ".svg"}
                                        className="team_card_circle_img" />
                                </div>
                            </div></div>
                    </div>
                    <div className="mt-10 t-center mtchSts">{cricketScoreData.match_summary}</div></div></div>
        </div>
    </div>
</section>
}