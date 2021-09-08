import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import $ from 'jquery';
import { aaTrackPageview, baseUrl, aaTrackACB } from '../Config/Config'
import ReactGA from "react-ga"
export default class HowPlay extends Component {

    constructor() {
        super();
        this.state = {
            points: localStorage.getItem("points"),
            username: localStorage.getItem("username")

        }
    }

    componentDidMount() {
        document.title = "How To Play"
        ReactGA.pageview("How To Play");
        let token_id = localStorage.getItem("token_id")
        let user_id = localStorage.getItem("user_id")
        aaTrackPageview("pageview", "HOW TO PLAY", "How To Play")
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }

    redirectTo = (btn) => {
        aaTrackACB(`acb_how_to_play_click`, "How to play clicks", btn, "How To Play")
        this.props.history.push(`${baseUrl}/`)
    }

    render() {
        return (
            <>

                <Header
                    points={this.state.points}
                    username={this.state.username}
                />

                <section className="hwtplay mt-20 t-center">
                    <h1 className="ft-21 ftw-600 t-center mb-20">How to Play</h1>
                    <span className="ttlTag pos-rel pd10 d-inlnblk ft-12 t-uppercase col-wht" onClick={() => this.redirectTo("spin and win")}><img src="images/spin-icon.svg" />Spin and Win</span>

                    <ul className="t-left pd25 pb-0 clearfix">
                        <li>Spin the wheel & win exciting coupons</li>
                        {/* <li>Also get a chance to win a mobile phone every week</li> */}
                    </ul>
                    <hr className="mtb-20" />
                    <span className="ttlTag mt-10 pos-rel pd10 d-inlnblk ft-12 t-uppercase col-wht" onClick={() => this.redirectTo("predict and win")}><img src="images/predict-icon.svg" />Predict and Win</span>
                    <ul className="t-left pd25 pb-0">
                        <li>Answer 3 questions related to the match.</li>
                        <li>Earn 50 points for each correct answer.</li>
                        <li>You can earn bonus 50 points if all the three answers are correct.</li>
                        <li>These points will be added to your overall points pool.</li>
                        <li>Win assured brand coupons by participating in Predict and Win </li>
                        <li>You also get a chance to win a Samsung M31 with every match & a Royal Enfield Classic 350.</li>
                        <li>Predict to Win will be live till the mid innings of every match.</li>
                        <li>Winners of the contest will be announced at 10 AM the next day.</li>


                    </ul>


                    <hr className="mtb-20" />
                    <span className="ttlTag mt-10 pos-rel pd10 d-inlnblk ft-12 t-uppercase col-wht" onClick={() => this.redirectTo("quizmania")}><img src="images/quiz-icon.svg" />QuizMania</span>
                    <ul className="t-left pd25 pb-0">
                        <li>Play Quiz Mania with your friend</li>
                        <li>It’s a 2 player quiz, you can select your team to start</li>
                        <li>Player 1 can challenge their friend by creating a room and sharing the code with them.</li>
                        <li>Both players need to answer 3 questions related to their chosen team within 15 seconds.</li>
                        <li>Players will be awarded 10 points for each correct answer.</li>
                        <li>The Player with the highest points wins the game.</li>
                        <li>The opponent’s points will be added to the winner’s overall points pool.</li>
                        <li>In case of a tie, there will be a tie breaker question. </li>
                        <li>Play QuizMania, score points, and get a chance to win Royal Enfield Classic 350.</li>
                    </ul>


                    <hr className="mtb-20" />
                    <span className="ttlTag mt-10 pos-rel pd10 d-inlnblk ft-12 t-uppercase col-wht" onClick={() => this.redirectTo("game play")}><img src="images/game-icon.svg" />Game Play</span>

                    <ul className="t-left pd25 pb-0 ">
                        <li>Play exciting cricket games and earn points</li>
                        <li>You can win amazing coupons too</li>
                        <li>Also get a chance to win Royal Enfield Classic 350</li>
                    </ul>

                </section>

                <Footer page={"How To Play"} />
            </>
        )

    }
}