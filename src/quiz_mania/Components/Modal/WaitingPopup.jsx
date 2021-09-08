import React from 'react';
// import '../../Assets/css/style.css'
import { NavLink } from 'react-router-dom';
import { baseUrl } from '../../../Config/Config'
export default class WaitingPopup extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="popup_overlay">
                                <div className="overPopupBg"></div>

                <div className="popup_body">
                    {/* <img src="/Assets/images/svg/close_black.svg" className="close_white" onClick={this.props.closePopup} /> */}
                    <h4 className="popup_title">Waiting!</h4>

                    <div className="loaderImg"><img src={`${baseUrl}/images/loader.svg`} /></div>

                </div>
            </div>
        );
    }

}

