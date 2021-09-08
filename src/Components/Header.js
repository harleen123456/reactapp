import React, { Component } from 'react';
import $ from 'jquery';
// import React, { useState } from "react";

import { Bling as GPT } from "react-gpt";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {
BrowserRouter as Router,
        Link,
        Route
        } from "react-router-dom";
import { baseUrl, baseURI, openAirtel, aaTrackACB } from '../Config/Config'

//import Modal from 'react-bootstrap/Modal';
import { updateUsername } from '../Services/Service';
import About from '../Components/About';
        GPT.enableSingleRequest();
export default class Header extends Component {
constructor(props) {
super(props);
        this.state = {
        screen: this.props.screen || "",
                isShowProfile: false,
                isShowProfilePopup: false,
                input_username: localStorage.getItem("username"),
                username: localStorage.getItem("username"),
                inavlid_username: false,
                username_already_taken: false,
                isShowLoader: false,
                isShowDrawer: false,
                points: localStorage.getItem("points"),
                intervalz: 3000
        }


}

static getDerivedStateFromProps(nextProps, prevState) {
// do things with nextProps.someProp and prevState.cachedSomeProp
return {
points: localStorage.getItem("points")
        // ... other derived state properties
};
}

showProfile = () => {
this.setState({ isShowProfile: true });
        //$('.usrNmDp').next().stop('false, true').slideDown('fast', function () { $('.usrNmDp').next().removeClass('activeMenu'); }); 
        // $('.usrNmDp').next().stop(true, false).slideToggle().toggleClass('activeMenu');
        // function closeDpMenu() { $('.usrNmDp').next().slideUp('fast'); $('.usrNmDp').removeClass('activeMenu'); }
        // $(document.body).click(function (e) { closeDpMenu(); });
        $('.usrNmDp').click(function () { $(this).next().stop('false, true').slideToggle('fast', function () { $(this).prev().toggleClass('activeMenu') }); return false; });
        function closeDpMenu() { $('.usrNmDp').next().slideUp('fast'); $('.usrNmDp').removeClass('activeMenu'); }

$(document.body).click(function (e) { closeDpMenu(); });
        $(this).next('.user-login-box-m').click(function (e) { e.stopPropagation(); });
}
showProfilePopup = () => {
this.setState({ isShowProfilePopup: true, username_already_taken: false, inavlid_username: false });
        // $('.user-login-box-m').hide();

        if ('sendTrack' in this.props) {
// send the event
this.props.sendTrack('Acb_account');
}

}
hideProfilePopup = () => {
this.setState({ isShowProfilePopup: false, input_username: localStorage.getItem("username") });
        if ('sendTrack' in this.props) {
// send the event
this.props.sendTrack('close');
}
}
inputUsernameHandler = (event) => {
if (event.target.name == "input_username") {
this.setState({ input_username: event.target.value })
}
}
showDrawer = () => {
this.setState({ isShowDrawer: !this.state.isShowDrawer })

}

componentDidMount() {

var div_top = 0;
        if (window.location.pathname != baseUrl + '/show-reward') {
div_top = $('.btnBox').offset().top;
}


$(window).scroll(function () {
var window_top = $(window).scrollTop() - 84;
        if (window_top > div_top) {
if (!$('.btnBox').is('.activeCls')) {
$('.btnBox').addClass('activeCls');
}
} else {
$('.btnBox').removeClass('activeCls');
}

// var window_top2 = $(window).scrollTop();
// var dvtop = $('#tbsBoxtouch').offset().top-85;
// if (window_top2 > dvtop) {
//     $('#tbsBox').addClass('activeCls');
// } else {
//     $('#tbsBox').removeClass('activeCls');
// }




});
}
setNewUsername = async () => {
let old_username = localStorage.getItem("username")
        if ('sendTrack' in this.props) {
// send the event
this.props.sendTrack('Acb_save_changes');
}
if (this.state.input_username !== "") {
if (old_username !== this.state.input_username) {
this.setState({ isShowLoader: true })
        let payload = {
        username: this.state.input_username
        }
let response = await updateUsername(payload);
        if (response.success == true) {
this.setState({
isShowProfilePopup: false, username_already_taken: false,
        username: this.state.input_username, inavlid_username: false, isShowLoader: false
})
        localStorage.setItem('username', this.state.input_username);
        console.log("props", this.props)
        if ('refreshUserName' in this.props) {
this.props.refreshUserName(this.state.input_username)
}
} else {
this.setState({ isShowLoader: false })
        if (response.data.message == "username_already_taken") {
this.setState({ username_already_taken: true, inavlid_username: false })
}
if (response.data.message == "invalid_userName") {
this.setState({ username_already_taken: false, inavlid_username: true })
}
}
} else {
this.setState({ isShowProfilePopup: false })
}
} else {
this.setState({ inavlid_username: true, username_already_taken: false, input_username: localStorage.getItem("username") })
}
}

clickLogo = () => {
if ('sendTrack' in this.props) {
// send the event
this.props.sendTrack('Back');
}
}

clickHow = () => {
if ('sendTrack' in this.props) {
// send the event
this.props.sendTrack('How To Play');
}

}
clickTotalPoints = () => {
if ('sendTrack' in this.props) {
// send the event
this.props.sendTrack('Total Points');
}

}

clickMyPrize = (e, url) => {
e.preventDefault();
        openAirtel(url)
        if ('sendTrack' in this.props) {

// send the event
this.props.sendTrack('My Prizes');
}
}

clickBanner = (slide = '') => {
aaTrackACB("acb_home_click", "Home Page Banner Clicks", 'Banner' + slide, "ACB_homepage");
}

// const [intervalz, setIntervalz] = useState(3000); //initial state here represents the interval for first image.

//  intrvl= ()=> {  [intervalz, setIntervalz] = useState(3000);}

slideinterval = (index, item) => {
this.setState({
intervalz: item.props["data-interval"]
})
        // setIntervalz(item.props["data-interval"]);
}




render() {

return (
        <>
{this.state.isShowLoader == true ? <div className="loader_main">
    <div className="loaderBg"></div>
    <div className="loadingTXt">Loading...</div>
    <div className="loader">Loading...</div>
</div> : null}

{/* <div className="top-back">
 <div className="container d-flex al-i-center">
 <Link to={baseUrl + "/"} className="bckArw"></Link> <span className="">Airtel Cricket Bonanza</span>
 </div>
 </div> */}

<div className="clearfix"></div>
<header className="topHdr">
    <div className="container d-flex jus-s-between al-i-center pd15">
        <div className="logo-box">
            <Link to={baseUrl + "/"} className="bckArw" onClick={this.clickLogo}><img src="images/logo-airtel.png" /></Link>
        </div>
        <div className="user-login-box pos-rel">

            <div className="usrNmDp d-flex al-i-center" onClick={this.showProfile}>
                <img src="images/user-img.png" />
                <span className="usrNm" id="user_name">{this.state.username}</span>
            </div>

            {/* {this.state.screen !== "home" ? <Link to={baseUrl + "/"} className=" bckhm">Back</Link> : null} */}

            {this.state.isShowProfile == true ? <div className="user-login-box-m of-hdn" style={{ 'display': 'block' }}>
                {/* <div className="user-login-box-m"> */}
                <ul>
                    <li className="profile_popup" onClick={this.showProfilePopup}><a>Profile</a></li>
                    {/* <!-- <li><a href="index.html" id="lgt">Logout</a></li> --> */}
                </ul>
            </div> : null}
        </div>
    </div>
</header>




{window.location.pathname == baseUrl + '/show-reward' ? null : <> <section className="slideShow mt-5">
    <div className="">
        <div className="swiper-container" id="slidr">
            <div className="swiper-wrapper carousel">
            <span className="spanAds">Advertisement</span>

                {/* <Carousel onChange={this.slideinterval} showArrows={false} showStatus={false} autoPlay infiniteLoop showThumbs={false} interval={this.state.intervalz}
                 infiniteLoop={true} > */}

                <div className="swiper-slide slideAd  slideNum" data-interval={6000}>
                    <div id="div-gpt-ad-1599470843941-2" >

                        <GPT
                            adUnitPath="/1068322/NDTV_Airtel_IPL_APP_300x250ATF"
                            slotSize={[300, 250]}
                            />
                    </div>
                </div>

                {/* <div data-interval={3000} onClick={() => this.clickBanner('Play and Win Royal Classic Enfield')}>
                 <img src="images/1.png" />
                 </div>
                 
                 
                 <div data-interval={3000} onClick={() => this.clickBanner('Play and Win Exciting Prizez')}>
                 <img src="images/2.png" />
                 </div> */}

                {/* </Carousel> */}
            </div>
        </div>

    </div>
</section>

<div id="btnBoxtouch"></div>
<section className="btnBox mt-15" id="btnBox">
    <div className="container2 pdtb6">
        <ul className="d-flex jus-s-between t-center t-uppercase">
            <li><Link to={baseUrl + "/reward"} onClick={this.clickHow}><i className="iconBx htp-icn"></i>How to play<i className="arwRyt"></i></Link></li>
            {/* <li><a onClick={(e) => { e.preventDefault(); openAirtel(baseURI + "?screen=myprize") }}><i className="iconBx prz-icn"></i>My Prizes<i className="arwRyt"></i></a></li> */}


            <li><a onClick={(e) => this.clickMyPrize(e, baseURI + "?screen=myprize")}><i className="iconBx prz-icn"></i>My Prizes<i className="arwRyt"></i></a></li>

            <li><a onClick={(e) => { e.preventDefault(); openAirtel(baseURI + "?screen=leaderboard"); this.clickTotalPoints() }}><i className="numbr-blk d-flex jus-c-center al-i-center">{this.state.points}</i>Total Points<i className="arwRyt"></i></a></li>
        </ul>
    </div>
    {window.location.pathname == baseUrl + '/reward' ? <div className="hs_Rw d-flex jus-s-between">
        <span>Highest Score</span>
        <span className="ftw-600">{localStorage.getItem('highestScore')}</span>
    </div> : null}


</section>
</>
}

{/* Drawer */}
{this.state.isShowDrawer == true ? <About closeDrawer={this.showDrawer} /> : null}

{/* profile popup  */}

{this.state.isShowProfilePopup ? <>
{/* <div className="couponPopup activePopup" id="profilepopup">
 <div className="couponPopupBg"></div>
 <div className="couponPopupBx brdr-rad12">
 
 
 <a href="#" className="skpBtn pd10 ft-14" onClick={this.hideProfilePopup}>Skip</a>
 <h3 className="t-uppercase ft-20 ftw-600 col-blk">Change Username</h3>
 <h4 className="ft-16 col-blk coupon-txt mtb-10 width-80p mlr-auto lh-1pt3">Enter Your Username</h4>
 <div className="clearfix"></div>
 <div className="txtCopyBx inpFld mt-20_h">
 <input id="userNm" type="text" className="inputFld ft-16 t-center" maxlength="10"
 name="input_username" value={this.state.input_username} onChange={this.inputUsernameHandler} />
 </div>
 {this.state.inavlid_username == true ? <span className="usrtkn" id="msg">Invalid Username</span> : null}
 {this.state.username_already_taken == true ? <span className="usrtkn" id="msg">Username Already Taken</span> : null}
 <div className="btnArea hmp">
 <input type="button" className="btnStyl1 playBtn t-uppercase" value="save changes" id="updateprofile"
 onClick={this.setNewUsername} id="updateprofile" />
 </div>
 </div>
 </div> */}


<div className="popup activePopup" id="profilepopup">
    <div className="popupBg"></div>
    <div className="popupBx  brdr-rad12 ">
        <a href="#" className="skpBtn pd10 ft-14" onClick={this.hideProfilePopup}>Close</a>
        <h3 className="t-uppercase ft-20 ftw-600 col-blk">Change Username</h3>

        <h4 className="ft-16 col-blk coupon-txt mt-10 mb-10 mlr-auto lh-1pt4">Enter Your Username</h4>
        <div className="clearfix"></div>
        <span className="noteTxt d-block mb-10 lh-1pt3"><input id="userNm" type="text" className=" usernameFld ft-16 t-center" maxLength="10"
                                                               name="input_username" value={this.state.input_username} onChange={this.inputUsernameHandler} /></span>
        {this.state.inavlid_username == true ? <span className="usrtkn  d-block mb-10" id="msg">Invalid Username</span> : null}
        {this.state.username_already_taken == true ? <span className="usrtkn  d-block mb-10" id="msg">Username Already Taken</span> : null}
        <a className=" btnArea btnStyl1 pt10 d-block">
            <span className="btnStyl1 d-inlnblk t-uppercase" id="updateprofile" onClick={this.setNewUsername} >save changes</span>
        </a>
    </div>
</div>
</> : null}

{/* <Modal
 size="lg"
 show={this.state.isShowProfilePopup}
 onHide={this.hideProfilePopup}
 dialogClassName="modal-90w"
 >
 <Modal.Body>
 <div
 id="profilepopup">
 <div className="couponPopupBg"></div>
 <div className="couponPopupBx brdr-rad12">
 <h3 className="t-uppercase ft-20 ftw-600 col-blk">Change Username</h3>
 <h4 className="ft-16 col-blk coupon-txt mtb-10 width-80p mlr-auto lh-1pt3">Enter Your Username</h4>
 <div className="clearfix"></div>
 <div className="txtCopyBx inpFld">
 <input id="userNm" type="text" className="inputFld ft-16 t-center" maxlength="10"
 name="input_username" value={this.state.input_username} onChange={this.inputUsernameHandler} />
 </div>
 <span className="usrtkn" id="msg"></span>
 <div>
 <input type="button" className="btnStyl1 playBtn t-uppercase" value="save changes"
 onClick={this.setNewUsername} id="updateprofile" />
 </div>
 </div>
 </div>
 </Modal.Body>
 </Modal> */}

</>
)

}
}