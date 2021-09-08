import React from 'react';
// import '../../Assets/css/style.css'
import { NavLink } from 'react-router-dom';
import { baseUrl } from '../../../Config/Config'
export default class ContestJoinError extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="popup_overlay">
                <div className="overPopupBg"></div>
                <div className="popup_body">
                    {/* <h4 className="popup_title_pnk">Oops!</h4> */}
                    <h3 className="mt-10 mb-20 ft-24 ftw-600 col-blk">Oops!</h3>
                    <div className="clearfix"></div>
                    <div className="sorryImg">
                <img src="/agames/images/sorry-gfx.svg" />
            </div>
            <div className="ft-16 mb-15 mt-20 t-center">{this.props.err_msg}</div>
                    <button className="btn_red_lg mb10" onClick={this.props.close}>
                        {this.props.err_msg == "The game has already started" ? "Play more games" : "Ok"}
                        <img src={`${baseUrl}/images/svg/right-arrow-white.svg`} className="next_wht_arr" />
                    </button>
                </div>
            </div>
        );
    }

}

