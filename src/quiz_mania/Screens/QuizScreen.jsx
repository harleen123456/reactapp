import React, { useEffect, useState } from 'react';
// import '../Assets/css/style.css';
import WinningPopup from '../Components/Modal/WinningPopup';
import WaitingPopup from '../Components/Modal/WaitingPopup';
import QuestionRequestError from '../Components/Modal/QuestionRequestErrorPopup'
import { Redirect } from 'react-router-dom';
import { baseUrl, aaTrackPageview, aaTrackACB, aaTrackACBWithPoints } from '../../Config/Config'
import ReactGA from "react-ga"
// import { getTieNextQstn } from "../Services/Services"
import { getNextQuestion, getQuizPoints, gameUpdate, getTieNextQstn, getTiePoints, checkQuizStatus, quitQuiz, selfQuizTimeout } from "../../Services/Service"
const TIME_PER_QUESTION = 15;

let no_of_req = 1;
let qstn_req_sent = false
let scnd_qstn_res = null;
export default class QuizScreen extends React.Component {
    constructor(props) {
        super(props)
        this.timer = null;
        this.state = {
            visiable: false,
            questionList: [],
            player: {
                player_1: { name: "Vimal", score: 0 },
                player_2: { name: "Rajesh", score: 0 }
            },
            currentQuestionCount: 1,
            currentQuestion: null,
            currentAnswer: '',
            curr_player_points: 0,
            other_player_points: 0, current_user: null, current_quiz: null,
            waitingPopup: false,
            visiable: false,
            quest_id: "",
            winner_decided: false,
            current_player: "",
            question_req_err: false,
            question_req_err_msg: "",
            qstn_req_sent: false
            //status:"lost"

        }
        this.checkFirst = 1;
        this.currentPoints = 0;
        this.correctAnswer = -1;
        this.correctanswercount = 0;
        this.loadQuestion = this.loadQuestion.bind(this);
        this.loadTbQuestions = this.loadTbQuestions.bind(this);
        this.setCurrentAnswer = this.setCurrentAnswer.bind(this);
        this.handalPopup = this.handalPopup.bind(this);
        this.getPoints = this.getPoints.bind(this);
        this.getTbPoints = this.getTbPoints.bind(this);
        this.handleTie = this.handleTie.bind(this);
    }
    async componentDidMount() {
        document.title = "Quizmania"
        ReactGA.pageview("Quizmania | Quiz Load");
        let username = localStorage.getItem("username")
        let token_id = localStorage.getItem("token_id")
        let user_id = localStorage.getItem("user_id")
        //aaTrackPageview("pageview", "Quizmania", "ACB_Quiz_mania_quizload")
        window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "quiz_loaded", "optional": "Quiz Loaded" }, "*");
        let current_quiz = JSON.parse(localStorage.getItem("current_quiz"))
        let current_user = localStorage.getItem("username")
        let sr_gameInsID = localStorage.getItem("sr_gameInsID")
        let sr_game_id = localStorage.getItem("sr_game_id")
        let current_player = localStorage.getItem("current_player")
        let pay = {
            room_code: current_quiz.room_code
        }
        let res = await checkQuizStatus(pay)
        //console.log("room status", res)
        if (res.success == true) {
            if (res.room.status != "tie" && res.room.status != "started") {
                // clearTimeout(this.timer)
                this.props.history.push(`${baseUrl}/quiz-mania/team-selection`)
                return;
            }
        }
        this.setState({ current_quiz, current_user, sr_gameInsID, sr_game_id, current_player }, async () => {
            let payload = { "gameID": sr_game_id, "gameInsID": sr_gameInsID, "gameEvent": "quiz_game_start" }
            window.addEventListener("beforeunload", (ev) => {
                ev.preventDefault();
                this.fireEvent(payload)
                // return ev.returnValue = 'Are you sure you want to close?';
            });
            await gameUpdate(payload)
            this.loadQuestion(0);
        })



    }

    // fireEvent = async (payload) => {
    //     if (this.state.winner_decided == false) {
    //         await gameUpdate(payload)
    //     }
    // }
    fireEvent = async () => {
        clearTimeout(this.timer)
        let payload = {
            room_code: this.state.current_quiz.room_code
        }
        let response = await selfQuizTimeout(payload)
        // if (response.success == true) {
        //     let user_id = localStorage.getItem("user_id")
        //     let token_id = localStorage.getItem("tokes_id")
        //     aaTrackACB(user_id, "quiz_back_btn_clicked", token_id, "Quizmania Player2 Waiting clicks", "Header back button", "Quizmania")
        //     this.props.history.goBack()
        // }
    }

    componentWillUnmount() {
        if (this.state.winner_decided == false) {
            let payload = { "gameID": this.state.sr_game_id, "gameInsID": this.state.sr_gameInsID, "gameEvent": "quiz_game_start" }
            gameUpdate(payload)
        }
    }
    handalPopup() {
        setTimeout(() => {
            if (this.state.status == "tie") {
                this.setState({
                    visiable: false, waitingPopup: false, currentAnswer: 0, currentQuestionCount: 1
                }, () => this.loadTbQuestions(0))
            }
        }, 5000)

    }
    handleErrPopup = () => {
        this.sendTrack("acb_quiz_mania_load_popup_click", "Quiz Mania Clicks", "Pop Up | Ok")
        if (this.state.status == 'tie') {
            this.setState({
                question_req_err: false,
                question_req_err_msg: ''
            })
        } else if (this.state.status == 'cancelled') {
            this.setState({
                question_req_err: false,
                question_req_err_msg: ''
            }, () => {
                this.props.history.push(`${baseUrl}/quiz-mania/team-selection`)
            })
        } else {
            this.setState({
                question_req_err: false
            }, () => this.props.history.push(`${baseUrl}/quiz-mania/team-selection`))
        }

    }
    handlePlayMore = () => {
        //this.sendTrack("acb_quiz_mania_load_popup_click", "Quiz Mania Clicks", "Pop Up | Play more games")
        window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "play_again", "optional": "0" }, "*");
        //this.setState({ visiable: false, waitingPopup: false }, () => this.props.history.push(`${baseUrl}/`))
    }
    handleTryAgain = () => {
        //this.sendTrack("acb_quiz_mania_load_popup_click", "Quiz Mania Clicks", "Pop Up | Try again")
        //this.setState({ visiable: false, waitingPopup: false }, () => this.props.history.push(`${baseUrl}/quiz-mania/team-selection`))
        //this.setState({ visiable: false, waitingPopup: false }, () => window.history.go(-(window.history.length - 2)));
        //this.setState({ visiable: false, waitingPopup: false }, () => window.history.go(-1));
        console.log("PLAY AGAIN : LOST");
        //window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "play_again", "optional": "0" }, "*");
        this.setState({ visiable: false, waitingPopup: false }, () => this.props.history.push(`${baseUrl}/quiz-mania/team-selection`));
    }
    handleWinpopup = () => {
        //this.sendTrack("acb_quiz_mania_load_you_win", "Quiz Mania Load Clicks", "Pop Up | Check your prize")
        //this.setState({ visiable: false, waitingPopup: false }, () => this.props.history.push(`${baseUrl}/quiz-mania/team-selection`));
        //this.setState({ visiable: false, waitingPopup: false }, () => window.history.go(-1));
        console.log("PLAY AGAIN : WON");
        //window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "play_again", "optional": "1" }, "*");
        this.setState({ visiable: false, waitingPopup: false }, () => this.props.history.push(`${baseUrl}/quiz-mania/team-selection`));
    }
    async loadQuestion(timeout = TIME_PER_QUESTION * 1000) {
        let { currentQuestionCount, current_quiz, current_user, currentAnswer, currentQuestion } = this.state
        if (this.state.currentQuestionCount > 4) {
            ReactGA.pageview("Quizmania | Question " + this.state.currentQuestionCount);
        }
        this.timer = setTimeout(async () => {
            let payload = {
                "room_code": parseInt(current_quiz.room_code),
                "req_nxt_ques": this.state.currentQuestionCount,
                "res_curr_ques": this.state.currentAnswer, //0 for 1st question optionselected for 2nd onward
                "ques_id": currentQuestion == null ? 0 : currentQuestion.id
            }
            //console.log("Normal question paylaod", payload)
            //A-this.sendTrack("acb_quiz_mania_load_submit", "Quiz Mania Load Clicks", "Answer Submit | " + this.state.currentAnswer)

            let response = await getNextQuestion(payload);
            if (response.success === true) {
                if (this.checkFirst == 0) {
                    if (response.room.curr_player_points > this.currentPoints) {
                        this.correctAnswer = 1;
                        this.correctanswercount = this.correctanswercount + 1;
                        this.currentPoints = response.room.curr_player_points;
                        this.pushCorrectAnswer();
                    } else {
                        this.correctAnswer = 0;
                        this.pushCorrectAnswer();
                    }
                } else {
                    this.checkFirst = 0;
                }
                qstn_req_sent = false;
                response = response.room
                if (response.game_ended == false) {
                    let currentQuestion = response.question
                    this.setState({ curr_player_points: response.curr_player_points, other_player_points: response.other_player_points, currentQuestionCount: (this.state.currentQuestionCount + 1), currentQuestion, currentAnswer: "" }, this.loadQuestion)
                } else {
                    //A-aaTrackPageview("pageview", "Quizmania | Waiting PopUp", "ACB_Quiz_mania_quizload")
                    this.setState({ waitingPopup: true }, () => {
                        this.getPoints();
                    })
                }
            } else {
                this.setState({ waitingPopup: true }, () => {
                    this.getPoints();
                })
            }
        }, timeout)
    }

    pushCorrectAnswer() {
        if (this.correctAnswer == 1) {
            console.log('RIGHT');
            console.log({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "answerresult", "optional": "RIGHT" });
            window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "answerresult", "optional": "RIGHT" }, "*");
        }
        if (this.correctAnswer == 0) {
            console.log('WRONG');
            console.log({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "answerresult", "optional": "WRONG" });
            window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "answerresult", "optional": "WRONG" }, "*");
        }
    }

    async loadTbQuestions(timeout = TIME_PER_QUESTION * 1000) {
        let { current_quiz, current_player, currentQuestion, curr_player_points, other_player_points } = this.state
        // if (this.state.currentAnswer === ""){
        //     return;
        // }
        this.timer = setTimeout(async () => {
            if (this.state.currentAnswer === "" && this.state.currentQuestionCount > 1) {
                // console.log(this.state.currentAnswer, this.state.currentQuestionCount)
                aaTrackPageview("pageview", "Quizmania | Room Cancelled PopUp", "ACB_Quiz_mania_quizload")
                this.setState({
                    winner_decided: true,
                    question_req_err: true,
                    waitingPopup: false,
                    status: "cancelled",
                    question_req_err_msg: current_player == current_quiz.guest_id ? `You have timed out` : `You have timed out`
                }, () => { let str = 'na'; })
                return;
            }
            ReactGA.pageview("Quizmania | Tie Question Load");
            let payload = {
                "room_code": parseInt(current_quiz.room_code),
                "req_nxt_ques": this.state.currentQuestionCount,
                "res_curr_ques": this.state.currentAnswer, //0 for 1st question optionselected for 2nd onward
                "ques_id": currentQuestion == null ? 0 : currentQuestion.id
            }
            //A-this.sendTrack("acb_quiz_mania_load_submit", "Quiz Mania Load Clicks", "Answer Submit Tiebreaker | " + this.state.currentAnswer)
            //console.log("TB qstn payload", payload)
            let response = await getTieNextQstn(payload);
            //console.log("TB qstn response", response)
            if (response.success === true) {
                response = response.room
                if (this.state.currentQuestionCount >= 2) {
                    // no_of_req = no_of_req + 1
                    scnd_qstn_res = response;
                    this.getTbPoints(0);
                    return;
                }
                if ((response.game_ended == true)) {
                    let currentQuestion = response.question
                    this.setState({ curr_player_points: curr_player_points, other_player_points: other_player_points, currentQuestionCount: (this.state.currentQuestionCount + 1), currentQuestion, currentAnswer: "" }, () => this.getTbPoints(0))
                } else {
                    let currentQuestion = response.question
                    this.setState({ curr_player_points: curr_player_points, other_player_points: other_player_points, currentQuestionCount: (this.state.currentQuestionCount + 1), currentQuestion, currentAnswer: "" }, this.loadTbQuestions)
                }
            }
        }, timeout)

    }

    getPoints() {
        let { current_quiz, current_player } = this.state
        setTimeout(async () => {
            let username = localStorage.getItem("username")
            let payload = {
                room_code: current_quiz.room_code,
            }
            //console.log("get points payload", payload)
            let response = await getQuizPoints(payload);
            console.log("get poins", response)
            if (response.success == true) {
                if (response.room.player1_timeout == true) {
                    //aaTrackPageview("pageview", "Quizmania | Time Out PopUp", "ACB_Quiz_mania_quizload")
                    window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "player1_leaves", "optional": "Player1 has left the game" }, "*");
                    this.setState({
                        winner_decided: true,
                        question_req_err: true,
                        waitingPopup: false,
                        question_req_err_msg: current_player == current_quiz.creater_id ? "Game is completed. Timeout" : `${current_quiz.player1_name.substring(0, 20)} has left the game.`
                    })
                    return;
                }
                if (response.room.player2_timeout == true) {
                    //aaTrackPageview("pageview", "Quizmania | Time Out PopUp", "ACB_Quiz_mania_quizload")
                    window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "player2_leaves", "optional": "Player2 has left the game" }, "*");
                    this.setState({
                        winner_decided: true,
                        question_req_err: true,
                        waitingPopup: false,
                        question_req_err_msg: current_player == current_quiz.guest_id ? "Game is completed. Timeout" : `${current_quiz.player2_name.substring(0, 20)} has left the game.`
                    })
                    return;
                }
                if (response.room.status == "tie") {
                    ReactGA.pageview("Quizmania | Quiz Tied ");
                    //aaTrackPageview("pageview", "Quizmania | Tie PopUp", "ACB_Quiz_mania_quizload")
                    window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "match_tie", "optional": "Match Tie" }, "*");
                    this.setState({
                        waitingPopup: false, visiable: true, status: "tie", curr_player_points: response.room.curr_player_points, other_player_points: response.room.other_player_points,
                    }, this.handalPopup)
                    return;
                } else if (response.room.status == "cancelled") {
                    //aaTrackPageview("pageview", "Quizmania | Room Cancelled PopUp", "ACB_Quiz_mania_quizload")
                    window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "match_cancelled", "optional": "No winner in this contest" }, "*");
                    this.setState({
                        winner_decided: true, waitingPopup: false, visiable: false, status: "cancelled", question_req_err: true, question_req_err_msg: "No winner in this contest",
                    })
                    return;
                }

                var winnercorrectanswers = 0;
                var loosercorrectanswers = 0;

                if (this.state.current_player == response.room.winner_id) {
                    var actualtotalwinnerpoints = this.correctanswercount * 10;
                    var dbtotalwinnerpoints = response.room.curr_player_points;
                    var diffpoints = dbtotalwinnerpoints - actualtotalwinnerpoints;
                    var loosecorrectanswercount = diffpoints / 10;
                    console.log('WINNER TOTAL POINTS WITH ADDED LOOSER POINTS : ' + dbtotalwinnerpoints);
                    console.log('WINNER RIGHT ANSWERS : ' + this.correctanswercount);
                    console.log('LOOSER RIGHT ANSWERS : ' + loosecorrectanswercount);
                    //aaTrackPageview("pageview", "Quizmania | Win PopUp", "ACB_Quiz_mania_quizload")
                     //aaTrackACBWithPoints("acb_quiz_mania_load_click", "Quiz Mania Load Clicks", "Win Pop Up", "ACB_Quiz_mania_quizload", response.room.curr_player_points)
                    window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "win_pageview", "optional": "Win Page View" }, "*");                   
                    //window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "winner_points", "win_point": response.room.curr_player_points, "loss_point": response.room.other_player_points, "winner_correct_answers": winnercorrectanswers, "looser_correct_answers": loosercorrectanswers }, "*");
                    window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "winner_points", "winner_correct_answers": this.correctanswercount, "looser_correct_answers": loosecorrectanswercount }, "*");
                    this.setState({ winner_decided: true, waitingPopup: false, visiable: true, status: "won", curr_player_points: response.room.curr_player_points, other_player_points: response.room.other_player_points, })
                } else {
                    var winnertotalpoint = response.room.other_player_points;
                    var actualtotallooserpoints = this.correctanswercount * 10;
                    var winnertotalcorrectanswers = winnertotalpoint - actualtotallooserpoints;
                    var winnertotalcorrectanswercount = winnertotalcorrectanswers / 10;
                    console.log(response.room.other_player_points);
                    loosercorrectanswers = response.room.curr_player_points / 10;
                    console.log('WINNER RIGHT ANSWERS : ' + winnertotalcorrectanswercount);
                    console.log('LOOSER RIGHT ANSWERS : ' + this.correctanswercount);
                    //aaTrackACBWithPoints("acb_quiz_mania_load_click", "Quiz Mania Load Clicks", "Lose Pop Up", "ACB_Quiz_mania_quizload", response.room.curr_player_points)
                    //aaTrackPageview("pageview", "Quizmania | Lose PopUp", "ACB_Quiz_mania_quizload")
                    //window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "looser_points", "win_point": response.room.other_player_points, "loss_point": response.room.curr_player_points, "winner_correct_answers": winnercorrectanswers, "looser_correct_answers": loosercorrectanswers }, "*");
                    window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "looser_points", "winner_correct_answers": winnertotalcorrectanswercount, "looser_correct_answers": this.correctanswercount }, "*");
                    window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "lose_pageview", "optional": "Lose Page View" }, "*");
                    this.setState({
                        winner_decided: true, waitingPopup: false, visiable: true, status: "lost", curr_player_points: response.room.curr_player_points, other_player_points: response.room.other_player_points,
                    })
                }

            } else {
                this.getPoints();
            }


        }, 1000)
    }

    getTbPoints(timeout = 1000) {
        let { current_quiz, current_player } = this.state
        setTimeout(async () => {
            let username = localStorage.getItem("username")
            let payload = {
                room_code: current_quiz.room_code,
            }
            // console.log("get TB points payload", payload)
            let response = await getTiePoints(payload);
            // console.log("get TB  response poins", response)
            if (response.success == true) {
                if (response.room.player1_timeout == true) {
                    //aaTrackPageview("pageview", "Quizmania | Time Out PopUp", "ACB_Quiz_mania_quizload")
                    window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "player1_leaves", "optional": "Player1 has left the game" }, "*");
                    this.setState({
                        winner_decided: true,
                        question_req_err: true,
                        waitingPopup: false,
                        question_req_err_msg: current_player == current_quiz.creater_id ? "Game is completed. Timeout" : `${current_quiz.player1_name} has left the game.`
                    })
                    return;
                }
                if (response.room.player2_timeout == true) {
                    //aaTrackPageview("pageview", "Quizmania | Time Out PopUp", "ACB_Quiz_mania_quizload")
                    window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "player2_leaves", "optional": "Player2 has left the game" }, "*");
                    this.setState({
                        winner_decided: true,
                        question_req_err: true,
                        waitingPopup: false,
                        question_req_err_msg: current_player == current_quiz.guest_id ? "Game is completed. Timeout" : `${current_quiz.player2_name} has left the game.`
                    })
                    return;
                }
                if (response.room.status == "tie") {
                    ReactGA.pageview("Quizmania | Quiz Tied ");
                    window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "match_tie", "optional": "Match Tie" }, "*");
                    if (this.state.currentQuestionCount >= 2) {
                        qstn_req_sent = false;
                        let currentQuestion = scnd_qstn_res !== null ? scnd_qstn_res.question : this.state.currentQuestion;
                        this.setState({ waitingPopup: false, visiable: false, currentQuestionCount: (this.state.currentQuestionCount + 1), currentQuestion, currentAnswer: "" }, () => this.loadTbQuestions())
                        return;
                    }
                    this.setState({
                        waitingPopup: false, visiable: false, status: "tie",
                    }, () => this.loadTbQuestions())
                    return;
                } else if (response.room.status == "completed") {

                    var winnercorrectanswers = 0;
                    var loosercorrectanswers = 0;
                    if (this.state.current_player == response.room.winner_id) {
                        var actualtotalwinnerpoints = this.correctanswercount * 10;
                        var dbtotalwinnerpoints = response.room.curr_player_points;
                        var diffpoints = dbtotalwinnerpoints - actualtotalwinnerpoints;
                        var loosecorrectanswercount = diffpoints / 10;
                        console.log('WINNER TOTAL POINTS WITH ADDED LOOSER POINTS : ' + dbtotalwinnerpoints);
                        console.log('WINNER RIGHT ANSWERS : ' + this.correctanswercount);
                        console.log('LOOSER RIGHT ANSWERS : ' + loosecorrectanswercount);
                        //aaTrackPageview("pageview", "Quizmania | Win PopUp", "ACB_Quiz_mania_quizload")
                        window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "win_pageview", "optional": "Win Page View" }, "*");
                        window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "winner_points", "winner_correct_answers": this.correctanswercount, "looser_correct_answers": loosecorrectanswercount }, "*");
                        this.setState({ winner_decided: true, waitingPopup: false, visiable: true, status: "won", curr_player_points: response.room.curr_player_points, other_player_points: response.room.other_player_points, })
                    } else {
                        var winnertotalpoint = response.room.other_player_points;
                        var actualtotallooserpoints = this.correctanswercount * 10;
                        var winnertotalcorrectanswers = winnertotalpoint - actualtotallooserpoints;
                        var winnertotalcorrectanswercount = winnertotalcorrectanswers / 10;
                        console.log(response.room.other_player_points);
                        loosercorrectanswers = response.room.curr_player_points / 10;
                        console.log('WINNER RIGHT ANSWERS : ' + winnertotalcorrectanswercount);
                        console.log('LOOSER RIGHT ANSWERS : ' + this.correctanswercount);
                        //aaTrackPageview("pageview", "Quizmania | Lose PopUp", "ACB_Quiz_mania_quizload")
                        //window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "looser_points", "win_point": response.room.other_player_points, "loss_point": response.room.curr_player_points }, "*");
                        window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "looser_points", "winner_correct_answers": winnertotalcorrectanswercount, "looser_correct_answers": this.correctanswercount }, "*");
                        window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "lose_pageview", "optional": "Lose Page View" }, "*");
                        this.setState({
                            winner_decided: true, waitingPopup: false, visiable: true, status: "lost", curr_player_points: response.room.curr_player_points, other_player_points: response.room.other_player_points,
                        })
                    }
                    return;
                } else if (response.room.status == "cancelled") {
                    //aaTrackPageview("pageview", "Quizmania | Room Cancelled PopUp", "ACB_Quiz_mania_quizload")
                    window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "no_winner", "optional": "No winner in this contest" }, "*");
                    this.setState({
                        winner_decided: true, waitingPopup: false, visiable: false, status: "cancelled", question_req_err: true, question_req_err_msg: "No winner in this contest",
                    })
                }


            } else if (response.message == "quiz_incomplete") {
                aaTrackPageview("pageview", "Quizmania | Waiting PopUp", "ACB_Quiz_mania_quizload")
                this.setState({
                    waitingPopup: true
                }, () => this.getTbPoints())
                return;
            } else {
                this.getTbPoints();
            }


        }, timeout)
    }

    async handleTie(timeout = TIME_PER_QUESTION * 1000) {
        let username = localStorage.getItem("username")
        let selected_team = await localStorage.getItem("selected_team")
        let { current_quiz, current_user } = this.state

        setTimeout(async () => {
            this.setState({ visiable: false })
            let payload = {
                "player_id": username,
                "team_code": JSON.parse(selected_team),
                "room_code": current_quiz.room_code,
                "req_nxt_ques": this.state.currentQuestionCount,
                "res_curr_ques": this.state.currentAnswer
            }
            let response = await getTieNextQstn(payload);

            if (response.success === true) {
                if (response.tb_ended == false) {
                    let currentQuestion = response.question
                    this.setState({ visiable: false, currentQuestionCount: (this.state.currentQuestionCount + 1), currentQuestion, currentAnswer: "" }, this.handleTie)
                } else {
                    if (username == response.winner) {
                        window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "win_pageview", "optional": "Win Page View" }, "*");
                        //aaTrackPageview("pageview", "Quizmania | Win PopUp", "ACB_Quiz_mania_quizload")
                        this.setState({ waitingPopup: false, visiable: true, status: "won" })
                    } else {
                        //aaTrackPageview("pageview", "Quizmania | Lose PopUp", "ACB_Quiz_mania_quizload")
                        window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "lose_pageview", "optional": "Lose Page View" }, "*");
                        this.setState({
                            waitingPopup: false, visiable: true, status: "lost"
                        })
                    }
                }
            } else {
                this.handleTie()
            }
        }, timeout)
    }

    /*handleBack = () => {
        window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "back", "optional": "0" }, "*");
    }*/

    handleNext = () => {       
        if (qstn_req_sent == true) {
            return;
        }
        //aaTrackACB("acb_quiz_mania_load_click", "Quiz Mania Load Clicks", "Next", "ACB_Quiz_mania_quizload")
        qstn_req_sent = true;
        if (this.state.status == "tie") {
            if (this.state.currentAnswer == '') {
                //aaTrackPageview("pageview", "Quizmania | Tie No Option Selected PopUp", "ACB_Quiz_mania_quizload")
                this.setState({
                    question_req_err: true,
                    waitingPopup: false,
                    question_req_err_msg: "Please select an option"
                })
                qstn_req_sent = false;
                return;
            }
            this.setState({
                waitingPopup: true
            }, () => {
                clearTimeout(this.timer)
                this.loadTbQuestions(0);
            })

        } else {
            clearTimeout(this.timer)
            this.loadQuestion(0);
        }

    }


    setCurrentAnswer(index) {
        let { currentAnswer } = this.state
        // if (currentAnswer === "") {
        this.setState({ currentAnswer: index })
        // }

    }
    sendTrack = (event, eventAction, eventLabel) => {
        aaTrackACB(event, eventAction, eventLabel, "ACB_Quiz_mania_quizload");
    }
    render() {
        //console.log('Curr User--' + current_user);
        //console.log('Curr Quiz--' + current_quiz);
        let { question_req_err, question_req_err_msg, winner_decided, current_player, status, currentQuestion, currentQuestionCount, currentAnswer, curr_player_points, other_player_points, current_user, current_quiz } = this.state
        if (current_user == null || current_quiz == null) {
            return null;
        }
        
        let currentUser = current_player === current_quiz.creater_id ? current_quiz.player1_name : current_quiz.player2_name
        let oppnentUser = current_player !== current_quiz.creater_id ? current_quiz.player1_name : current_quiz.player2_name
        if (currentQuestion !== null) {
            currentQuestion.options.sort(function (a, b) { return a.option_no - b.option_no });
        }

        return (
            <>
                {/* <WaitingPopup/> */}
                {question_req_err == true ? <QuestionRequestError close={this.handleErrPopup} err_msg={question_req_err_msg} /> : ""}
                {this.state.waitingPopup == true ? <WaitingPopup closePopup={this.handalPopup} /> : ''}
                {this.state.visiable == true ? <WinningPopup closePopup={this.handalPopup} status={status} handleWinpopup={this.handleWinpopup} handlePlayMore={this.handlePlayMore} handleTie={this.handleTie} handleTryAgain={this.handleTryAgain} /> : ''}
                <div className="p2w__bg2  qz_qs">

                    <div class="pd20 z-in_2 pos-rel pb-0">
                        <div class="logo t-center mb-20">
                            <img src={`${baseUrl}/images/logo2.png`} />
                        </div>


                        <div class="z-in_2 pos-rel">
                            <div class="t-center">

                                <div className="select_team_container  btn_foot" key={"question" + (currentQuestion === null ? 0 : currentQuestion.id)}>
                                        <section className="pos_rel containerMargin">
                                            <div className="quiz_row_player_score">
                                                <div className="your_score_wrp flex_one_l">
                                                    <h4 className="your_sc_t2 mr5">{curr_player_points}</h4>
                                                    <h4 className="your_sc_t1">{currentUser.substring(0, 20)}</h4>
                                                </div>

                                                <div className="Timeleft_wrp ">

                                                    <div className="time_left_cir pos_rel">
                                                        <div className="spinner" />
                                                        <Timer currentQuestionCount={currentQuestionCount} counter={true} /></div>
                                                </div>
                                                <div className="your_score_wrp flex_one_r">
                                                    <h4 className="your_sc_t1">{oppnentUser.substring(0, 20)}</h4>
                                                    <h4 className="your_sc_t2 ml5">{other_player_points}</h4>
                                                </div>
                                            </div>
                                            <div className="quiz_box_wrp ">
                                                {winner_decided == true ? null : <div className="quiz_info_wrp" slidefromleft>
                                                    {this.state.status == "tie" ? <h4 className="quiz_info">Tiebreaker</h4> : <h4 className="quiz_info">(Question {currentQuestionCount - 1} of 3)</h4>}
                                                </div>}
                                                {(winner_decided == false && currentQuestion !== null) ?
                                                    <>
                                                        <h6 className="quest_txt">{currentQuestion.ques}</h6>
                                                        <div className="input-group radio-boxes slidefromleft">
                                                            <div className="form-group">
                                                                {currentQuestion.options.map((item, i) => {
                                                                    return (
                                                                        <label htmlFor={`options${i}`} key={i} className="radbox" onClick={() => { this.setCurrentAnswer(item.option_no) }}>
                                                                            <input type="radio" id={`options${i}`} name="payment_mode" checked={item.option_no === currentAnswer ? true : false} className="radio_input" readOnly />
                                                                            <span className='rad-text'><span className="txt_nm">{i + 1}.</span>{item.option}</span>
                                                                        </label>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div></>
                                                    : null}
                                        </div>
                                        <button className="btn_red_lg mb10" onClick={() => this.handleNext()}>
                                            Next
                                          <img src={`${baseUrl}/images/svg/right-arrow-white.svg`} className="next_wht_arr" />
                                        </button>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const Timer = ({ currentQuestionCount, counter }) => {
    const [timer, setTimer] = useState({ question: 0, timer: 0 })
    var timeout = null;
    useEffect(() => {

        if (currentQuestionCount !== timer.question && counter) {
            clearTimeout(timeout);
            setTimer({ question: currentQuestionCount, timer: TIME_PER_QUESTION })
        } else {
            if (timer.timer > 0) {
                timeout = setTimeout(() => {
                    setTimer({ question: currentQuestionCount, timer: (timer.timer - 1) });
                }, 1000)
            }
        }


    }, [currentQuestionCount, timer])

    return <h4>{(timer.timer.toString().length == 1) ? "0" + timer.timer : timer.timer}</h4>
}