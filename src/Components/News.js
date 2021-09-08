import React, { Component } from 'react'
import {openAirtel} from "../Config/Config"
export default class News extends Component {

    render() {
        return (
            <>
                <div className="newsItm brdr-rad12">
                    <div className="newsImgTtl d-flex">
                        <div className="newsImg pos-rel of-hdn"><a href="#"><img
                            src={this.props.image} /></a>
                        </div>
                        <div className="newsTtl">
                            <h3><a onClick={()=>{openAirtel(this.props.link)}} target="_blank">{this.props.title}</a></h3>
                        </div>
                    </div>
                    <div className="newsDesc">
                        <p>{this.props.description}</p>
                    </div>
                </div>


            </>
        )

    }
}