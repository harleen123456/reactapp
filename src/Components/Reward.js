import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import $ from 'jquery';
import { getRewards, filterRewards, saveUserAddress, getTncData } from '../Services/Service';
//import Modal from 'react-bootstrap/Modal';
import copy from "copy-to-clipboard";
import {
    BrowserRouter as Router,
    Link,
    Route
} from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroller';
import { baseUrl, aaTrackPageview, aaTrackACB, openAirtel } from '../Config/Config'
import ReactGA from "react-ga";
import moment from 'moment';
export default class Reward extends Component {
    constructor() {
        super();
        this.state = {
            rewardData: [],
            isShowLoader: true,
            isShowCouponPopup: false,
            benifit: "",
            code: "",
            search_key: "",
            hasMoreItem: false,
            isFilterData: false,
            points: localStorage.getItem("points"),
            username: localStorage.getItem("username"),
            isCopied: false,
            redeemCoupon: null,
            prizesData: [],
            highestScore: localStorage.getItem("highestScore"),
            isShowPrizePopup: false,
            address: "",
            pan_no: "",
            aadhar_no: "",
            full_address: "",
            invalid_pan_no: false,
            invalid_aadhar_no: false,
            invalid_address: false,
            prize_image: "",
            isShowSubmitMsg: false,
            errors: {},
            showTnc: false
        }
    }
    sendTrack = (event, eventAction, eventLabel) => {
        aaTrackACB(event, eventAction, eventLabel, "ACB_my_prizes");
    }
    sendTrackPopup = (event, eventAction, eventLabel) => {
        aaTrackACB(event, eventAction, eventLabel, "ACB_my_prizes_popup");

    }
    showPopup = (coupon_data) => {
        aaTrackPageview("pageview", "My Prizes | Coupon PopUp", "ACB_my_prizes")
        this.sendTrack("acb_my_prizes_click", "My Prizes Clicks", "Redeem")
        this.setState({ isShowCouponPopup: true, benifit: coupon_data.benefit, code: coupon_data.code, redeemCoupon: coupon_data })
    }
    hideCouponPopup = () => {
        this.sendTrackPopup("acb_my_prizes_popup_click", "My Prizes Clicks", "Pop Up | Close")
        this.setState({ isShowCouponPopup: false, isCopied: false })
    }
    showPrizePopup = (prize_image) => {
        aaTrackPageview("pageview", "My Prizes | Prize PopUp", "ACB_my_prizes")
        this.sendTrackPopup("acb_my_prizes_popup_click", "My Prizes Clicks", "Pop Up | Redeem")
        this.setState({ isShowPrizePopup: true, prize_image: prize_image })
    }
    hidePrizePopup = () => {
        this.setState({
            isShowPrizePopup: false, pan_no: "", aadhar_no: "", full_address: "",
            invalid_address: false, invalid_aadhar_no: false, invalid_pan_no: false,
            errors: {}
        })
        // if (this.state.address == "no") {
        //     window.location.reload();
        // }
    }
    copyToClipboard = (code) => {
        this.sendTrackPopup("acb_my_prizes_popup_click", "My Prizes Clicks", "Copy")
        copy(code);
        this.setState({ isCopied: true })
    }

    searchInputHandler = (event) => {
        if (event.target.name == 'search_key') {
            this.setState({ search_key: event.target.value })
        }
    }
    formInputHandler = (event) => {
        if (event.target.name == "pan_no") {
            this.setState({ pan_no: event.target.value })
        }
        if (event.target.name == "aadhar_no") {
            this.setState({ aadhar_no: event.target.value })
        }
        if (event.target.name == "full_address") {
            this.setState({ full_address: event.target.value })
        }

    }


