import React, { Component } from 'react'

export default class InProgressScore extends Component {
    render() {
        return (
            <>
                <div id="in-progress-cs">
                    <strong className="mtchSt d-block">Play Status</strong>
                    <span className="matchVn d-block">
                        3rd T20I, Venue Name</span>
                    <div className="tmSt">
                        <div className="tmBr d-flex al-i-center playing">
                            <span className="tmFlg"><img src="images/nz-flag.png" /></span>
                            <span className="tmNm">New Zealand</span>
                            <span className="tmScr"><b>67/2</b> (8.0 ov)</span>
                            <span className="tmRr">CRR:8.38</span>
                        </div>
                        <div className="tmBr d-flex al-i-center">
                            <span className="tmFlg"><img src="images/ind-flag.png" /></span>
                            <span className="tmNm">India</span>
                            <span className="tmScr"><b>179/5</b> (20 ov)</span>
                            <span className="tmRr"></span>
                        </div>
                    </div>
                    <div className="mtchSts">
                        NZ need 113 runs in 72 balls at 9.41 rpo
                        </div>
                </div>
            </>
        )
    }
}
