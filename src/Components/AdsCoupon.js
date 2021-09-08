import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import $ from 'jquery';

import ReactGA from "react-ga"
import { baseUrl, aaTrackPageview, baseURI } from '../Config/Config'
import { Bling as GPT } from "react-gpt";
import { gameUpdate } from '../Services/Service';
import moment from 'moment';

GPT.enableSingleRequest();
export default class AdsCoupon extends Component {

    constructor() {
        super();
        this.state = {
            points: localStorage.getItem("points"),
            username: localStorage.getItem("username"),
            sr_gameInsID: localStorage.getItem("sr_gameInsID"),
            sr_game_id: localStorage.getItem("sr_game_id"),
            // sr_gameInsID: 'e419954d-3f29-432f-a0f3-20e30b351f8d',
            // sr_game_id: 'predict_to_win',
            isShowLoader: true,
            couponData: null,
            gameUrl: null,
            showPlayAgain: false
        }
    }

    async componentDidMount() {

        ReactGA.pageview("Check Prize");
        aaTrackPageview("pageview", "Check Prize", "Check Prize")
        $("html, body").animate({ scrollTop: 0 }, "slow");
        GPT.syncCorrelator([true])
        let gameEvent, gameUrl = baseURI, showPlayAgain = false;
        if (this.state.sr_gameInsID && this.state.sr_game_id) {


            switch (localStorage.getItem('sr_game_id')) {
                case 'predict_to_win':
                    gameEvent = 'ptw_game_play'
                    gameUrl = baseURI + '?screen=predict'
                    break;

                case 'quizmania':
                    gameEvent = 'quiz_game_play'
                    gameUrl = baseURI + '?screen=quizmania'
                    showPlayAgain = true;
                    break;
            }

            let payload = {
                "gameID": this.state.sr_game_id,
                "gameInsID": this.state.sr_gameInsID,
                "gameEvent": gameEvent
            }
            let res = await gameUpdate(payload);
            if (res.success) {
                // delete the game_instance_id and game_id
                localStorage.removeItem('sr_gameInsID')
                localStorage.removeItem('sr_game_id')
                localStorage.removeItem('sr_game')

                this.setState({ isShowLoader: false, couponData: res.coupon, gameUrl, showPlayAgain })
            }
        } else {
            // window.location.href = baseUrl + '/'
        }
    }

    render() {

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
                
                <section>
                <div style={style.main_adPcntr}>
                        <div id="div-gpt-ad-1599470843941-0" >
                            <GPT
                                adUnitPath="/1068322/NDTV_Airtel_IPL_APP_endofgame_320x50"
                                slotSize={[320, 50]}
                            />
                        </div>
                    </div>
                    <div class="container2">
                        <div class="redeemBx pd20 mt-20 brdr-rad12 t-center pos-rel of-hdn winptw">
                            <div class="confettiBx"></div>
                            <div class="confettiCnt">
                                <h2 class="mtb-15 mlr-auto lh-1pt3 ftw-600">Congratulations</h2>
                                <span class="ft-16 coupn_nm width-80p lh-1pt3">You have won a<br /> {this.state.couponData ? this.state.couponData.partner_brand : null} Discount Coupon</span>
                                <div class="clearfix"></div>
                                <div class="coupanCrd d-flex al-i-center jus-c-center mt-20 mb-10 pos-rel">
                                    <span class="cpnRd pos-rel d-flex jus-c-center al-i-center t-uppercase">Coupon</span>
                                    <span class="cpngr pos-rel col-red d-flex jus-c-center al-i-center ftw-600">{this.state.couponData ? this.state.couponData.code : null}</span>
                                </div>


                                <span class="ft-12 coupn_Txt">Valid till {this.state.couponData !== null && "agreement_date" in this.state.couponData ? moment(this.state.couponData.agreement_date).format('Do MMM,YYYY') : "31st Oct,2020"}</span>
                                <span class="noteTxt d-block mt-10 lh-1pt3"><b>Benefits:</b> {this.state.couponData ? this.state.couponData.benefit : null}</span>
                                {/* <div class="btnArea btnStyl1">
                    <input type="button" class="btnStyl1 t-uppercase" value="Redeem" />
                </div> */}

                                {this.state.showPlayAgain ?
                                    <div class="predictBtn1">
                                        <a href={baseUrl + "/?screen=quizmania"} class="btnArea btnStyl1 arwbtncntr">
                                            <span class="btnStyl1 d-inlnblk t-uppercase">play again</span>
                                        </a>
                                    </div> : null}

                                <div class="predictBtn1">
                                    <a href={baseUrl + "/"} class="btnArea btnStyl1 arwbtncntr">
                                        <span class="btnStyl1 d-inlnblk t-uppercase">play more games</span>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <div >

                    {/* <div style={style.main_adPcntr}>
                        <div id="div-gpt-ad-1599470843941-0" >
                            <GPT
                                adUnitPath="/1068322/NDTV_Airtel_IPL_APP_endofgame_320x50"
                                slotSize={[300, 50]}
                            />
                        </div>
                    </div> */}

                    {/* <div style={style.popupContainer_overlay} > */}
                    {/* <div style={style.popupContainer}> */}
                    {/* <div style={style.ad_div}>
                            <img src="/images/adbanner.png" style={style.ad_div_img} />
                        </div> */}

                    {/* <h3 style={style.cong_txt}>congratulations</h3>
                            <h4 style={style.cong_text2}>You’ve Won<br /> {this.state.couponData ? this.state.couponData.partner_brand : null} Discount Coupon</h4>
                            <div style={style.cong_btns_wrp}>
                                <div style={style.copy_wrp}>
                                    <div style={style.copy_banner1}>
                                        Coupon
            </div>
                                    <div style={style.copy_banner2}>
                                        {this.state.couponData ? this.state.couponData.code : null}
                                    </div>
                                </div>


                            </div>
                            <div>
                                <h4 style={style.cong_velid}>Valid till {this.state.couponData ? moment(this.state.couponData.agreement_date).format('LL') : null}</h4>
                                <h4 style={style.cong_benift}><b>Benefits:</b> {this.state.couponData ? this.state.couponData.benefit : null} </h4>
                            </div> */}

                    {/* <Link to="/"><button style={style.btn_red}><span className="btnStyl1 d-inlnblk t-uppercase" style={style.btn_red}>Play More Games</span></button></Link> */}

                    {/* <Link to="/"><span className="predictBtn btnArea btnStyl1 d-inlnblk t-uppercase" style={style.btn_red}>Play More Games</span></Link> */}

                    {/* {this.state.showPlayAgain ? <div className="predictBtn1">
                                <Link to={baseUrl + "/quiz-mania/team-selection"} className="btnArea btnStyl1 arwbtncntr">
                                    <span className="btnStyl1 d-inlnblk t-uppercase">play again</span>
                                </Link>
                            </div> : null}


                            <div className="predictBtn1">
                                <Link to={baseUrl + "/"} className="btnArea btnStyl1 arwbtncntr">
                                    <span className="btnStyl1 d-inlnblk t-uppercase">play more games</span>
                                </Link>
                            </div> */}


                    {/* <div className="txtCopyBx pos-rel">
                <span id="cpnCd" className="ftw-600 t-center">OGx87tjj</span>
                <div className="copyContnr" >
                    <input type="button" className="copyIcn"/>
                    <span>COPY</span>
                </div>
            </div>
            <div className="copySts width-100p mb-10 d-none">Copied</div>
            <span className="noteTxt width-80p lh-1pt3">You can also view your coupon code <br/> later in your my rewards section</span>
            <div className="clearfix"></div>
            <div className="predictBtn">
                <a className="btnArea btnStyl1">
                    <span className="btnStyl1 d-inlnblk t-uppercase">play more games</span>
                </a>
            </div> */}
                    {/* </div>
                    </div> */}
                </div>
                {/* <Footer /> */}
            </>
        )

    }
}

