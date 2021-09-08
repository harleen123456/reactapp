import React from 'react';
import {NavLink} from 'react-router-dom';
// import '../Assets/css/style.css'
// import {startQuiz} from "../Services/Services"
import ReactGA from "react-ga"
import { checkQuizStatus, startQuiz, quitQuiz } from "../../Services/Service"
import { baseUrl, baseURI, aaTrackPageview, aaTrackACB } from '../../Config/Config'

import SocialSharePopup from '../Components/Modal/SocialSharePopup'
import ContestJoinError from '../Components/Modal/ContestJoiningErrorPopup'

export default class ChalangeFriend extends React.Component{
    constructor(props){
        super(props);
        this.timer = null
        this.timer1 = null
        this.state = {
            current_quiz : null,
            active_next : false,
            sharing: false,
            invalid_cd: false,
            // shareUrl : "https://www.airtel.in/5/apbbnkquizmania"
            shareUrl : ""
        }
      this.handleNext = this.handleNext.bind(this)
    }
    async componentDidMount() {
        ReactGA.pageview("Quizmania | Waiting for friend join");
        window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "quizmania_challengefriend_pageview", "optional": "Quizmania | Challenge Friend" }, "*");
        //aaTrackPageview( "pageview", "Quizmania | Challenge Friend", "ACB_Quiz_mania")
        let current_quiz = JSON.parse(localStorage.getItem("current_quiz"))
        //let res = await fetch(`https://liveq.agamesapi.com/apiquiz/get-link`, 
        
        let res = await fetch(`https://api-fundoo.ndtv.com/lgen/get-link`, 
        {
            method : "POST",
            headers : {
                //Accept: 'application/json',
                'Content-Type': 'application/json'

            },
            
            body:JSON.stringify({
                "ttl":2,
                "token_id": localStorage.getItem("token_id"),
                "constructId": localStorage.getItem("constructId"),
                //"screen" : "joinquiz",
                "room_code" : current_quiz.room_code
        })
        }
        ).catch(e=>{console.log(e)})

        
        try {
            //let shareUrl = baseURI + '?screen=joinquiz&room_code=' + current_quiz.room_code + '&constructId=' + localStorage.getItem("constructId") + '&token_id=' + localStorage.getItem("tokenId") + '&secret=' + localStorage.getItem("secret");
            //this.setState({ current_quiz, shareUrl: shareUrl });
            const formattedResponse = await res.json();
            console.log(formattedResponse.data)
            this.setState({current_quiz, shareUrl : formattedResponse.data});            
        }catch(e){
            this.setState({current_quiz});
        }
       
        
        
       
        let payload = {
            "player1_id":current_quiz.player1_id,
            "player2_id":current_quiz.player2_id,
            "room_code":current_quiz.room_code,
            "id": current_quiz.id
            }
        this.timer1 = setTimeout(async () => { 
            let payload = {
                room_code: current_quiz.room_code
            }
            let response = await quitQuiz(payload)
            clearTimeout(this.timer)
            //aaTrackPageview("pageview", "Quizmania | Chalenge friend | Time Out PopUp", "ACB_Quiz_mania")
            window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "quizmania_challengefriend_timeout", "optional": "Quizmania | Chalenge friend | Time Out PopUp" }, "*");
            this.setState({ invalid_cd: true, err_msg: "Time out" })
         }, 900000) 
        this.getQuizStatus(payload)
    }
    async getQuizStatus(payload) {
       
        let response = await checkQuizStatus(payload)
        
        if (response.success === true) {
            if (response.room.status === "ready") {
                 localStorage.setItem("current_quiz", JSON.stringify(response.room))
                 clearTimeout(this.timer1);
                this.setState({active_next : true,current_quiz : response.room})
            }else if (response.room.status === "cancelled") {
                //aaTrackPageview("pageview", "Quizmania | Chalenge friend | Room Cancelled PopUp", "ACB_Quiz_mania")
                window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "quizmania_challengefriend_cancelled", "optional": "Quizmania | Chalenge friend | Room Cancelled PopUp" }, "*");
                this.setState({ invalid_cd: true, err_msg: "Time out" })
            }else {
                this.setState({current_quiz : response.room})
                this.timer = setTimeout(() => { this.getQuizStatus(payload) }, 1000)
        }
           
        }
    }
    sendTrack = (event, eventAction, eventLabel) => {
        aaTrackACB( event,  eventAction, eventLabel, "ACB_Quiz_mania");
    }
    async handleNext(){
        //this.sendTrack("acb_quiz_mania_click", "Quiz Mania Clicks", "Play");        
        let { active_next, current_quiz } = this.state;
        //console.log('Curr Quiz');
        //console.log(current_quiz);
        //console.log(current_quiz.player1_id);
        if(active_next){
            let payload = {
                room_code:this.state.current_quiz.room_code
            }
            //console.log(payload);
            let response = await checkQuizStatus(payload)
            if(response.success == true){
                if (response.room.status === "ready") {
                if(active_next){
                    //aaTrackACB( "quiz_play_btn_clicked",  "Quizmania Player1 Waiting clicks", "Play", "ACB_Quiz_mania")
                    window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "quizmania_play", "optional": "Quiz Mania Play" }, "*");
                    let payload = {
                            player1_id: current_quiz.player1_id,
                            player2_id: current_quiz.player2_id,
                            room_code:current_quiz.room_code,
                            status : "started"
                    }
                    //console.log(payload);
                    let response = await startQuiz(payload)
                    //console.log(response);
                    if(response.success === true){
                        this.props.history.replace(`${baseUrl}/quiz-mania/splash`)
                    }
                }
            }else{
                this.setState({ invalid_cd: true, err_msg: "Opponent has left the room" })
            }
            }
        }
    }
    handleShare = (socialChannel)=>{
        let os;

        let userAgent = navigator.userAgent.toLowerCase();

        if (/android/i.test(navigator.userAgent.toLowerCase())) {
            os = "ANDROID";
        }

        if (/ipad|iphone|ipod/.test(userAgent)) {
            os = "IOS";
        }
        const URL = {
            ANDROID: "myairtel://webview?au=",
            IOS: "myairtel://webview?ax=",
        };
        let current_quiz = JSON.parse(localStorage.getItem("current_quiz"));
        //this.sendTrack("acb_quiz_mania_share", "Quiz Mania Clicks", "Share | "+socialChannel);
        window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "quizmania_shared", "optional": "Share | " + socialChannel, "roomcode": current_quiz.room_code, "ttl": 2 }, "*");
        let subject = "Play Quiz Mania";
        let text = `Hey! Here's my room code ${this.state.current_quiz.room_code}. Let's play the Airtel cricket quiz mania and see who knows their team best! Lots of exciting prizes to be won! Join here`
        let {shareUrl} = this.state;
        //let link = `https://www.airtel.in/5/apbbnkquizmania`
        let link = `myairtel://share_social?type=${this.urlencode(socialChannel)}&subject=${this.urlencode(subject)}&message=${this.urlencode(text)}&link=${this.urlencode(shareUrl)}`;
        this.setState({sharing: false},()=>{
            window.open(link)
        })
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
    shareRoomCode = async()=>{
        /*if(this.state.sharing){
            aaTrackPageview( "pageview", "Quizmania | Challenge Friend | Share PopUp", "ACB_Quiz_mania")
        }
        this.sendTrack("acb_quiz_mania_load_popup_click", "Quiz Mania Clicks",this.state.sharing? "Pop Up | Close":"Share");*/
       this.setState({sharing: !this.state.sharing})
    }
    /*handleBack = async() => {
        clearTimeout(this.timer)
        let payload = {
            room_code: this.state.current_quiz.room_code
        }
        
        let response = await quitQuiz(payload)
        if(response.success == true){
            //aaTrackACB( "acb_quiz_mania_load_popup_click",  "Quizmania Player1 Waiting clicks", "Header back button", "Quizmania")
            window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "quizmania_player_back", "optional": "Quizmania Player1 Clicks Back" }, "*");
            this.props.history.goBack()
        } 
        
    }*/
    close = ()=>{
        //this.sendTrack("acb_quiz_mania_load_popup_click", "Quiz Mania Clicks", "Pop Up | Ok");
        window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "quizmania_game_closed", "optional": "Quizmania Closed" }, "*");
        this.setState({invalid_cd: false},()=>{
            clearTimeout( this.timer)
            this.props.history.goBack()
        })
    }
    render(){
        let {current_quiz, active_next, sharing, err_msg, invalid_cd} = this.state;
        if( current_quiz === null) {
            return null;
        }
       let username = localStorage.getItem("username");
        return(<>
        {invalid_cd == true  ? <ContestJoinError err_msg={err_msg} close={this.close} /> : null}
{sharing == true?<SocialSharePopup handleShare={this.handleShare} close={this.shareRoomCode}/>: null}
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
                                    <div className="ryt"><a href="#" className="bgWhite t-uppercase ftw-600 ft-12 brdr-rad8 pdtb6 pdlr15" onClick={this.shareRoomCode}>Share</a></div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="plyrIcns d-flex jus-s-between al-i-center mt-10">
                                    <div className="plyr_bx t-center ft-12">
                                        <div className="plyr_nm">Player 1</div>
                                        <div className="plyr_icn mlr-auto of-hdn mt-10 mb-15">
                                            <img src={`${baseUrl}/images/usericn2.png`} />
                                        </div>
                                        <div className="plyr_sts">
                                            <span className="t-uppercase ftw-600 bg2">{username.substring(0, 20) || ""}</span>
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
                                            <span className="t-uppercase ftw-600">{current_quiz.player2_name.substring(0, 20) || "Waiting..."}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-30 ">
                                <button className={active_next ? "btn_red_lg mb10" : "btn_gray mb10"} onClick={this.handleNext}>Play
							<img src={`${baseUrl}/images/svg/right-arrow-white.svg`} className="next_wht_arr" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }
}


