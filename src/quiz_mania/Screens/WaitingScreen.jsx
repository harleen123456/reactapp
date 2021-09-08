import React from 'react';
// import '../Assets/css/style.css'
import { NavLink } from 'react-router-dom';
import { checkQuizStatus } from "../Services/Services"
export default class WaitingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.getRoomStatus = this.getRoomStatus.bind(this);
    }

    componentDidMount() {
        let room = JSON.parse(localStorage.getItem("current_quiz"));
        // let payload = {
        //     my_user_id: room.player1_id,
        //     p2_user_id: room.player2_id,
        //     room_code: room.room_code
        // }
        let payload = {
            "player1_id": room.player1_id,
            "player2_id": room.player2_id,
            "room_code": room.room_code
        }
        // console.log(payload)
        this.getRoomStatus(payload);

        //
    }
    async getRoomStatus(payload) {
        let response = await checkQuizStatus(payload);
        // console.log(response)
        if (response.status.err_cd === 0) {
            if (response.room.player2_joined && response.room.player1_joined) {

                this.props.history.push("/chalange-friends")
            } else {
                setTimeout(() => { this.getRoomStatus(payload); }, 10000)
            }
        }
    }
    render() {

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
                    <label className="input_label">Awaiting Confirmation</label>
                    <div className="meter">
                        <img src="/Assets/images/progress.gif" className="gif_ico" />
                        {/* <span style={{ width: '50%' }}></span> */}
                    </div>
                </div>
                <div className="btn_wrp">
                    {/* <button className="btn_gray">Next
                    <div className="white_arrow_circle">
                        <img src="/Assets/images/svg/right-arrow.svg" className="gray_arrow" />
                    </div>
                </button>
                   <NavLink to={'/opponent-confirmation'}> <button className="btn_red">Next
                    <div className="white_arrow_circle">
                            <img src="/Assets/images/svg/right-arrow-red.svg" className="gray_arrow" />
                        </div>
                    </button>
                    </NavLink>
                     */}
                </div>
            </div>
        );
    }

}

