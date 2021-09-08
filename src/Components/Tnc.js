import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import $ from 'jquery';
import { aaTrackPageview } from '../Config/Config'
import ReactGA from "react-ga"
export default class Tnc extends Component {

    constructor() {
        super();
        this.state = {
            points: localStorage.getItem("points"),
            username: localStorage.getItem("username")

        }
    }

    componentDidMount() {
        document.title = "Terms & Conditions"
        ReactGA.pageview("Terms & Conditions");
        let username = localStorage.getItem("username")
        let token_id = localStorage.getItem("token_id")
        let user_id = localStorage.getItem("user_id")
        aaTrackPageview("pageview", "Terms & Conditions", "Terms & Conditions")
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
                    <h2 className="widgtTtl t-uppercase d-block mb-10">Terms & Conditions</h2>
                    <div className="faq_cnt">
                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                <li className="pfaq_ques1">
                                        Under the Airtel Cricket Bonanza contest, all the users of Airtel Thanks App users in India are encouraged to participate for a chance to win exciting prizes (“Contest”).
                        </li>
                                </ul>
                            </div>
                        </div>

                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                <li className="pfaq_ques2">
                                        This Contest is open to all customers who participate through Airtel Thanks app.
                        </li>
                                </ul>
                            </div>
                        </div>

                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                <li className="pfaq_ques3">
                                        The Contest shall open on 15th September  2020 00:00 hours (IST) and shall close on 10th November 2020 11:30 hours (IST). (‘Contest Period’).
                        </li>
                                </ul>
                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                <li className="pfaq_ques4"> To avail a chance to win the Contest, an Airtel Thanks App user needs to participate in the Contest within the Contest Period, through the Airtel Thanks App available for download on the Android Play Store and the Apple Store. The above is necessary to participate in the Contest for an individual to qualify as a Participant.</li>

                                </ul>
                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                <li className="pfaq_ques5"> A participant can take part in a prediction contest during days when a live Indian Premiere League (IPL) cricket match is being played. This will done on through participation in prediction quiz available between 00:00 hrs of the calendar day and pre-defined end-time. A prediction will be considered correct only if all of the questions are answered correctly. One participant can take part in the prediction contest once during a calendar day.</li>

                                </ul>
                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                <li className="pfaq_ques6"> On the days when no IPL cricket match is played participants can take part in the trivia quiz. Participants are eligible to win a prize only in case of giving correct answers to all the questions. One participant can take part in the trivia contest once during a calendar day.</li>

                                </ul>
                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                <li className="pfaq_ques7" > For the prediction quiz eligible participants as per Clause-5 will be put through a algorithmic randomized draw-of-lots and final winner will be selected. Only the winners will be notified through SMS within 5 working days. Winners are to claim their reward from an automated system, link of which will be provided in the SMS. Winners will be eligible to claim their reward till 19th Nov 2020 post which the Winners will be deemed to have forfeit the same.</li>

                                </ul>
                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                <li className="pfaq_ques8"> In case of a tie breaker, Airtel & NDTV will have the right to have any additional contest in order to declare a winner.</li>

                                </ul>
                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                <li className="pfaq_ques9"> Fort the trivia quiz winners will be randomly selected at the end of each quiz if the participant is eligible basis Clause-6. Winners have to claim the prize using the automated system on or before 19th Nov 2020 post which they forfeit the same.</li>
 
                                </ul>
                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                <li className="pfaq_ques10"> In case of rewards requiring physical product deliveries NDTV will be using a 3rd party agency who will contact the winner to take the final delivery address and complete the delivery. This will be completed maximum within 15 working days post completion of the claim process by the winner.</li>

                                </ul>
                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                                      
                                <li className="pfaq_ques11"> Both in case of Prediction and Trivia Quiz only limited number of winners will be selected randomly which will be dependent on number of participants, correct answers/predictions given & availability of rewards.
</li>
                                </ul>
                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                <li className="pfaq_ques12"> Airtel shall not be held liable/ obligated to answer for queries for a Participant’s entry or pertaining to winning or losing the Contest, or to the process of selecting the winners.</li>

                                </ul>
                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                    
                                <li className="pfaq_ques13"> Winners of the physical prizes will be contacted via call/e-mail with instructions on how to collect their prize(s). In case of winners are non-contactable after 3 attempts they will forfeit their prize.
</li>
                                </ul>
                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                <li className="pfaq_ques14"> The timeline of the distribution of the prizes to various winners will vary and can be delayed due to existing COVID situation.</li>

                                </ul>
                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                <li className="pfaq_ques15"> By entering into the Contest and accepting these Terms & Conditions, the participants acknowledge and consent to disclosing of their contact details to the gift logistics partner in order to be eligible for a prize under this Contest.</li>

                                </ul>
                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                <li className="pfaq_ques16"> In case, a match gets cancelled, the predictions for that match would stand null and void. No winners would be announced for that match. In case of Duckworth Lewis Method is applicable in a match, some of the predictions could be declared null and void.</li>

                                </ul>
                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                    
                                </ul>
                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                  
                                <li className="pfaq_ques17"> In case of any ambiguity on rewards and winners, decision will be finalized at the discretion of Airtel. This decision is at the sole discretion of Airtel and shall be final and binding on the participants of the Contest.
</li>  
                                </ul>
                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                <li className="pfaq_ques18"> The winners confirm and consent to submit their latest photographs which may be used by Airtel for promotional activities pertaining to this Contest.</li>

                                </ul>
                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                    
                                <li className="pfaq_ques19"> Products and Rewards depicted in photographs may be different from actual rewards received.
</li>
                                </ul>
                            </div>
                        </div>



                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                <li className="pfaq_ques20"> In the rare case of non-availability of rewards detailed in scheme description, reward with a similar value from comparable brand may be offered.</li>

                                </ul>
                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                <li className="pfaq_ques21"> Income Tax liability for the Gift Tax would be with the recipient. All the winners are liable to pay a TDS as per the government regulations in order to receive their prizes</li>

                                </ul>
                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                <li className="pfaq_ques22"> The prizes shall be given on the their MRP only, and Airtel or the logistics partner shall not be responsible for any costs/ charges/ fees applicable or imposed upon the winner in order to use the prizes.</li>

                                </ul>
                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                <li className="pfaq_ques23"> These terms and conditions shall constitute an agreement between Airtel and each individual participant / winners of the Contest, and these terms shall be binding on the participants and the winners.</li>
 
                                </ul>
                            </div>
                        </div>


                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                <li className="pfaq_ques24"> Airtel will be entitled to postpone, suspend, modify or cancel the Contest or any aspect thereof, across the entire territories of service or any part thereof, at any time before or during the Contest with or without notice, for any reason, including, but not limited to, acts of God, force majeure, technical difficulties, or any other reasons beyond Airtel’s reasonable control. If Airtel suspends or cancels the Contest in the interim, all aspects of the Contest shall be null and void. Airtel will not be liable to compensate any participant or winner for any postponement or cancellation or for any reason directly or indirectly arising out of this Contest.</li>

                                </ul>
                            </div>
                        </div>

                        <div className="faq_block">
                            <div className="right_txt">
                                <ul className="pad-left-zero tnc_ul">
                                <li className="pfaq_ques25"> Any dispute or claim (contractual or non-contractual) arising out of or in relation to this agreement, including disputes as to its formation, will be governed by and construed in accordance with Indian laws. Subject to the point above, Airtel and the Participants submit to the exclusive jurisdiction of Courts at New Delhi alone.</li>
                                </ul>
                            </div>
                        </div>


                    </div>
                </div>

                <Footer  page={"Terms & Conditions"}/>
            </>
        )

    }
}