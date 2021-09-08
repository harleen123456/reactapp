import React from 'react';
// import '../Assets/css/style.css'
import { NavLink } from 'react-router-dom';
import { aaTrackPageview } from '../../Config/Config'
import { sendInvite } from "../../Services/Service"
export default class InviteScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mobile_no: "",
            active: false,

        }
        this.handleInput = this.handleInput.bind(this)
        this.sendInvite = this.sendInvite.bind(this)

    }
    componentDidMount() {
        let username = localStorage.getItem("username")
        let token_id = localStorage.getItem("token_id")
        let user_id = localStorage.getItem("user_id")
        aaTrackPageview(user_id, token_id, "quiz_invite_friend", "Invite Friend", "Quiz Invite Friend")
    }
    async handleInput(e) {
        if (e.target.value.length <= 10 && !isNaN(e.target.value)) {
            let active = e.target.value.length == 10 ? true : false
            this.setState({ mobile_no: e.target.value, active })
        }

    }
    async sendInvite() {
        let { match, history } = this.props
        let user = JSON.parse(localStorage.getItem("quiz_user"))
        let { mobile_no } = this.state;
        let payload = {
            player1_team: match.params.team,
            player1_id: user.username,
            player2_id: mobile_no,
            my_user_id: "mani",
            p2_user_id: mobile_no
        }
        // console.log(payload)
        let response = await sendInvite(payload);
        // console.log(response)
        if (response.success === true) {
            localStorage.setItem("current_quiz", JSON.stringify({ ...response.room, player2_id: this.state.mobile_no, player1_id: user.username }))
            history.push('/chalange-friends');
        }
    }

    render() {
        let { active, mobile_no } = this.state
        return (
            <div className="select_team_container main_container">
                <div className='heading pt10'>
                    <div className="logo_wrp">
                        <img src="/Assets/images/quiz_logo.png" className="logo_img" />
                        <h6 className="chose_title">Enter Opponents Mobile <br />Number to Invite</h6>
                    </div>
                </div>
                <div className="img_tyu">
                    <img src="/Assets/images/tyu.png" />
                </div>
                <div className="input_label_wrp">
                    <label className="input_label">Friend's mobile Number</label>
                    <input className="input_form" value={mobile_no} onChange={this.handleInput} placeholder="" />
                </div>
                <div className="btn_wrp">

                    {active ? <button onClick={this.sendInvite} className="btn_red_lg">Next
                    <img src="/Assets/images/svg/right-arrow-white.svg" className="next_wht_arr" />

                        {/* <div className="white_arrow_circle">
                            <img src="/Assets/images/svg/right-arrow-red.svg" className="gray_arrow" />
                        </div> */}
                    </button>
                        : <button className="btn_gray">Next
                           <img src="/Assets/images/svg/right-arrow-white.svg" className="next_wht_arr" />
                            {/* <div className="white_arrow_circle">
                                <img src="/Assets/images/svg/right-arrow.svg" className="gray_arrow" />
                            </div> */}
                        </button>}
                </div>
            </div>
        );
    }

}

