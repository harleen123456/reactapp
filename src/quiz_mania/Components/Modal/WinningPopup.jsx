import React from 'react';
// import '../../Assets/css/style.css'
import { NavLink } from 'react-router-dom';
import { baseUrl } from '../../../Config/Config'

export default class WinningPopup extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let class_name = ""
        if (this.props.status == "won") {
            class_name = "popup_body winn_animation back_trans"
        } else {
            class_name = "popup_body non_win_animation"
        }
        return (
            <div className="popup_overlay">
                                <div className="overPopupBg"></div>

                <div className={class_name}>
                    {this.props.status == "tie" ? <div><h4 className="popup_title">Quiz Tied.</h4><h2 className="popup_title_detail">You both scored equal points. Let’s play tie breaker question to determine a winner.</h2> </div> : <div><h4 className="popup_title_pnk">{this.props.status == "won" ? "Hurray!" : "Sorry!"}</h4><h4 className="popup_title2">You {this.props.status == "won" ? "win" : "lose"}</h4></div>}
                    {/*{this.props.status == "won" ? window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "end", "optional": "1" }, "*") : null}*/}
                    {/*{this.props.status == "lost" ? window.parent.postMessage({ "constructId": localStorage.getItem("constructId"), "tokenId": localStorage.getItem("tokenId"), "gameID": "quizmania", "eventName": "end", "optional": "0" }, "*") : null}*/}
                    {this.props.status == "won" ? <button className="btn_red_lg mb10" onClick={this.props.handleWinpopup}>
                        Play Again
                    <img src={`${baseUrl}/images/svg/right-arrow-white.svg`} className="next_wht_arr" />
                    </button> : null}
                    {this.props.status == "lost" ? <div className="btnete">
                        <button className="btn_red_lg mb10" onClick={this.props.handleTryAgain}>
                            Play Again
                    <img src={`${baseUrl}/images/svg/right-arrow-white.svg`} className="next_wht_arr" />
                        </button></div> : null}
                </div>
            </div>
        );
    }

}

