import React, { Component } from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <div className="not_f_wrp">
        
        <img src="/Assets/images/not_found.png" className="not_found_anim"/> 
        <h5 className="not_found_atxt">Page Not Found</h5>
        <button className="btn_red btntxt_centrt">Reload</button>
        </div>
  
  );
  }
}
