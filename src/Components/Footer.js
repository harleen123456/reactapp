import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Link,
    Route
} from "react-router-dom";
import { Bling as GPT } from "react-gpt";
import $ from 'jquery';
import { baseUrl, aaTrackACB } from '../Config/Config'
GPT.enableSingleRequest();

export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            screen: this.props.screen || "",
            page: this.props.page || "",
            event: this.props.event || `acb_back_btn_clicked`
        }
    }
    sentEvent = () => {
        //aaTrackACB(this.state.event, "Back", "Acb_Back", this.state.page)
    }
    componentDidMount() {

        // $(function () {
        //     $(window).scroll(function () {
               
        //         if($(document).scrollTop() > 5 && !$('#div-gpt-ad-1600926956565-0').is(':visible')){
        //                 $('#div-gpt-ad-1600926956565-0').fadeIn()
        //             }else if($('#div-gpt-ad-1600926956565-0').is(':visible') && $(document).scrollTop() < 5){
        //                 $('#div-gpt-ad-1600926956565-0').fadeOut()
        //             }
        //     });
        // })


        if(navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {           
            $(window).scroll(function() {
                if ($(this).scrollTop()>0){
                    $('.footer_ad_sticky').addClass('actcls');
                 }
                else
                 {
                $('.footer_ad_sticky').removeClass('actcls');
                 }
             });
        }         
        else {
            $(window).scroll(function() {
                if ($(this).scrollTop()>0){
                    $('.footer_ad_sticky').addClass('actcls');
                 }
                else
                 {
                $('.footer_ad_sticky').removeClass('actcls');
                 }
             });
        }         
      }

       
    render() {
        let { screen } = this.state
        let ftrcls = null;
        if (screen !== "home") {
            ftrcls = 'btmLinks pd25'
        } else {
            ftrcls = 'btmLinks pd25'
        }
        return (

            <>


                <footer className={ftrcls}>
                    <div className="container2">
                        <ul className="d-flex jus-c-center">
                            <li><Link to={baseUrl + "/reward"}>FAQs</Link></li>
                            <li><Link to={baseUrl + "/reward"}>Terms &amp; Conditions</Link></li>
                        </ul>
                    </div>
                </footer>
                <div className="footer_ad_sticky">
                    {screen !== "home" ? <Link to={baseUrl + "/"} className={screen != "claim-prize" ? "bckhm" : "bckhm"} onClick={this.sentEvent()}>Back</Link> : null}

                    <div id='div-gpt-ad-1600926956565-0' className="stickyAd"  >
                        <GPT
                            adUnitPath="/1068322/NDTV_Airtel_IPL_APP_320x50_Sticky"
                            slotSize={[320, 50]}
                        />
                    </div>
                </div>

                {/* {screen !== "home" ? <Link to={baseUrl + "/"} className="bckhm2">Back</Link> : null} */}


            </>
        )

    }
}