    saveFormData = async () => {
        // let result = isNaN(this.state.aadhar_no);
        // if (this.state.pan_no != "" && this.state.pan_no.length == 10) {
        //     console.log("Hi")
        //     if (result == false && this.state.aadhar_no.length == 12) {
        //         if (this.state.full_address != "") {
        //             this.setState({ invalid_address: false, invalid_aadhar_no: false, invalid_pan_no: false })
        this.setState({ isShowLoader: true })
        if (this.handleValidation()) {
            let payload = {
                address: this.state.full_address,
                penCard: this.state.pan_no,
                aadharCard: this.state.aadhar_no
            }
            let res = await saveUserAddress(payload);
            this.setState({ isShowLoader: false })
            if (res.success) {
                aaTrackACB("acb_my_prizes_click", "My Prizes Clicks", "Save", "ACB_my_prizes")
                this.hidePrizePopup();
                this.setState({ isShowSubmitMsg: true })
            }
        }

        //         } else {
        //             this.setState({ invalid_address: true, invalid_aadhar_no: false, invalid_pan_no: false })
        //         }

        //     } else {
        //         this.setState({ invalid_aadhar_no: true, invalid_address: false, invalid_pan_no: false })
        //     }
        // } else {
        //     this.setState({ invalid_pan_no: true, invalid_address: false, invalid_aadhar_no: false })
        // }
    }
    handleValidation() {

        let errors = {};
        let formIsValid = true;
        let result = isNaN(this.state.aadhar_no);

        if (this.state.pan_no == "" && this.state.pan_no.length != 10) {
            formIsValid = false;
            errors["pan_no"] = "Invalid PAN No";
        }

        if (result == false && this.state.aadhar_no.length != 12) {
            formIsValid = false;
            errors["aadhar_no"] = "Invalid Aadhar No";
        }

        if (this.state.full_address == "") {
            formIsValid = false;
            errors["full_address"] = "Invalid Address";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    filterdata = async () => {
        if (this.state.search_key !== "") {
            this.setState({ isShowLoader: true, isFilterData: true, hasMoreItem: false })
            let payload = {
                partner_brand: this.state.search_key
            }
            let res = await filterRewards(payload);
            console.log("res", res)
            let d
            let tempArr = []
            this.setState({ rewardData: [] })
            if (res.success == true) {
                if (res.data.item.length > 0) {
                    res.data.item.map((data) => {
                        d = JSON.parse(data.coupon_data)
                        tempArr.push(d)
                    })
                    this.setState({ rewardData: [...this.state.rewardData, ...tempArr], isShowLoader: false })
                } else {
                    this.setState({ isShowLoader: false })
                }
            }

        } else {
            this.setState({ rewardData: [] })
            // this.blankSearchReward()
            window.location.reload();
        }
    }
    hidePrizePopupMessage = () => {
        this.sendTrackPopup("acb_my_prizes_popup_click", "My Prizes Clicks", "Pop Up | Close")
        this.setState({ isShowSubmitMsg: false })
        window.location.reload();
    }
    blankSearchReward = async () => {
        this.setState({ isShowLoader: true })
        let d
        let tempArr = []
        let payload = {
            partner_brand: this.state.search_key
        }
        let res = await filterRewards(payload);
        if (res.success == true) {
            res.data.item.map((data) => {
                d = JSON.parse(data.coupon_data)
                tempArr.push(d)
            })
            this.scroll.pageLoaded = 0
            this.setState({ rewardData: tempArr, isFilterData: false, hasMoreItem: true, isShowLoader: false })

        }


    }
    async getRewardsOnNext(page) {
        if (this.state.hasMoreItem == true && this.state.isFilterData == false) {
            let d
            let tempArr = []
            let res = await getRewards(page);
            if (res.success == true) {
                res.data.item.map((data) => {
                    d = JSON.parse(data.coupon_data)
                    tempArr.push(d)
                })
                this.setState({ rewardData: [...this.state.rewardData, ...tempArr], hasMoreItem: true })
            }
        }
    }

    async componentDidMount() {
        document.title = "My Prizes"
        ReactGA.pageview("My Prizes");
        let username = localStorage.getItem("username")
        let token_id = localStorage.getItem("token_id")
        let user_id = localStorage.getItem("user_id")
        aaTrackPageview("pageview", "My Prizes", "ACB_my_prizes")
        $("html, body").animate({ scrollTop: 0 }, "slow");
        let page = 0
        let res = await getRewards(page);
        // console.log("res", res)
        let d
        let tempArr = []
        if (res.success == true) {
            console.log("res", res)
            res.data.item.map((data) => {
                d = JSON.parse(data.coupon_data)
                tempArr.push(d)
            })
            console.log("tempArr", tempArr)

            // let arr = [{"id":"","date":"","won":0,"result":"","image": "https://ndtv-airtel-frontend.s3.ap-south-1.amazonaws.com/1MgLabs.png","prizeName" : "Samsung Mobile","benefit":"Click on redeem to claim your prize"},
            // {"id":"","date":"","won":1,"result":"","image": "https://ndtv-airtel-frontend.s3.ap-south-1.amazonaws.com/1MgLabs.png", "prizeName" : "Samsung Mobile","benefit":"Click on redeem to claim your prize"}]

            this.setState({ rewardData: tempArr, hasMoreItem: true, isShowLoader: false, prizesData: res.rewardEntity, address: res.address })
        } else {
            this.setState({ isShowLoader: false })
        }
    }
    gotoClaimPrize = () => {
        aaTrackACB("acb_my_prizes_popup_click", "My Prizes Clicks", "My Prizes", "ACB_my_prizes")
        this.props.history.push(baseUrl + '/prize-claim')
    }

    getTncData = async (brand) => {

        this.setState({ isShowLoader: true })
        let res = await getTncData(brand)

        this.setState({ isShowLoader: false })
        if (res.success && res.data !== null) {
            this.setState({ tncData: res.data.brand_tnc })
            this.toggleTnc();
        }


    }

    toggleTnc = () => {
        this.setState({ showTnc: !this.state.showTnc });
    }

    render() {
        let items = []
        this.state.rewardData.map((data, index) => {
            items.push(
                <div className="couponItm d-flex al-i-center pd6 mb-20 pr-20" id="coup[[id]]" key={index + data.id}>
                    <div id="cpn">
                        <div className="logoBx of-hdn">
                            <img onClick={() => this.getTncData(data.code)} src={'logos/' + data.image.toLowerCase()} />
                        </div>
                        <div className="coupnCompny" >
                            <h4 id="cpm" className="d-flex" onClick={() => this.getTncData(data.code)} src={'logos/' + data.image.toLowerCase()}>{data.partner_brand}
                                {/* <img src="images/info.png" className="infowid" onClick={() => this.getTncData(data.partner_brand)} /> */}
                            </h4>
                            <span>{data.benefit}</span>
                        </div>
                    </div>
                    <div className="redmSts ml-auto t-uppercase">
                        <div onClick={() => this.showPopup(data)}>redeem</div>
                    </div>
                </div>)
        })
        return (
            <>
                {this.state.isShowLoader == true ? <div className="loader_main">
                    <div className="loaderBg"></div>
                    <div className="loadingTXt">Loading...</div>
                    <div className="loader">Loading...</div>
                </div> : null}
                <Header
                    screen="home"
                    points={this.state.points}
                    username={this.state.username}
                />
                {/* <section className="hstscr_section">
                    <div className="heighest_scrore_wrp">
                        <h4>Total Points Earned</h4>
                        <h2>{this.state.points}</h2>
                    </div>
                    <div className="heighest_scrore_wrp2">
                        <h4>HIGHEST SCORE</h4>
                        <h2>{this.state.highestScore}</h2>
                    </div>
                </section> */}


                <section className="couponsSec pd20 pt-0">
                    {/* <div className="totlpnts-bar d-flex jus-s-between pd15">
                        <span className="ttlOfPnt t-uppercase"><b>Total Points Earned</b></span>
                        <span className="numOfPnt">{this.state.points}</span>
                    </div> */}

                    <span className="noteTxt d-block mtb-10 pd10 pt-0">
                        Score the highest points & win the Royal Enfield Classic 350
        </span>                <div className="clearfix"></div>
                    <div className="bonusTp t-center pd4 brdr-rad12 mb-20">
                        <strong className="d-block"> #Bonus Tip</strong>
        Participate in ‘Predict to Win’ daily to earn more points
    </div>


                    {this.state.prizesData.length > 0 ?
                        <div className="coupon_listOutr">
                            <div className="cupn_title_wrp">
                                <h3 className="widgtTtl t-uppercase d-block ft-15 mb-10 fw-6">LUCKY DRAW PRIZES</h3>
                                <div className="cupn_select_wrp">
                                </div>
                            </div>
                            <div className="coupon_list" id="coupons">
                                {/* {this.state.prizesData.length > 0 ? */}
                                {this.state.prizesData.map((data, index) =>
                                    <div className="couponItm d-flex al-i-center pd6 mb-20 pr-20" id="coup[[id]]">
                                        <div id="cpn">
                                            <div className="logoBx of-hdn">
                                                <img src={data.image} />
                                            </div>
                                            <div className="coupnCompny" >
                                                <h4 id="cpm">{data.result}</h4>
                                                {/* <h4 id="cpm">Phone</h4> */}
                                                {/*<span className="mt7">Lucky draw for Spin the wheel</span>*/}
                                            </div>
                                        </div>
                                        {data.won == 1 ? <div className="redmSts ml-auto t-uppercase">
                                            {/* <div onClick={() => this.showPrizePopup(data.image)}>redeem</div> */}
                                            <div onClick={() => this.gotoClaimPrize()}>add details</div>
                                        </div> : null}
                                    </div>
                                )}
                                {/* :
                                <div id="noCoupon">
                                    <div className="couponItm d-flex al-i-center pd6 mb-20 pr-20">
                                        <div className="coupnCompny">
                                            <h4>No Prizes Found</h4>
                                        </div>
                                    </div>
                                </div>} */}
                            </div>
                        </div> : null}






                    <div className="clearfix"></div>
                    <div className="coupon_listOutr">
                        <div className="cupn_title_wrp">
                            <h3 className="widgtTtl t-uppercase d-block ft-15 mb-10 fw-6">My Coupons</h3>
                            <div className="cupn_select_wrp">
                            </div>
                        </div>
                        {/* <div className="searchbox_wrp">
                            <input type="text" placeholder="Search Your Coupon" className="searchinput" id="Dropdownitem"
                                name="search_key" value={this.state.search_key} onChange={this.searchInputHandler} />
                            <div className="searchbox_wrp_border"></div>
                            <img src="./images/search_red.png" className="searchico" onClick={this.filterdata} />
                        </div> */}
                        <div className="coupon_list" id="coupons">
                            {/* {this.state.rewardData.length > 0 ?
                                this.state.rewardData.map((data, index) =>
                                    <div className="couponItm d-flex al-i-center pd6 mb-20 pr-20" id="coup[[id]]">
                                        <div id="cpn">
                                            <div className="logoBx of-hdn">
                                                <img src={data.image} />
                                            </div>
                                            <div className="coupnCompny" >
                                                <h4 id="cpm">{data.partner_brand}</h4>
                                                <span>{data.benefit}</span>
                                            </div>
                                        </div>
                                        <div className="redmSts ml-auto t-uppercase">
                                            <div onClick={() => this.showPopup(data)}>redeem</div>
                                        </div>
                                    </div>) :
                                <div id="noCoupon">
                                    <div className="couponItm d-flex al-i-center pd6 mb-20 pr-20">
                                        <div className="coupnCompny">
                                            <h4>No Coupons Found</h4>
                                        </div>
                                    </div>
                                </div>} */}

                            <InfiniteScroll
                                ref={(scroll) => { this.scroll = scroll }}
                                pageStart={0}
                                loadMore={this.getRewardsOnNext.bind(this)}
                                hasMore={this.state.hasMoreItem}
                            >
                                {this.state.rewardData.length > 0 ?
                                    <>{items}</> :
                                    <div id="noCoupon">
                                        <div className="couponItm d-flex al-i-center pd6 mb-20 pr-20">
                                            <div className="coupnCompny">
                                                <h4>No Coupons Found</h4>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </InfiniteScroll>
                        </div>

                    </div>
                </section>
                <Footer screen="home" page={"ACB_my_prizes"} />


                {/* <div className="couponPopup">
        <div className="couponPopupBg"></div>
        <div className="couponPopupBx">
            <a href="#" className="skpBtn pd10 ft-14">Skip</a>
            <div className="imgBx">
                <img src="images/logo-myntra.png" />
            </div>
            <h4 className="ft-16 col-blk coupon-txt mtb-15 mlr-auto lh-1pt3">Redeem your Myntra Coupon Worth <span className="col-red ftw-600">&#8377; 500</span></h4>
            <div className="clearfix"></div>
            <div className="txtCopyBx pos-rel">
                <span id="cpnCd" className="ftw-600 t-center">OGx87tjj</span>
                <div className="copyContnr"  onclick="copyToClipboard('#cpnCd')">
                    <input type="button" className="copyIcn" />
                    <span>COPY</span>
                </div>
            </div>
            <div className="copySts width-100p mb-10 d-none" style="display: none;">Copied</div>
            <div className="btnArea">
                <input type="button" className="btnStyl1 t-uppercase" value="Redeem" />
            </div>
            <span className="noteTxt d-block mt-10 lh-1pt3"><b>Benefits:</b> get Discount of `375. Valid on Eyeglasses & Sunglasses sections</span>
        </div>
    </div> */}

                {/* coupon popup */}
                {this.state.isShowCouponPopup ? <div className="couponPopup activePopup" id="poco${index}">
                    <div className="couponPopupBg"></div>
                    <div className="couponPopupBx ">


                        <div className="imgBx">
                            <img src={'logos/' + this.state.redeemCoupon.image.toLowerCase()} />
                        </div>
                        <h4 className="skip_txt" onClick={this.hideCouponPopup}>Close</h4>
                        {/* <div className="pop_close" onClick={this.hideCouponPopup}> <i className="fa fa-close"></i></div> */}

                        <h4 className="ft-16 col-blk coupon-txt mtb-15 mlr-auto lh-1pt3">Redeem your {this.state.redeemCoupon.partner_brand} coupon</h4>
                        <div className="clearfix"></div>
                        <div className="txtCopyBx pos-rel">
                            <span id="cpnCd" className="ftw-600 t-center">{this.state.redeemCoupon.code}</span>
                            <div className="copyContnr" >
                                <input type="button" className="copyIcn" onClick={() => this.copyToClipboard(this.state.redeemCoupon.code)} />
                                <span onClick={() => this.copyToClipboard(this.state.redeemCoupon.code)} >COPY</span>
                            </div>
                        </div>
                        <div className="clearfix"></div>

                        {this.state.isCopied == true ?
                            <div className="copySts width-100p mb-10">Copied</div> : null}

                        <h4>Valid till {"agreement_date" in this.state.redeemCoupon ? moment(this.state.redeemCoupon.agreement_date).format('Do MMM,YYYY') : "31st Oct,2020"}
                            {/* {moment(this.state.redeemCoupon.agreement_date).format('LL')} */}
                        </h4>
                        <p className="popup_note_footer"><span>Benefits:</span> {this.state.redeemCoupon.benefit}</p>
                        {"coupon_url" in this.state.redeemCoupon && this.state.redeemCoupon.coupon_url !== null ? <>
                            <div className="btnArea">
                                <button onClick={() => { this.sendTrack("acb_my_prizes_click", "My Prizes Clicks", "Redeem"); this.setState({ isShowCouponPopup: false }, () => { openAirtel(this.state.redeemCoupon.coupon_url) }) }} className="btn_red_lg">Redeem <img src="/agames/images/svg/right-arrow-white.svg" className="next_wht_arr"></img></button>
                            </div><br /></>
                            : null}
                        <div className="btnArea">
                            <Link to={baseUrl + "/"}><button onClick={() => { this.sendTrack("acb_my_prizes_click", "My Prizes Clicks", "Play more games") }} className="btn_red_lg">Play more games <img src="/agames/images/svg/right-arrow-white.svg" className="next_wht_arr"></img></button></Link>
                        </div>

                    </div>
                </div> : null}


                {/* prize popup for message*/}
                {this.state.isShowPrizePopup && this.state.address == "yes" ?
                    <div className="couponPopup activePopup" id="poco${index}">
                        <div className="couponPopupBg"></div>
                        <div className="couponPopupBx brdr_popup pos_rel">
                            <div className="imgBx">
                                <img src={this.state.prize_image} className="" />
                            </div>
                            <h4 className="skip_txt"
                                onClick={this.hidePrizePopup}
                            >Close</h4>
                            <h4 className="ft-16 col-blk coupon-txt mtb-15 mlr-auto lh-1pt3">You have already redeem the prize, we will deliver on your address.</h4>
                            <div className="clearfix"></div>
                            <div className="txtCopyBx">
                            </div>
                        </div>
                    </div> : null}


                {/* prize popup for Form*/}
                {this.state.isShowPrizePopup && this.state.address == "no" ?
                    <div className="couponPopup activePopup" id="profilepopup">
                        <div className="couponPopupBg"></div>
                        <div className="couponPopupBx brdr-rad12">
                            <div className="pop_close" onClick={this.hidePrizePopup}><i className="fa fa-close"></i></div>
                            {/* <h3 className="t-uppercase ft-20 ftw-600 col-blk">Change Username</h3> */}
                            <h4 className="ft-16 col-blk coupon-txt mtb-10 mlr-auto lh-1pt3 input_label">Enter Your PAN No</h4>
                            <div className="clearfix"></div>
                            <div className="">
                                <input id="userNm" type="text" className="input_modal" maxlength="10"
                                    name="pan_no" value={this.state.pan_no} onChange={this.formInputHandler}
                                />
                            </div>
                            {/* {this.state.invalid_pan_no ? <span style={{ color: "red" }}>Invalid Pan No</span> : null} */}
                            <span style={{ color: "red" }}>{this.state.errors["pan_no"]}</span>
                            <h4 className="ft-16 col-blk coupon-txt mtb-10  mlr-auto lh-1pt3 input_label">Enter Your Aadhar No</h4>
                            <div className="">
                                <input id="userNm" type="text" className="input_modal" maxlength="12"
                                    name="aadhar_no" value={this.state.aadhar_no} onChange={this.formInputHandler}
                                />
                            </div>
                            {/* {this.state.invalid_aadhar_no ? <span style={{ color: "red" }}>Invalid Aadhar No</span> : null} */}
                            <span style={{ color: "red" }}>{this.state.errors["aadhar_no"]}</span>

                            <h4 className="ft-16 col-blk coupon-txt mtb-10  mlr-auto lh-1pt3 input_label">Enter Your Address</h4>
                            <div className="">
                                <textarea id="userNm" className="input_textarea" rows="4" cols="50"
                                    name="full_address" value={this.state.full_address} onChange={this.formInputHandler}
                                />
                            </div>
                            {/* {this.state.invalid_address ? <span style={{ color: "red" }}>Invalid Address</span> : null} */}
                            <span style={{ color: "red" }}>{this.state.errors["full_address"]}</span>

                            <button className="btn_red_lg mb10" onClick={this.saveFormData} id="updateprofile" >SAVE
            <img src="/images/svg/right-arrow-white.svg" className="btnarrimg" />
                            </button>
                            {/* <div className="btnArea">
                         <input type="button" className="btnStyl1 playBtn t-uppercase" value="save" id="updateprofile"
                             onClick={this.saveFormData} id="updateprofile" />
                     </div> */}
                        </div>
                    </div>
                    : null}

                {/* Show message after submit form */}
                {this.state.isShowSubmitMsg ?
                    <div className="couponPopup activePopup" id="poco${index}">
                        <div className="couponPopupBg"></div>
                        <div className="couponPopupBx brdr_popup pos_rel">
                            <div className="imgBx">
                                <img src={this.state.prize_image} className="" />
                            </div>
                            <h4 className="skip_txt"
                                onClick={this.hidePrizePopupMessage}
                            >Close</h4>
                            <h4 className="ft-16 col-blk mlr-txt mtb-10 mlr-auto lh-1pt3 pop_title">You have successfully redeem the prize, we will deliver on your address.</h4>
                            {/* <div className="clearfix"></div>
                            <button className="btn_red_lg mb10" onClick={this.hidePrizePopupMessage} id="updateprofile" >CANCEL
                            <img src="/images/svg/right-arrow-white.svg" className="btnarrimg" />
                            </button> */}
                            <div className="txtCopyBx"></div>
                        </div>
                    </div> : null}



                {/* <Modal
                    size="lg"
                    show={this.state.isShowCouponPopup}
                    onHide={this.hideCouponPopup}
                    dialogClassName="modal-90w"
                >
                    <Modal.Body>
                        <div className="couponPopupBx brdr-rad12 pos_rel">
                            <div className="pop_close"> <i className="fa fa-close"></i></div>
                            <h4 className="ft-16 col-blk coupon-txt mtb-10 mlr-auto lh-1pt3 pop_title">{this.state.benifit}</h4>
                            <div className="clearfix"></div>
                            <div className="txtCopyBx">
                                <span id="cpnCd0" className="pop_copytxt">{this.state.code}</span>
                                <input type="button"

                                    className="copyIcn" />
                            </div>
                            <div className="copySts width-100p mb-10 d-none">Copied</div>
                        </div>
                    </Modal.Body>
                </Modal> */}



                {this.state.showTnc ? <div className="couponPopup activePopup" id="poco${index}">

                    <div className="couponPopupBg"></div>
                    <div className="couponPopupBx brdr_popup pos_rel tncpopup">
                        {/* <div className="imgBx">
                            <img src={this.state.prize_image} className="" />
                        </div> */}
                        <h4 className="skip_txt2"
                            onClick={this.toggleTnc}
                        >Close</h4>

                        <div className="scrollDiv">

                            <h4 className="ft-13 col-blk coupon-txt mtb-15 mlr-auto lh-1pt3">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: this.state.tncData
                                    }}></div>
                            </h4>
                        </div>
                        <div className="clearfix"></div>
                        <button className="btn_red_lg mb10" onClick={this.toggleTnc} id="updateprofile" >OK
                            <img src="images/svg/right-arrow-white.svg" className="btnarrimg" />
                        </button>
                        {/* <div className="txtCopyBx"></div> */}
                    </div>
                </div>
                    : null}

            </>
        )

    }
} 