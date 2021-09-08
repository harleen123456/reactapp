import React from 'react';
// import '../../Assets/css/style.css'
import { NavLink } from 'react-router-dom';
import { baseUrl } from '../../../Config/Config'

export default class SocialSharePopup extends React.Component {
    constructor(props) {
        super(props)
    }
    handleShare = () => {
        let os;

        let userAgent = navigator.userAgent.toLowerCase();

        if (/android/i.test(navigator.userAgent.toLowerCase())) {
            os = "ANDROID";
        }

        if (/ipad|iphone|ipod/.test(userAgent)) {
            os = "IOS";
        }

        const prefix = {
            ANDROID: "mail",
            IOS: "email",
        };

        
        this.props.handleShare(prefix[os])
        // export const openUrl = (url, option) => {
        //     window.open(`${prefix[os] + url}`, option);
        // };
    }
    render() {
        return (
            <div className="popup_overlay">
                <div className="overPopupBg"></div>
                <div className="popup_body">
                    {/* <h4 className="popup_title_pnk">Oops!</h4> */}
                    <div className="clearfix"></div>
                    <div className="socialshare_dv">
                        <div className="ft-16 mb-15 mt-20 t-center" onClick={() => this.props.handleShare("twitter")}><img src={`${baseUrl}/images/twitter_ic.svg`} className="social_ic" /></div>
                        {/* <div className="ft-16 mb-15 mt-20 t-center" onClick={() => this.props.handleShare("fbPost")}><img src={`${baseUrl}/images/facebook_ic.svg`} className="social_ic" /></div> */}
                        <div className="ft-16 mb-15 mt-20 t-center" onClick={() => this.props.handleShare("whatsapp")}><img src={`${baseUrl}/images/whatsapp_ic.svg`} className="social_ic" /></div>
                        <div className="ft-16 mb-15 mt-20 t-center" onClick={() => this.props.handleShare("sms")}><img src={`${baseUrl}/images/sms_ic.svg`} className="social_ic" /></div>
                        {/* <div className="ft-16 mb-15 mt-20 t-center" onClick={() => this.props.handleShare("fbmessenger")}><img src={`${baseUrl}/images/facebook_mes_ic.svg`} className="social_ic" /></div> */}
                        <div className="ft-16 mb-15 mt-20 t-center" onClick={() => this.handleShare()}><img src={`${baseUrl}/images/mail_ic.svg`} className="social_ic" /></div>
                    </div>
                    <button className="btn_red_lg mb10" onClick={this.props.close}>
                        Close
                        <img src={`${baseUrl}/images/svg/right-arrow-white.svg`} className="next_wht_arr" />
                    </button>
                </div>
            </div>
        );
    }

}

