import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Link,
    Route
} from "react-router-dom";
import ReactGA from "react-ga"

import { aaTrackPageview, aaTrackACB } from '../Config/Config';

export default class About extends Component {

    componentDidMount() {
        ReactGA.pageview("Info Drawer");
        var token_id = localStorage.getItem("token_id")
        var user_id = localStorage.getItem("user_id")
        aaTrackPageview("pageview", "Info Drawer", "ACB_info_drawer")
    }

    sendEvent = () => {
        this.props.closeDrawer(true); 
    }
    render() {
        return (<>
            <div className="drwrBg actvDrwr">
                <div className="drwrBgshdw"></div>
                <div className="drwrBx">
                    <div className="logoTp">
                        <img src="images/logo-airtel.png" />

                        {/* <h4 className="skip_txt_about"
                            onClick={() => this.props.closeDrawer('Skip')}
                        >Close</h4> */}

                    </div>

                    <div className="contArea">
                        <div className="contAreaSlider">
                            <div className="slideRow d-flex al-i-center">
                                <div className="imgBx">
                                    <img src="images/spin-mobile-icon.svg" />
                                </div>
                                <div className="contBx">Spin the wheel & get a chance to win a Samsung Galaxy M01 every week.
                        </div>
                            </div>
                            <div className="slideRow d-flex al-i-center reverse-mode">
                                <div className="imgBx">
                                    <img src="images/predict-mobile.svg" />
                                </div>
                                <div className="contBx">
                                    Predict to Win- Here’s your chance to win a Sony Bluetooth Speaker during every match.
                        </div>
                            </div>
                            <div className="slideRow d-flex al-i-center">
                                <div className="imgBx">
                                    <img src="images/quizmania_icon.png" width="54" />
                                </div>
                                <div className="contBx">
                                    Participate in QuizMania & get a chance to win Royal Enfield Classic 350.
                        </div>
                            </div>
                            <div className="slideRow d-flex al-i-center reverse-mode">
                                <div className="imgBx">
                                    <img src="images/play-icon.svg" />
                                </div>
                                <div className="contBx">
                                    Play exciting games, earn points & win awesome coupons.
                        </div>
                            </div>

                        </div>
                    </div>

                    {/* <div className="predictBtn">
                        <div className="btnArea">

                            <Link to="/"><input type="button" value="PLAY More Games" className="btnStyl1" onClick={this.props.closeDrawer} /></Link>

                           

                        </div>
                    </div> */}


                    <div className="predictBtn">

                        <Link to="#" className="btnArea btnStyl1">
                            <span className="btnStyl1 d-inlnblk t-uppercase" onClick={() => {this.sendEvent()}}>Start Playing</span>
                        </Link>

                    </div>


                </div>
            </div>
        </>
        )
    }
}
