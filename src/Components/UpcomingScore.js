import React, { Component } from 'react'

export default class UpcomingScore extends Component {
    render() {
        return (
            <>
                <div id="upcoming-cs">
                    <strong className="mtchSt d-block"></strong>
                    <span className="matchVn d-block">
                        Shere Bangla National Stadium, Mirpur, Mar 11, 2020
                        </span>
                    <div className="tmSt">
                        <div className="tmBr d-flex al-i-center playing">
                            <span className="tmFlg"><img
                                src="https://sdata.ndtv.com/sportz/Sportz/cricket/flags/2.png" /></span>
                            <span className="tmNm">Bangladesh</span>
                            <span className="tmScr"><b></b></span>
                            <span className="tmRr"></span>
                        </div>
                        <div className="tmBr d-flex al-i-center">
                            <span className="tmFlg"><img
                                src="https://sdata.ndtv.com/sportz/Sportz/cricket/flags/10.png" /></span>
                            <span className="tmNm">Kenya</span>
                            <span className="tmScr"><b></b> </span>
                            <span className="tmRr"></span>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}
