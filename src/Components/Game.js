import React, { Component } from 'react'
import { baseURI } from "../Config/Config"
const URLS = {
    "fielder-challenge": "fielder",
    "super-cricket": "supercricket"
}
export default class Game extends Component {
    constructor(props) {
        super(props)
    }
    openAirtel = (id) => {
        let os = "DEFAULT";
        let userAgent = navigator.userAgent.toLowerCase();

        if (/android/i.test(navigator.userAgent.toLowerCase())) {
            os = "ANDROID";
        }

        if (/ipad|iphone|ipod/.test(userAgent)) {
            os = "IOS";
        }

        const prefix = {
            ANDROID: "myairtel://webview?au=",
            DEFAULT: "myairtel://webview?au=",
            IOS: "myairtel://webview?ax=",
        };
        let url = this.urlencode(`${baseURI}?screen=${URLS[id]}`)
        //window.open(`${prefix[os]}${url}`);
        console.log(url);
        window.open(`${url}`);
    }
    urlencode = (str) => {
        str = (str + '').toString();
      
        // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
        // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
        return encodeURIComponent(str)
          .replace('!', '%21')
          .replace('\'', '%27')
          .replace('(', '%28')
          .replace(')', '%29')
          .replace('*', '%2A')
        //   .replace('%20', '+');
      }
    render() {
        return (
            <>
                <div className="gmBx pos-rel of-hdn">
                    <div className="bgBx">
                        <img src={'images/' + this.props.banner} />
                    </div>
                    <div className="bxCont">
                        {/* <a href="#" onClick={()=>{this.openAirtel(this.props.id)}}> */}
                        <div className="gmBxImg of-hdn">
                            <img src={'images/' + this.props.banner} />
                        </div>
                        <div className="gmBxCont">
                            {/* <div className="gmBxTxt">Cricket</div> */}
                            <div className="gmBxTxthpl">{this.props.name}</div>
                            <div className="gmBxtBt"><span className="btnStyl1" onClick={() => this.props.toggleGamePopup(this.props.id, this.props.name, this.props.url)}>PLAY Now</span></div>
                        </div>
                        {/* </a> */}
                    </div>
                </div>

            </>
        )

    }
} 