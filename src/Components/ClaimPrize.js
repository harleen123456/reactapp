import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import $ from 'jquery';
import { saveUserDeatils, checkPrize, saveUserData } from '../Services/Service';
import { url, baseUrl, aaTrackPageview, aaTrackACB } from '../Config/Config';
import ReactGA from "react-ga"

export default class ClaimPrize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            mobile: '',
            isShowLoader: false,
            points: localStorage.getItem("points"),
            username: localStorage.getItem("username"),
            highestScore: localStorage.getItem("highestScore"),
            errors: {},
            isShowMessagePop: false,
            address_image_name: "",
            photoId_image_name: "",
            pan_image_name: "",
            passportSize_image_name: "",
            //  screen_name: "claimprize"
            // address_image: null,
            // photoId_image: null,
            // pan_image: null,
            // passportSize_image: null

        }
        this.address_image = null
        this.photoId_image = null
        this.pan_image = null
        this.passportSize_image = null

    }

    formInputHandler = (event) => {
        let errors = this.state.errors;
        if (event.target.name == "name") {
            errors["name"] = "";
            this.setState({ name: event.target.value, errors: errors });
        }
        if (event.target.name == "email") {
            errors["email"] = "";
            this.setState({ email: event.target.value, errors: errors })
        }
        if (event.target.name == "mobile") {
            errors["mobile"] = "";
            this.setState({ mobile: event.target.value, errors: errors })
        }

    }
    imageInputHandler = (event) => {
        let errors = this.state.errors;
        if (event.target.name == "address_image") {
            errors["address_image"] = "";
            this.address_image = event.target.files[0]
            this.setState({ address_image_name: event.target.files[0].name, errors: errors })
        }
        if (event.target.name == "photoId_image") {
            errors["photoId_image"] = "";
            this.photoId_image = event.target.files[0]
            this.setState({ photoId_image_name: event.target.files[0].name, errors: errors })
        }
        if (event.target.name == "pan_image") {
            errors["pan_image"] = "";
            this.pan_image = event.target.files[0]
            this.setState({ pan_image_name: event.target.files[0].name, errors: errors })
        }
        if (event.target.name == "passportSize_image") {
            errors["passportSize_image"] = "";
            this.passportSize_image = event.target.files[0]
            this.setState({ passportSize_image_name: event.target.files[0].name, errors: errors })
        }
    }
    openFile = (value) => {
        if (value == "address-upload") {
            document.getElementById('address-upload').click();
        }
        if (value == "photo-id-upload") {
            document.getElementById('photo-id-upload').click();
        }
        if (value == "self-id-upload") {
            document.getElementById('self-id-upload').click();
        }
        if (value == "passport-photo-upload") {
            document.getElementById('passport-photo-upload').click();
        }

    }

    handleValidation() {
        let errors = {};
        let formIsValid = true;
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let result = isNaN(this.state.mobile);

        if (this.state.name == "") {
            formIsValid = false;
            errors["name"] = "Name must be filled out";
        }
        if (this.state.email == "") {
            formIsValid = false;
            errors["email"] = "Email must be filled out";
        }
        if (reg.test(this.state.email) == false) {
            formIsValid = false;
            errors["email"] = "Invalid Email";
        }
        if (this.state.mobile == "") {
            formIsValid = false;
            errors["mobile"] = "Mobile must be filled out";
        }
        if (this.state.mobile.length != 10) {
            formIsValid = false;
            errors["mobile"] = "Mobile No Must be 10 Digit";
        }
        if (result != false) {
            formIsValid = false;
            errors["mobile"] = "Invalid Mobile No";
        }

        // if (this.address_image == null) {
        //     formIsValid = false;
        //     errors["address_image"] = "Invalid Address Proof";
        // }
        // if (this.photoId_image == null) {
        //     formIsValid = false;
        //     errors["photoId_image"] = "Invalid Photo Id";
        // }
        // if (this.pan_image == null) {
        //     formIsValid = false;
        //     errors["pan_image"] = "Invalid Self Attested Pan Card";
        // }
        // if (this.passportSize_image == null) {
        //     formIsValid = false;
        //     errors["passportSize_image"] = "Invalid Passport Size Photo";
        // }

        this.setState({ errors: errors });
        return formIsValid;
    }

    saveFormData = async () => {
        // alert('hi')
        // this.setState({ isShowMessagePop: true })

        //const formData = new FormData();
        var accessToken = localStorage.getItem("accessToken");
        if (this.handleValidation()) {
            this.setState({ isShowLoader: true })
            //formData.append('addressProof', this.address_image);
            //formData.append('photoId', this.photoId_image);
            //formData.append('panCard', this.pan_image);
            //formData.append('passportPhoto', this.passportSize_image);
            let payload = {
                name : this.state.name, 
                email : this.state.email, 
                mobile : this.state.mobile
            }
            let res = await saveUserData(payload).catch(e=>{});
            console.log(res)
            if (res.success == true) {
                aaTrackACB("acb_my_prizes_click", "Claim Prize clicks", "Redeem", "Claim Prize")
                this.setState({ isShowMessagePop: true , isShowLoader: false})
            }else if(res.message === "address_already_updated"){
                this.setState({ isShowMessagePop: true , isShowLoader: false})
            }else{
                this.setState({ isShowLoader: false})
            }

            // let api_url = url + 'user/address'
            // fetch(api_url, {
            //     method: "POST",
            //     headers: {
            //         // "Accept": "application/json",
            //         // 'content-type': 'multipart/form-data',
            //         "accessToken": payload
            //     },
            //     body: {}
            // }).then(async (result) => {
            //     this.setState({ isShowLoader: false })
            //     result.json().then(async (res) => {
            //         this.setState({ isShowLoader: false })
            //         console.log(res)
            //         if (res.success == true) {
            //             aaTrackACB("acb_my_prizes_click", "Claim Prize clicks", "Redeem", "Claim Prize")
            //             this.setState({ isShowMessagePop: true })
            //         }
            //     })
            // })
        }

    }

    hideMessagePopup = () => {
        this.setState({ isShowMessagePop: false })
        this.props.history.push(baseUrl + "/")
    }

    goHome = () => {
        // this.setState({ isShowMessagePop: false })
        this.props.history.push(baseUrl + "/")
    }

    async componentDidMount() {
        document.title = "Prize Claim"
        ReactGA.pageview("Prize Claim");
        let token_id = localStorage.getItem("token_id")
        let username = localStorage.getItem("username")
        let user_id = localStorage.getItem("user_id")
        aaTrackPageview("pageview", "Claim Prize", "Claim Prize")
        $("html, body").animate({ scrollTop: 0 }, "slow");

        // api call to check user have prize or not
        this.setState({ isShowLoader: true })
        //reward/check    get
        // api call 
        let res = await checkPrize().catch(e=>{});
        
        if (res.success) {
            this.setState({ isShowLoader: false })
        } else {
            // show the popup
            this.setState({ notAllow: true, isShowLoader: false })

        }
    }

    render() {
        return (
            <>
                {/* Loader */}
                {this.state.isShowLoader == true ? <div className="loader_main">
                    <div className="loaderBg"></div>
                    <div className="loadingTXt">Loading...</div>
                    <div className="loader">Loading...</div>
                </div> : null}

                {/* Header */}
                <Header
                    points={this.state.points}
                    username={this.state.username}
                />

                {/* <section className="hstscr_section">
                    <div className="heighest_scrore_wrp2">
                        <h4>HIGHEST SCORE</h4>
                        <h2>{this.state.highestScore}</h2>
                    </div>
                </section> */}



                <section className="przClm">
                    <div className="container2" id="profilepopup">
                        <h1 className="width-80p ft-16 t-uppercase t-center mtb-20 mlr-auto ftw-600">Submit your details to claim the prize</h1>
                        <form>
                            <div className="fieldGroup">
                                <div className="pdlr10">
                                    <div className="fieldRow pos-rel mb-30">
                                        <input type="text" className="field" name="name" id="name" placeholder="Enter Name"
                                            value={this.state.name} onChange={this.formInputHandler} />
                                        <label for="name" className="floting-label ft-16">Name</label>
                                        <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                    </div>

                                    <div className="fieldRow pos-rel mb-30">
                                        <input type="email" className="field" name="email" id="email" placeholder="Enter Email"
                                            value={this.state.email} onChange={this.formInputHandler} />
                                        <label for="email" className="floting-label ft-16">Email</label>
                                        <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                                    </div>

                                    <div className="fieldRow pos-rel mb-20">
                                        <input type="tel" className="field" name="mobile" id="mobile" placeholder="Enter Mobile" maxlength="10"
                                            value={this.state.mobile} onChange={this.formInputHandler}
                                        />
                                        <label for="mobile" className="floting-label ft-16">Mobile</label>
                                        <span style={{ color: "red" }}>{this.state.errors["mobile"]}</span>
                                    </div>

                                    {/* <div className="fieldRow mb-20">
                                        <label for="address" className="ft-14 ftw-600 mb-10 d-block">Address Proof</label>
                                        <input id="address-upload" type="file" className="field"
                                            name="address_image" value={this.state.address_image} onChange={this.imageInputHandler} />
                                        <span className="fileBtn" onClick={() => this.openFile("address-upload")}>Upload</span>
                                        <span style={{ color: "red" }}>{this.state.errors["address_image"]}</span>
                                        <div className="" id="address-filename">{this.state.address_image_name}</div>
                                    </div> */}


                                    {/* <div className="fieldRow mb-20">
                                        <label for="photoid" className="ft-14 ftw-600 mb-10 d-block">Photo Id</label>
                                        <input id="photo-id-upload" type="file" className="field"
                                            name="photoId_image" value={this.state.photoId_image} onChange={this.imageInputHandler} />
                                        <span className="fileBtn" onClick={() => this.openFile("photo-id-upload")}>Upload</span>
                                        <div className="" id="photo-filename">{this.state.photoId_image_name}</div>
                                        <span style={{ color: "red" }}>{this.state.errors["photoId_image"]}</span>
                                    </div> */}

                                    {/* <div className="fieldRow mb-20">
                                        <label for="selfid" className="ft-14 ftw-600 mb-10 d-block">Self Attested Pan Card</label>
                                        <input id="self-id-upload" type="file" className="field"
                                            name="pan_image" value={this.state.pan_image} onChange={this.imageInputHandler} />
                                        <span className="fileBtn" onClick={() => this.openFile("self-id-upload")}>Upload</span>
                                        <div className="" id="self-filename">{this.state.pan_image_name}</div>
                                        <span style={{ color: "red" }}>{this.state.errors["pan_image"]}</span>
                                    </div> */}

                                    {/* <div className="fieldRow mb-20">
                                        <label for="pphoto" className="ft-14 ftw-600 mb-10 d-block">Passport Size Photo</label>
                                        <input id="passport-photo-upload" type="file" className="field"
                                            name="passportSize_image" value={this.state.passportSize_image} onChange={this.imageInputHandler} />
                                        <span className="fileBtn" onClick={() => this.openFile("passport-photo-upload")}>Upload</span>
                                        <div className="" id="passport-photo-filename">{this.state.passportSize_image_name}</div>
                                        <span style={{ color: "red" }}>{this.state.errors["passportSize_image"]}</span>
                                    </div> */}

                                </div>
                                <div className="fieldRow mt-30 mb-20">
                                    <input type="button" name="submit" onClick={this.saveFormData} id="updateprofile" className="width-100p submit-btn pd15 col-wht t-uppercase ftw-600 ft-16" value="Submit Details" />
                                </div>
                            </div>
                        </form>
                    </div>
                </section>

                {/* 
                <section className="couponsSec pd20 pt0">
                    <div className="" id="profilepopup">
                        <div className="couponPopupBx brdr-rad12">
                            <div className="">
                                <input id="userNm" type="text" className="input_modal" placeholder='Name'
                                    name="name" value={this.state.name} onChange={this.formInputHandler} />
                            </div>
                            <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

                            <div className="">
                                <input id="userNm" type="text" className="input_modal" placeholder='Email'
                                    name="email" value={this.state.email} onChange={this.formInputHandler} />
                            </div>
                            <span style={{ color: "red" }}>{this.state.errors["email"]}</span>

                            <div className="">
                                <input type='text' id="userNm" className="input_modal" placeholder='Mobile' maxlength="10"
                                    name="mobile" value={this.state.mobile} onChange={this.formInputHandler} />
                            </div>
                            <span style={{ color: "red" }}>{this.state.errors["mobile"]}</span>

                            <h4 className="ft-16 col-blk coupon-txt mtb-10 mlr-auto lh-1pt3 input_label">Address Proof</h4>
                            <div className="">
                                <input type="file" id="userNm" className="input_modal"
                                    name="address_image" value={this.state.address_image} onChange={this.imageInputHandler} />
                            </div>
                            <span style={{ color: "red" }}>{this.state.errors["address_image"]}</span>

                            <h4 className="ft-16 col-blk coupon-txt mtb-10 mlr-auto lh-1pt3 input_label">Photo Id</h4>
                            <div className="">
                                <input type="file" id="userNm" className="input_modal"
                                    name="photoId_image" value={this.state.photoId_image} onChange={this.imageInputHandler} />
                            </div>
                            <span style={{ color: "red" }}>{this.state.errors["photoId_image"]}</span>

                            <h4 className="ft-16 col-blk coupon-txt mtb-10 mlr-auto lh-1pt3 input_label">Self Attested Pan Card</h4>
                            <div className="">
                                <input type="file" id="userNm" className="input_modal"
                                    name="pan_image" value={this.state.pan_image} onChange={this.imageInputHandler} />
                            </div>
                            <span style={{ color: "red" }}>{this.state.errors["pan_image"]}</span>

                            <h4 className="ft-16 col-blk coupon-txt mtb-10 mlr-auto lh-1pt3 input_label">Passport Size Photo</h4>
                            <div className="">
                                <input type="file" id="userNm" className="input_modal"
                                    name="passportSize_image" value={this.state.passportSize_image} onChange={this.imageInputHandler} />
                            </div>
                            <span style={{ color: "red" }}>{this.state.errors["passportSize_image"]}</span>

                            <button className="btn_red_lg mb10" onClick={this.saveFormData} id="updateprofile">REDEEM</button>
                        </div>
                    </div>

                </section> */}

                {/* Show Message after Form Submit */}
                {this.state.isShowMessagePop ?
                    // <div className="couponPopup activePopup" id="profilepopup">
                    //     <div className="couponPopupBg"></div>
                    //     <div className="couponPopupBx brdr-rad12">
                    //         {/* <div className="pop_close" onClick={this.hideMessagePopup}><i className="fa fa-close"></i></div> */}
                    //         <div className="clearfix"></div>
                    //         <h4 className="tnxTxt">Thank You!</h4>
                    //         <h4 className="ft-16 col-blk mlr-txt mtb-10 mlr-auto lh-1pt3 pop_title">Your details have been submitted. Our partner will contact you for further details.</h4>
                    //         <button className="btn_red_lg mb10" onClick={this.hideMessagePopup}>Play More Games
                    //             <img src="images/svg/right-arrow-white.svg" className="btnarrimg" />
                    //         </button>
                    //     </div>
                    // </div>
<div class="couponPopup activePopup">
<div class="couponPopupBg"></div>
<div class="couponPopupBx predictBtn">
    {/* <a href="#" class="skpBtn pd10 ft-14">Skip</a> */}
   
    <div class="clearfix"></div>
    <h4 className="tnxTxt">Thank You!</h4>
    <span class="noteTxt d-block mb-20 lh-1pt3">Your details have been submitted. Our partner will contact you for further details.</span>
    <a class="btnArea btnStyl1" onClick={this.hideMessagePopup}>
        <span class="btnStyl1 d-inlnblk t-uppercase">play more games</span>
    </a>
</div>
</div>

                    : null}



                {this.state.notAllow ?
                    // <div className="couponPopup activePopup" id="profilepopup">
                    //     <div className="couponPopupBg"></div>
                    //     <div className="couponPopupBx brdr-rad12">
                    //         {/* <div className="pop_close"><i className="fa fa-close"></i></div> */}
                    //         <div className="clearfix"></div>
                    //         <h4 className="tnxTxt">Sorry!</h4>
                    //         <h4 className="ft-16 col-blk mlr-txt mtb-10 mlr-auto lh-1pt3 pop_title">You are not authorised to open this page. Play More Games and Win Exciting Prizes.</h4>

                    //         <button className="btn_red_lg mb10" onClick={this.goHome}>Play More Games
                    //             <img src="images/svg/right-arrow-white.svg" className="btnarrimg" />
                    //         </button>
                    //     </div>
                    // </div>

<div class="couponPopup activePopup">
<div class="couponPopupBg"></div>
<div class="couponPopupBx predictBtn">
    {/* <a href="#" class="skpBtn pd10 ft-14">Skip</a> */}
   
    <div class="clearfix"></div>
    <h4 className="tnxTxt">Sorry!</h4>
    <span class="noteTxt d-block mb-20 lh-1pt3">You are not authorised to open this page. Play More Games and Win Exciting Prizes.</span>
    <a class="btnArea btnStyl1" onClick={this.goHome}>
        <span class="btnStyl1 d-inlnblk t-uppercase">play more games</span>
    </a>
</div>
</div>

                    
                    : null}

                {/* Footer */}
                <Footer screen="claim-prize" page={"Claim Prize"} />
            </>
        )
    }
}