const style = {
    popupContainer: {

        backgroundColor: 'white',
        textAlign: 'center',
        padding: 20,
        width: '100%',
        position: 'relative',
        bottom: 0,
        borderRadius: 8,
        backgroundImage: 'url(/agames/images/winn.gif)',
        backgroundPosition: 'bottom',
    },

    main_adP: {
        height: '82vh',
    },

    main_adPcntr: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
    },
    popupContainer_overlay: {

        // background: 'rgb(48, 47, 58, 0.7)',
        //width: '100%',
        //height: '100%',
        //position: 'fixed',
        // top: 0,
        // left: 0,
        //right: 0,
        //bottom: 0,
        //display: 'flex',
        alignItems: 'center',
        // zIndex: 99,
        padding: 20,
        paddingBottom: 0,
    },
    ad_div: {
        height: 70,
        margin: -20,
        marginBottom: 10

    },
    ad_div_img: {
        width: '100%',
        height: '100%',
    },
    cong_txt: {
        fontSize: 22,
        fontWeight: 700,
        textTransform: 'capitalize',
        marginBottom: 15,
        marginTop: 30,
    },
    cong_text2: {
        fontSize: 14,
        fontWeight: 400,
        marginBottom: 15,
        marginTop: 10,
    },
    cong_velid: {
        fontSize: 10,
        fontWeight: 400,
        marginTop: 10,
    },
    cong_benift: {
        fontSize: 10,
        fontWeight: 400,
        marginTop: 10,
    },
    btn_red: {

        backgroundColor: '#f11f24',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3px 10px',
        borderRadius: 3,
        minWidth: 170,
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 14,
        fontWeight: 600,
        border: 0,
        height: 40,
        width: '100%',
        boxShadow: '0 5px 9px 0 rgba(0,0,0,0.19)',
        marginTop: 10,
        marginBottom: 0,
    },
    copy_banner1: {
        backgroundImage: 'url(/agames/images/red-bg-cpncrd.svg)',
        width: 70,
        height: 35,
        backgroundRepeat: 'no-repeat',
        transform: 'rotate(270deg)',
        backgroundSize: '100% 100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 11,
        color: '#f9efef',
        textTransform: 'uppercase',
    },
    copy_banner2: {
        backgroundImage: 'url(/agames/images/grey-bg-cpncrd.svg)',
        height: 70,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        width: 154,
        padding: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        fontWeight: 700,
        color: '#f11f24',
        marginLeft: -20,

    },
    copy_wrp: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cong_btns_wrp: {

    }
}
