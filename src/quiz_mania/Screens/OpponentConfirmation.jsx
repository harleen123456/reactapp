import React from 'react';
// import '../Assets/css/style.css'
import { NavLink } from 'react-router-dom';
import { confirmInvite } from "../Services/Services"
var otpArray = ["", "", "", "", "", ""]
export default function OpponentConfirmation(props) {
    let input1 = React.createRef();
    let input2 = React.createRef();
    let input3 = React.createRef();
    let input4 = React.createRef();
    let input5 = React.createRef();
    let input6 = React.createRef();

    const [otp1, setOtp1] = React.useState("")
    const [otp2, setOtp2] = React.useState("")
    const [otp3, setOtp3] = React.useState("")
    const [otp4, setOtp4] = React.useState("")
    const [otp5, setOtp5] = React.useState("")
    const [otp6, setOtp6] = React.useState("")
    React.useEffect(() => {
        input1.focus();
    }, []);

    const myChangeHandler = (event, index) => {
        if (event.target.value.length > 1) {
            return;
        }
        otpArray[index] = event.target.value
        if (index == 0) {
            setOtp1(event.target.value)
            if (event.target.value)
                input2.focus();
        } else if (index == 1) {
            setOtp2(event.target.value)
            if (event.target.value)
                input3.focus();
            else
                input1.focus()
        }
        else if (index == 2) {
            setOtp3(event.target.value)
            if (event.target.value)
                input4.focus();
            else
                input2.focus()
        }
        else if (index == 3) {
            setOtp4(event.target.value)
            if (event.target.value)
                input5.focus();
            else
                input3.focus()
        }
        else if (index == 4) {
            setOtp5(event.target.value)
            if (event.target.value)
                input6.focus();
            else
                input4.focus()
        }
        else if (index == 5) {
            setOtp6(event.target.value)
            if (event.target.value == "")
                input5.focus()
        }
    }
    const joinQuiz = async () => {
        let user = JSON.parse(localStorage.getItem("quiz_user"))
        let payload = {
            user_id: user.username,
            room_code: otpArray.join("")
        }
        console.log(payload)
        let response = await confirmInvite(payload);
        console.log(response)
        if (response.status.err_cd === 0) {
            localStorage.setItem("current_quiz", JSON.stringify(response.room))
            props.history.push("/team-selection")
        }
    }
    return (
        <div className="select_team_container main_container ">
            <div className='heading pt10'>
                <div className="logo_wrp">
                    <img src="/Assets/images/quiz_logo.png" className="logo_img" />
                    <h6 className="chose_title">Opponent Confirmation Code</h6>
                </div>
            </div>
            <div className="img_tyu">
                <img src="/Assets/images/tyu.png" />
            </div>
            <div className="input_label_wrp">
                <label className="input_label">Opponent' Confirmation Code</label>
                <div className="code_wrp">
                    <input value={otp1} min={1} type="number" onChange={(input) => myChangeHandler(input, 0)} className="input_form_code" placeholder="0" maxLength="1" ref={(input) => { input1 = input; }} />
                    <input value={otp2} min={1} type="number" onChange={(input) => myChangeHandler(input, 1)} className="input_form_code" placeholder="0" maxLength="1" ref={(input) => { input2 = input; }} />
                    <input value={otp3} min={1} type="number" onChange={(input) => myChangeHandler(input, 2)} className="input_form_code" placeholder="0" maxLength="1" ref={(input) => { input3 = input; }} />
                    <input value={otp4} min={1} type="number" onChange={(input) => myChangeHandler(input, 3)} className="input_form_code" placeholder="0" maxLength="1" ref={(input) => { input4 = input; }} />
                    <input value={otp5} min={1} type="number" onChange={(input) => myChangeHandler(input, 4)} className="input_form_code" placeholder="0" maxLength="1" ref={(input) => { input5 = input; }} />
                    <input value={otp6} min={1} type="number" onChange={(input) => myChangeHandler(input, 5)} className="input_form_code" placeholder="0" maxLength="1" ref={(input) => { input6 = input; }} />
                </div>
            </div>
            <div className="btn_wrp">
                {/* <button className="btn_gray">Next
                    <div className="white_arrow_circle">
                        <img src="/Assets/images/svg/right-arrow.svg" className="gray_arrow" />
                    </div>
                </button> */}
                <button className="btn_red_lg" onClick={joinQuiz}>Next
                    {/* <div className="white_arrow_circle">
                        <img src="/Assets/images/svg/right-arrow-red.svg" className="gray_arrow" />
                    </div> */}
                </button>

            </div>
        </div>
    );
}

