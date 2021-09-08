import React from 'react';
import { NavLink } from 'react-router-dom';
// import '../Assets/css/style.css'
// import { checkQuizStatus, startQuiz } from "../Services/Services"
import ReactGA from "react-ga"
import { checkQuizStatus, startQuiz, quitQuiz } from "../../Services/Service"
import { baseUrl, aaTrackPageview, aaTrackACB } from '../../Config/Config'
import ContestJoinError from '../Components/Modal/ContestJoiningErrorPopup'

export default class FriendSelected extends React.Component {
    constructor(props) {
        super(props);
        this.timer = null
        this.state = {
            current_quiz: null,
            room_join_err: false,
            room_err_msg: ""
        }
        this.getQuizStatus = this.getQuizStatus.bind(this)
        this.handleNext = this.handleNext.bind(this)
    }
    async componentDidMount() {
        ReactGA.pageview("Quizmania | Friend joined");
       
        //aaTrackPageview("pageview", "Quizmania | Friend Selected", "ACB_Quiz_mania")
        let current_quiz = JSON.parse(localStorage.getItem("current_quiz"));
        this.setState({ current_quiz })
       
        let payload = {
            "player1_id": current_quiz.player1_id,
            "player2_id": current_quiz.player2_id,
            "room_code": current_quiz.room_code
        }

        this.getQuizStatus(payload)

    }
    async handleNext() {
        let { current_quiz } = this.state;

        let payload = {
            player1_id: current_quiz.player1_id,
            player2_id: current_quiz.player2_id,
            room_code: current_quiz.room_code,
            status: "ready",
            id: current_quiz.id
        }
        let response = await startQuiz(payload)
    }
    async getQuizStatus(payload) {
        console.log("frint fighting..", payload)
        let response = await checkQuizStatus(payload)
        console.log(response)
        if (response.success === true) {
            if (response.room.status === "started") {
                localStorage.setItem("current_quiz", JSON.stringify(response.room))
                this.setState({ current_quiz: response.room }, () => {
                    this.props.history.replace(`${baseUrl}/quiz-mania/splash`)
                })
            } else if (response.room.status === "cancelled") {
                //aaTrackPageview("pageview", "Quizmania | Friend Selected | Room Cancelled PopUp", "ACB_Quiz_mania")
                window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "opponent_left_room", "optional": "Opponent has left the room" }, "*");
                this.setState({ active_next: false, room_join_err: true, room_err_msg: "Opponent has left the room." })
            } else {
                localStorage.setItem("current_quiz", JSON.stringify(response.room))
                this.setState({ current_quiz: response.room })
                this.timer = setTimeout(() => { this.getQuizStatus(payload) }, 1000)
            }

        }
    }
    /*handleBack = async () => {
        clearTimeout(this.timer)
        let payload = {
            room_code: this.state.current_quiz.room_code
        }
        let response = await quitQuiz(payload)
        if (response.success == true) {
            // aaTrackACB("quiz_back_btn_clicked", "Quizmania Player2 Waiting clicks", "Header back button", "Quizmania")
            this.props.history.goBack()
        }
    }*/

    close = () => {
        this.setState({
            room_join_err: false,
            room_err_msg: ""
        }, () => {
            this.props.history.goBack()
        })
    }


    render() {
        let { current_quiz, room_err_msg, room_join_err } = this.state;
        if (current_quiz === null) {
            return null;
        }
        let username = localStorage.getItem("username");
        return (<>
            {room_join_err == true ? <ContestJoinError err_msg={room_err_msg} close={this.close} /> : null}
            <div className="p2w__bg2 height-100p drawer">
                <div className="popupqm">
                    <div className="popupBgqm"></div>
                    <div className="drawerCont width-100p pos-abs z-in_2 btm-0">
                        <div className="logo t-center mb-20">
                            <img src={`${baseUrl}/images/logo2.png`} width="101" />
                        </div>
                        <div className="pdlr25 pb-25 width-100p btm-0 ofy-auto">
                            <div className="bgWhite brdr-rad16 pd20">
                                <div className="room_miniDtl pd15 brdr-rad12 d-flex jus-s-between al-i-center mb-20">
                                    <div className="lft ft-12 d-flex al-i-center col-wht">Room Code: <strong className="ft-16">{current_quiz.room_code}</strong></div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="plyrIcns d-flex jus-s-between al-i-center mt-10">
                                    <div className="plyr_bx t-center ft-12">
                                        <div className="plyr_nm">Player 1</div>
                                        <div className="plyr_icn mlr-auto of-hdn mt-10 mb-15">
                                            <img src={`${baseUrl}/images/usericn2.png`} />
                                        </div>
                                        <div className="plyr_sts">
                                            <span className="t-uppercase ftw-600 bg2">{current_quiz.player2_name.substring(0, 20) || ""}</span>
                                        </div>
                                    </div>
                                    <div className="plyr_bx_mid t-center ft-12">
                                        <div className="spinner_sm" />
                                        <span className="vs_bet"> vs</span>
                                    </div>
                                    <div className="plyr_bx t-center ft-12">
                                        <div className="plyr_nm">Player 2</div>
                                        <div className="plyr_icn mlr-auto of-hdn mt-10 mb-15">
                                            <img src={`${baseUrl}/images/usericn1.png`} />
                                        </div>
                                        <div className="plyr_sts">
                                            <span className="t-uppercase ftw-600">{current_quiz.player1_name.substring(0, 20) || ""}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-30 ">
                                <h4 className="user_willstar">{current_quiz.player1_name} will start the game</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }
}


