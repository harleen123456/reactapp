import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import $ from 'jquery';
import { getLeaderboard } from '../Services/Service';
import { baseUrl, aaTrackPageview } from '../Config/Config';
import ReactGA from "react-ga"
export default class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaderboardData: [],
            isShowLoader: true,
            points: localStorage.getItem("points"),
            username: localStorage.getItem("username"),
            userObj: {},
            updated_username: localStorage.getItem('username')
        }
    }
    refreshUserName = (data) => {
        this.setState({ updated_username: data })
    }

    async componentDidMount() {
        let ldr_frm = localStorage.getItem("ldr_frm");
        document.title = "Leaderboard"
        let paganame = `Leaderboard | ${ldr_frm === "true" ? "View Detail" : "Total Points"}`
        ReactGA.pageview(paganame);
        localStorage.setItem("ldr_frm", false);
        aaTrackPageview("pageview", "Leaderboard", paganame)
        $("html, body").animate({ scrollTop: 0 }, "slow");

        let res = await getLeaderboard()
        if (res.success == true) {
            this.setState({ leaderboardData: res.data.item, userObj: res.data.user, isShowLoader: false })
        }
    }

    render() {
        return (
            <>
                {this.state.isShowLoader == true ? <div className="loader_main">
                    <div className="loaderBg"></div>
                    <div className="loadingTXt">Loading...</div>
                    <div className="loader">Loading...</div>
                </div> : null}
                <Header
                    screen="home"
                    points={this.state.points}
                    username={this.state.username}
                    refreshUserName={this.refreshUserName}
                />

                <section className="ldrboard mt-30 ldrboardinner" >
                    <div className="container2">
                        <div className="d-flex jus-s-between al-i-center">
                            <h2 className="widgtTtl1">Leaderboard</h2>
                            {/* <div className="btnRyt redBg" id="findme"
                            // style={{display: "none"}}
                            >
                                <a href="#myId" className="btnFindme">Find Me</a>
                            </div> */}
                        </div>
                        <div className="tablStyl1 mb-20 mt-30 brdr-rad12 col2">

                            <div className="topRow d-flex jus-s-between brdr-rad8 pd10 pos-rel">
                                <div>
                                    <span className="d-block">{this.state.updated_username}</span>
                                    <span className="d-block">YOUR AVTAR</span>
                                </div>
                                <div>
                                    <span className="d-block">
                                        <span className="crcl d-flex al-i-center jus-c-center">{this.state.userObj.rank}</span>
                                    </span>
                                    <span className="d-block">Your Rank</span>
                                </div>
                                <div className="t-right">
                                    <span className="d-block">{this.state.userObj.points}</span>
                                    <span className="d-block">Score</span>
                                </div>
                            </div>


                            <table className="tablStyl1 mb-20 mt-10 brdr-rad12" cellPadding="0" cellSpacing="0" width="100%">

                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>&nbsp;</th>
                                        <th>Avtar Name</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody id="leader-board">
                                    {this.state.leaderboardData.length > 0 ?
                                        this.state.leaderboardData.map((data, index) => {

                                            let showClass = null;
                                            if (data.rank == "1" || data.rank == "2" || data.rank == "3") {
                                                showClass = 'active'
                                            } else {
                                                showClass = 'active ft-12'
                                            }

                                            return (<tr className={showClass} id="id" key={index}>

                                                    {data.rank == "1" ? <td className="orange1">{data.rank}</td> :
                                                        data.rank == "2" ? <td className="grey1">{data.rank}</td> :
                                                            data.rank == "3" ? <td className="orange2">{data.rank}</td> : <td className="">{data.rank}</td>}

                                                    <td>{data.rank == "1" ? <img src={"images/svg/award-1.svg"} className="tbl_ico" /> :
                                                        data.rank == "2" ? <img src={"images/svg/award-2.svg"} className="tbl_ico" /> :
                                                            data.rank == "3" ? <img src={"images/svg/award-3.svg"} className="tbl_ico" /> : <img src={"images/svg/award.svg"} className="tbl_ico" />}</td>

                                                    <td className="transform-cap">{data.userName}</td>

                                                    {data.rank == "1" ? <td className="cup_brown_active orange1">{data.points}</td> :
                                                        data.rank == "2" ? <td className="cup_brown_active grey1">{data.points}</td> :
                                                            data.rank == "3" ? <td className="cup_brown_active orange2">{data.points}</td> : <td className="cup_brown_active">{data.points}</td>}


                                                    {/* <td className="cup_brown_active">{data.points}</td> */}
                                                </tr>)
                                        }) : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                <Footer screen="home" page={"Leaderboard"} />
            </>
        )

    }
}