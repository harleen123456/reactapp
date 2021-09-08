import React from 'react';
import { NavLink } from 'react-router-dom';
import ReactGA from 'react-ga';
// import '../Assets/css/style.css'
import TeamCard from '../Components/TeamCards/TeamCard'
// import {   } from "../Services/Services"
import { getTeams, confirmInvite, sendInvite, gameInit, gameUpdate, checkQuizStatus } from "../../Services/Service"
import { baseUrl, aaTrackPageview, aaTrackACB } from '../../Config/Config'

import ContestJoinError from '../Components/Modal/ContestJoiningErrorPopup'

export default class SelectTeamScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTeam: "",
            loading: true,
            team_list: [],
            room_code: "",
            join_room: false,
            already_joined: false,
            invalid_cd: false,
            same_user: false,
            game_started: false,
            current_quiz: {
                player1_id: ""
            }

        }
        this.handleTeamSelect = this.handleTeamSelect.bind(this)
    }
    handleTeamSelect(team) {
        /*let urlParams = new URLSearchParams(window.location.search);
        let constructId = urlParams.get('constructId');
        let tokenId = urlParams.get('token_id');
        let secret = urlParams.get('secret');
        let gameID = "quizmania";*/
        //console.log(team)
        //this.sendTrack("acb_quiz_mania_click", "Quiz Mania Clicks", "ACB_Quiz_Mania_Team_name " + team.team_name);
        window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "quiz_mania_team_select", "optional": team.team_name }, "*");
        this.setState({ selectedTeam: team.team_id })
        localStorage.setItem("selected_team", JSON.stringify(team.team_id))
    }

    async componentDidMount() {
        let gameID = "quizmania";
        let urlParams = new URLSearchParams(window.location.search);
        let constructId = localStorage.getItem("constructId");
        let tokenId = localStorage.getItem("token_id");
        let secret = localStorage.getItem("secret");
        let appusername = localStorage.getItem("username");
        document.title = "Quizmania"
        ReactGA.pageview("Quizmania | Select Team");
        //aaTrackPageview("pageview", "Quizmania", "ACB_Quiz_mania")
        window.parent.postMessage({ "constructId": constructId, "tokenId": tokenId, "gameID": gameID, "eventName": "pageview", "optional": "Quiz Mania Team Selection" }, "*");
        let pay = {
            "game_id": "quizmania"
        }
        let response1 = await gameInit(pay)

        let room_code = localStorage.getItem("room_code")
        //console.log("helo code", room_code)
        if (room_code !== null) {
            let payld = {
                room_code: room_code
            }
            let response2 = await checkQuizStatus(payld)
            //console.log("helo code", (payld), response2)
            if (response2.success == true) {
                if (response2.room.status === "started") {
                    localStorage.setItem("current_quiz", JSON.stringify(response2.room))
                    this.setState({ current_quiz: response2.room, room_code }, () => {
                        // this.props.history.replace(`${baseUrl}/quiz-mania/splash`)
                    })
                }
                //  else if (response2.room.status === "cancelled") {
                // aaTrackPageview("pageview", "Quizmania | Friend Selected | Room Cancelled PopUp", "ACB_Quiz_mania")
                // this.setState({ active_next: false, room_join_err: true, room_err_msg: "Opponent has left the room." })
                // } 
                else {
                    localStorage.setItem("current_quiz", JSON.stringify(response2.room))
                    this.setState({ current_quiz: response2.room, room_code })
                }
            }
        }

        // console.log(response1)
        if (response1.success == true) {
            localStorage.setItem("sr_gameInsID", response1.data.gameInsID)
            await localStorage.setItem("sr_game_id", "quizmania")
            // let type = await localStorage.getItem("sr_game_id")
            let payload = { "gameID": "quizmania", "gameInsID": response1.data.gameInsID, "gameEvent": "quiz_game_start" }
            await gameUpdate(payload)
        }
        let response = await getTeams();
        //console.log("getteams", response)
        if (response.success === true) {
            this.setState({ team_list: response.data })
        }
        // this.setState({ user_data: user })
    }

    sendTrack = (event, eventAction, eventLabel) => {
        aaTrackACB(event, eventAction, eventLabel, "ACB_Quiz_mania");
    }
    handleCreateRoom = async () => {
        /*let urlParams = new URLSearchParams(window.location.search);
        let constructId = urlParams.get('constructId');
        let tokenId = urlParams.get('token_id');
        let secret = urlParams.get('secret');
        let gameID = "quizmania";*/
        let { selectedTeam, room_code } = this.state;
        //this.sendTrack("acb_quiz_mania_click", "Quiz Mania Clicks", (room_code != null && room_code != "") ? "Create New Game" : "Create Room");
        window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "quiz_mania_create_new_room", "optional": "Create Room" }, "*");
        if (selectedTeam !== "") {
            let user = localStorage.getItem("username")
            let payload = {
                team_id: selectedTeam
            }
            let response = await sendInvite(payload);
            if (response.success === true) {
                console.log(response);
                // aaTrackACB("quiz_create_room_clicked", "Quizmania Select team clicks", (room_code != null && room_code != "") ? "Create New Game" : "Create Room", "ACB_Quiz_mania")
                localStorage.setItem("current_player", response.room.creater_id)
                localStorage.setItem("current_quiz", JSON.stringify({ ...response.room, player1_id: user }))
                this.props.history.push(`${baseUrl}/quiz-mania/chalange-friends`)
            }
        }

    }
    handleJoinRoom = () => {
        /*let urlParams = new URLSearchParams(window.location.search);
        let constructId = urlParams.get('constructId');
        let tokenId = urlParams.get('token_id');
        let secret = urlParams.get('secret');
        let gameID = "quizmania";*/
        let { selectedTeam, join_room } = this.state;
        // this.sendTrack("acb_quiz_mania_click", "Quiz Mania Clicks", "Join Room Popup " + (join_room ? "Close" : "Open"));
        //this.sendTrack("acb_quiz_mania_click", "Quiz Mania Clicks", "Join Room");
        window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "quiz_mania_join_room_click", "optional": "Join Room" }, "*");
        if (selectedTeam !== "") {
            let room = localStorage.getItem("room_code");
            if (room != "" && room.length == 6) {
                this.setState({ room_code: room }, this.handleJoin)
                localStorage.setItem("room_code", "");
            } else {
                // this.setState({ join_room: !join_room })
            }
        }

    }
    handleJoin = async () => {
        //this.sendTrack("acb_quiz_mania_click", "Quiz Mania Clicks", "Join | Room Code " + this.state.room_code);
        window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "quiz_mania_join", "optional": "Join | Room Code " + this.state.room_code }, "*");
        if (this.state.room_code == '' || this.state.room_code == undefined) {
            this.setState({ invalid_cd: true, err_msg: "Please enter room code" })
            return
        }

        let user = localStorage.getItem("username");
        let { selectedTeam } = this.state;
        let payload = {
            "player_id": user,
            "invite_type": "invitee",
            "room_code": this.state.room_code,
            "team_id": selectedTeam,
            // id: "0ef44fc5-5663-4265-84ea-c819be35a2b6"
        }
        //         1. Same user try to joined game
        // 2. Invalid code
        // 3. Already joined
        // 4. Game not exist
        let response = await confirmInvite(payload);
        if (response.success === true) {
            let user_id = localStorage.getItem("user_id")
            let token_id = localStorage.getItem("token_id")

            localStorage.setItem("current_player", response.room.guest_id)
            localStorage.setItem("current_quiz", JSON.stringify({ ...response.room, player2_id: user }))
            this.props.history.push(`${baseUrl}/quiz-mania/friend-selected`)
        } else if (response.message == "room_full") {
            window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "room_full", "optional": "Quizmania | Game has already started PopUp" }, "*");
            //aaTrackPageview("pageview", "Quizmania | Room Full PopUp", "ACB_Quiz_mania")
            this.setState({ game_started: true, err_msg: "The game has already started" })
        } else if (response.message == "invaild_room") {
            window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "room_invalid", "optional": "Quizmania | Invalid Room PopUp" }, "*");
            //aaTrackPageview("pageview", "Quizmania | Invalid Room PopUp", "ACB_Quiz_mania")
            this.setState({ invalid_cd: true, err_msg: "Wrong room code entered! Please enter the correct room code." })
        } else if (response.message == "already_join") {
            window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "room_already_joined", "optional": "You have already joined the game" }, "*");
            //aaTrackPageview("pageview", "Quizmania | Already Joined PopUp", "ACB_Quiz_mania")
            this.setState({ already_joined: true, err_msg: "You have already joined the game" })
        }
    }
    close = () => {
        let urlParams = new URLSearchParams(window.location.search);
        let constructId = urlParams.get('constructId');
        let tokenId = urlParams.get('token_id');
        let secret = urlParams.get('secret');
        let gameID = "quizmania";
        //this.sendTrack("acb_quiz_mania_click", "Quiz Mania Clicks", this.state.game_started ? "Pop Up | Play more games" : "Pop Up | Ok");
        if (this.state.err_msg == "The game has already started") {
            this.setState({
                already_joined: false,
                invalid_cd: false,
                same_user: false,
                game_started: false
            }, () => {
                //this.props.history.push(`${baseUrl}/`)
                    window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "play_more_games", "optional": "0" }, "*");
            })
        } else {
            this.setState({
                already_joined: false,
                invalid_cd: false,
                same_user: false,
                game_started: false
            })
        }

    }
    render() {
        let { selectedTeam, team_list, join_room, err_msg, already_joined, invalid_cd, same_user, game_started, current_quiz, room_code } = this.state;
        return (<>
            {(already_joined == true || invalid_cd == true || same_user == true || game_started == true) ? <ContestJoinError err_msg={err_msg} close={this.close} /> : null}
            <div className="p2w__bg2 height-100p drawer">

                <div className="popupqm">
                    <div className="popupBgqm"></div>
                    <div className="drawerCont width-100p pos-abs z-in_2 btm-0">
                        <div className="logo t-center mb-20">
                            <img src={`${baseUrl}/images/logo2.png`} width="101" />
                        </div>
                        <div className="mt-30 ">
                            {room_code == "" ? 

                                <h4 className="user_willstar"> Choose your team to create room</h4>

                                : <h4 className="user_willstar"> Choose your team to join room</h4>
                            }
                        </div>
                        <div className="pdlr25 pb-25 width-100p btm-0 ofy-auto">
                            <div className="lstngCts">
                                <ul>
                                    <TeamCard handleTeamSelect={this.handleTeamSelect} team_list={team_list} selectedTeam={selectedTeam} />
                                </ul>
                            </div>
                            {join_room ?

                                <div>
                                    <div className="fldArea mt-10">
                                        <a onClick={(e) => { e.preventDefault(); this.handleJoinRoom() }} className="skpBtn2 pd10 ft-14" >Close</a>
                                        <label className="d-block ftw-600 ft-10">Enter room ID</label>
                                        <input type="text" placeholder="Touch here to start typing" className="d-block ft-10 pd10 brdr-rad8" onChange={(event) => {
                                            this.setState({
                                                room_code: event.target.value
                                            })
                                        }} />
                                    </div>
                                    <div className="btnStyl1 mt-20 mb-15">
                                        <button className="brdr-rad8 t-uppercase col-wht ft-12  " onClick={this.handleJoin}>Join Room</button>
                                    </div>
                                </div>

                            : null}
                            {join_room ? null : <div>
                                {/* {localStorage.getItem("room_code") !== "" && localStorage.getItem("room_code") !== null ? */}
                                {(room_code != null && room_code != "") ?
                                    <button className={selectedTeam ? "btn_red_lg mb10" : "btn_gray mb10"} onClick={this.handleJoinRoom}>
                                        {(room_code != null && room_code != "") ? `Join ${current_quiz.player1_name}'s Room` : "Join Room"}
                                        <img src={`${baseUrl}/images/svg/right-arrow-white.svg`} className="next_wht_arr" />
                                    </button>
                                    : null}
                                <button className={selectedTeam ? "btn_red_lg mb10" : "btn_gray mb10"} onClick={this.handleCreateRoom}>
                                    {(room_code != null && room_code != "") ? "Create New Game" : "Create Room"}
                                    <img src={`${baseUrl}/images/svg/right-arrow-white.svg`} className="next_wht_arr" />
                                </button></div>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="btm_bg pos-abs btm-0 mb-0"></div>
            <div id='div-ad' align="center">
                <div id='div-gpt-ad-1616502930389-0'>
                    {window.googletag.cmd.push(function () { window.googletag.display('div-gpt-ad-1616502930389-0'); })}
                </div>
            </div>
        </>
        )
    }
}
