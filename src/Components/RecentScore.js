import React, { Component } from 'react'

export default class RecentScore extends Component {
    render() {
        return (
            <>
                <div id="recent-cs">
                    <strong className="mtchSt d-block">Match Ended</strong>
                    <span className="matchVn d-block">
                        Greater Noida , Mar 10, 2020
                        </span>
                    <div className="tmSt">
                        <div className="tmBr d-flex al-i-center">
                            <span className="tmFlg"><img src="images/nz-flag.png" /></span>
                            <span className="tmNm">Afghanistan</span>
                            <span className="tmScr"><b>142/7 </b> (20.0/20)</span>
                            <span className="tmRr"></span>
                        </div>
                        <div className="tmBr d-flex al-i-center">
                            <span className="tmFlg"><img src="images/ind-flag.png" /></span>
                            <span className="tmNm">Ireland</span>
                            <span className="tmScr"><b>142/8</b> (20.0/20)</span>
                            <span className="tmRr"></span>
                        </div>
                    </div>
                    <div className="mtchSts">
                        Ireland tied with Afghanistan (Ireland win Super Over by 1 wicket)
                        </div>
                </div>
            </>
        )
    }
}
