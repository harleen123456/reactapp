import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import $ from 'jquery';
import queryString from 'query-string';
import moment from 'moment';
import { baseUrl, aaTrackPageview } from '../Config/Config';
import Header from './Header';
import Footer from './Footer';
import FullScoreCard from '../Components/FullScoreCard';
import SingleTeamScoreCard from './SingleTeamScoreCard';
import { getJson, getCricketScoreCard } from '../Services/Service';
import ReactGA from "react-ga"

export default class ScoreDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: localStorage.getItem("username"),
            points: localStorage.getItem("points"),
            match_id: this.props.history.location.state ? this.props.history.location.state : null,
            isShowSingleScore: false,
            isShowFullScore: true,
            innings: [],
            matchdetail: {},
            notes: {},
            teams: {},
            isShowLoader: true,
            show1st: false,
            show2nd: false,
            pointsTableData : [],
            playerBowlingData : null,
            playerFilAndBatData : null,
            playerProfile : null

        }
        this.interval = null;
    }
    matchData = async () => {
        // let payload = {
        //     matchId : "kpmi10012020197700"
        // }
        let payload = {
            matchId: localStorage.getItem("crr_mtch")
           //  matchId : "bcmi09282020197697"
        }
        if (localStorage.getItem("crr_mtch") == null || localStorage.getItem("crr_mtch") == "") {
            return;
        }
        let res = await getCricketScoreCard(payload).catch(e => { })

        //let res = await getJson(`${baseUrl}/agamesapi/mick${this.state.match_id}.json`)

        if (typeof res === "object" && "Innings" in res && "Matchdetail" in res &&
         "Teams" in res && "Notes" in res) {
            // let teams = [];
            // for (const [key, value] of Object.entries(res.Teams)) {
            //     console.log(`${key}: ${value}`);
            //     value['team_id'] = key
            //   }
            //let teams = res.Teams.map((val, id)=>val)

            let { show1st, show2nd } = this.state;
            if (res.Innings.length !== 1 && (show1st == false && show2nd == false) && res.Matchdetail.Status !== "Match Ended") {
                show1st = false;
                show2nd = true;
            }else if(show1st === false && show2nd === false){
                show1st = true;
                show2nd = false;
            }
            console.log(show1st, show2nd);
            let matchdetail = res.Matchdetail
            let innings = res.Innings
            let teams = res.Teams
            let notes = res.Notes
            let pointsTableData = "teamPoints" in res ? res.teamPoints.standings.stage1.team : null
            let playerList = "playersStats" in res ? res.playersStats.playerList : null
            this.setState({
                matchdetail, innings, teams,
                notes, isShowLoader: false,
                show1st, show2nd, pointsTableData
            })
            this.getPlayer(innings,playerList);
        } else {
            this.setState({ isShowLoader: false })
        }


    }
  
    getPlayer = (innings,playerList) => {
            // Find Current Batting and Bowler player Ids
            let bastman_arr = []
            let bowler_id
            if(innings.length == 1){
                innings[0].Batsmen.map((data) => {
                    if(data.Howout == "Batting"){
                        bastman_arr.push(data.Batsman)
                    }
                })
                innings[0].Bowlers.map((value) => {
                    if(Number.isInteger(value.Overs) == false){
                        bowler_id = value.Bowler
                    }
                })
            }else if(innings.length == 2){
                innings[1].Batsmen.map((data) => {
                    if(data.Howout == "Batting"){
                        bastman_arr.push(data.Batsman)
                    }
                })
                innings[1].Bowlers.map((value) => {
                    if(Number.isInteger(value.Overs) == false){
                        bowler_id = value.Bowler
                    }
                })
            }
            // For Testing
            // bastman_arr.push("3723","64149")
            // bowler_id = "58155"

            
            let player_data = playerList
            let battingArr = []
            let bowlingData = {}
            if(player_data!== null && player_data.length > 0 && bastman_arr.length > 0){
                player_data.map((data)=> {
                    bastman_arr.map((d1)=>{
                        if(data.player_id == d1){
                            // Current Bastman Data
                            battingArr.push(data)
                        }
                    })
                    if(data.player_id == bowler_id){
                        // Current Bowling Data
                        bowlingData = data
                    }
                })
            }
            
            this.setState({ 
                        playerBowlingData : bowlingData,
                        playerFilAndBatData : battingArr,
                })
        
    }

    async componentDidMount() {
        ReactGA.pageview("Score Detail")
        aaTrackPageview("pageview", "Score Detail", "Score Detail")
        let id = this.state.match_id
        this.matchData();
        this.interval = setInterval(this.matchData, 30000)
       
        // this.interval = setInterval(this.getPlayer, 30000)
        // if (id != "" && id != undefined) {

        //     // let res = await getMatchDetails(id) 
        // }
    }
    componentWillUnmount() {
        if (this.interval !== null) {
            clearInterval(this.interval);
        }

    }
    render() {
        let { matchdetail, innings, notes, teams, show1st, show2nd, 
            pointsTableData, playerBowlingData, playerFilAndBatData  } = this.state;

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
                />
                {innings.length == 1 ?
                    <FullScoreCard
                        notes={notes}
                        innings={innings}
                        matchdetail={matchdetail}
                        teams={teams}
                        show1st={show1st}
                        show2nd={show2nd}
                        pointsTableData={pointsTableData}
                        playerFilAndBatData={playerFilAndBatData}
                        playerBowlingData={playerBowlingData}
                       
                    /> : innings.length == 2 ?
                        <FullScoreCard
                            notes={notes}
                            innings={innings}
                            matchdetail={matchdetail}
                            teams={teams}
                            show1st={show1st}
                            show2nd={show2nd}
                            pointsTableData={pointsTableData}
                            playerFilAndBatData={playerFilAndBatData}
                            playerBowlingData={playerBowlingData}
                            
                        /> : 
                        <span className="d-block t-center mb10 pdtb15 nofoundMinh">No Data Found</span>
                        }
                <Footer screen="home" page={"Score Detail"} />
            </>
        )
    }
}
