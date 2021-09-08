import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import $ from 'jquery';
import { aaTrackPageview } from '../Config/Config'
import ReactGA from "react-ga";
export default class Faq extends Component {

    constructor() {
        super();
        this.state = {
            points: localStorage.getItem("points"),
            username: localStorage.getItem("username")

        }
    }

    componentDidMount() {
        document.title = "Faq"
        ReactGA.pageview("Faq");
        let username = localStorage.getItem("username")
        let token_id = localStorage.getItem("token_id")
        let user_id = localStorage.getItem("user_id")
        aaTrackPageview("pageview", "Faq", "Faq")
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }

    render() {
        return (
            <>

                <Header
                    points={this.state.points}
                    username={this.state.username}
                />




                <div className="faq_wrp pd20">
                    <h2 className="widgtTtl t-uppercase d-block mb-10">frequently asked questions</h2>
                    <div className="faq_cnt">
                        <div className="faq_block">
                            <div className="right_txt">
                                <p className="faq_ques pfaq_ques1">What is Airtel Cricket Bonanza?</p>
                                <p className="faq_ans">Airtel Cricket Bonanza is an contest hosted in Airtel Thanks App and will be available for All Airtel Prepaid & Postpaid Customers between 19th of Sep 2020 & 10th of Nov 2020.
                                </p>

                            </div>
                        </div>

                        <div className="faq_block">
                            <div className="right_txt">
                                <p className="faq_ques pfaq_ques2"> Who all can participate in the contest?</p>
                                <p className="faq_ans">All Airtel Thanks App users can participate in the contest by downloading and registering on Airtel Thanks app. </p>

                            </div>
                        </div>

                        <div className="faq_block">
                            <div className="right_txt">
                                <p className="faq_ques pfaq_ques3">Can a participant take part daily in this contest?</p>
                                <p className="faq_ans">Yes, participants can take part daily in the contest.  </p>

                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <p className="faq_ques pfaq_ques4"> How to play in this contest?</p>
                                <p className="faq_ans">All Airtel Thanks users can take part in this contest. User can play 4 types of games. User needs to select the game that he/she wants to play.
                               </p>
                                <ol>
                                    <li>Spin the wheel: In this user will win exciting coupons.</li>
                                    <li>Predict to Win: User will answer the questions and for every correct answer user will earn points. User with highest points in Predict to win will get a chance to win Samsung M31 in every match.</li>
                                    <li>Quizmania: User can invite his/her friend to play the quiz and earn points.</li>
                                    <li>Game Play: User can play    different types of games related to cricket and on winning a game, user will be awarded points and coupons</li>
                                    <li>Winners for Royal Enfield Classic 350 will be selected on basis of highest total points scored in the contest.

</li>



                                </ol>




                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <p className="faq_ques pfaq_ques5"> How may Winners will be selected every day?</p>
                                <p className="faq_ans">Winners will be selected randomly for Predict & Win for every completed match. Number of winner are not fixed and dependent on number of participation, correct predictions & availability of prize.

</p>

                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <p className="faq_ques pfaq_ques6">How would the winners be selected?</p>
                                <p className="faq_ans">Any participant who manages to get highest points will be eligible for reward. Final winners will be selected at random from the pool of all eligible participants. Allocation of rewards within the winners will also be done randomly.

</p>

                            </div>
                        </div>

                        <div className="faq_block">
                            <div className="right_txt">
                                <p className="faq_ques pfaq_ques7">What are the rewards to be won?</p>

                                <ol>
                                    {/* <li>Spin the wheel: Rewards include Samsung Galaxy M01 every week.</li> */}
                                    <li>Predict to Win: Rewards include Samsung M31 and Amazon Gift vouchers of Rs 500 in every match.</li>
                                    {/*<li>Also user with highest total points in the contest can win Royal Enfield Classic 350. </li>*/}
                                    <li>Also user with highest total points in the contest can win Royal Enfield Classic 350. User with rank 2 to rank 6 will be awarded Apple iPhone11</li>
                                </ol>
                                <br />
                                <p className="faq_ans">Amazon Gift vouchers (of any denomination) can be used to purchase any product from Amazon and there is no minimum spend criteria for using this voucher. Voucher will be valid for three months from the date of issue.</p>




                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <p className="faq_ques pfaq_ques8">How will I get to know the result?</p>
                                <p className="faq_ans">Winners will be notified through SMS within 5 business day.

</p>

                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <p className="faq_ques pfaq_ques9">How to claim the Rewards?</p>
                                <p className="faq_ans">Winners will be getting an SMS with a link to a page where they need to submit details (Name, Mobile Number, etc.). Once the winner visits the page and submit the details another SMS will be sent with reward details within 72 hours. Rewards details will be Coupon Code for Amazon Gift Voucher & for Sony Bluetooth Speaker , Samsung Galaxy M01, Samsung Galaxy M31 and iphone 11it will be a confirmation message.

</p>

                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <p className="faq_ques pfaq_ques10">What is the window of predict to win game?</p>
                                <p className="faq_ans">Each participant can predict till the mid innings of each match. </p>

                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <p className="faq_ques pfaq_ques11">What will happen if Match gets cancelled?</p>
                                <p className="faq_ans">In case, a match gets cancelled, the predictions would also be cancelled. No points would be awarded for that match. No winners would be announced for that match. </p>

                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <p className="faq_ques pfaq_ques12">How do I contact the program helpdesk in case of any issues?</p>
                                <p className="faq_ans">Our endeavour is to deliver you with best experience. However, if you need any assistance related to the Program, you may contact Airtel Customer Care in case you are an Airtel subscriber or 8851251490
                                Or mail on <a href="mailto:mtech@ndtv.com">mtech@ndtv.com</a>  in case you are a Non Airtel users.
 </p>

                            </div>
                        </div>












                    </div>
                </div>
                <Footer page={"Faq"}/>
            </>
        )

    }
}