import React, { Component } from 'react';
import $ from 'jquery';
// import 'slider.min.js';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class FullScoreCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: this.props.notes,
            innings: this.props.innings,
            matchdetail: [],
            teams: [],
            show1st: this.props.show1st,
            show2nd: this.props.show2nd,
            pointsTableData : this.props.pointsTableData,
            playerFilAndBatData : this.props.playerFilAndBatData,
            playerBowlingData : this.props.playerBowlingData
            
        }
    }

    static getDerivedStateFromProps(props, state) {
        console.log("props",props)
        state.notes = props.notes
        state.innings = props.innings
        state.matchdetail = props.matchdetail
        state.teams = props.teams
        state.pointsTableData = props.pointsTableData
        state.playerFilAndBatData = props.playerFilAndBatData
        state.playerBowlingData = props.playerBowlingData
        
        return state
    }

    componentDidMount() {
    }
    tabClick = (value) => {
        if (value == "1st") {
            this.setState({ show1st: true, show2nd: false })
        }
        if (value == "2nd") {
            this.setState({ show2nd: true, show1st: false })
        }
    }
    render() {
        let {show1st, show2nd, pointsTableData, playerFilAndBatData, playerBowlingData } = this.state;
               
        var settings1 = {
            dots: false,
            
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrow: true
        };


        var settings2 = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrow: true
        };
        let battingTeam = null
        let bowlingTeam = null
        if(this.state.innings.length === 1){
            battingTeam = this.state.innings[0];
        }else if(this.state.matchdetail.Status !== "Match Ended"){
            battingTeam = this.state.innings[1]; 
            bowlingTeam = this.state.innings[0];
        }else{
            battingTeam = this.state.innings[0]; 
            bowlingTeam = this.state.innings[1];
        }
        
        let status = this.state.matchdetail.Equation
        if(typeof this.state.innings[1] === "undefined"){
            status = this.state.teams[this.state.matchdetail.Tosswonby].Name_Full + " won the toss and elected to " + this.state.matchdetail.Toss_elected_to;
        }
        
        return (
            <div>
                <section className="mt-20">
                    <div className="container2 scmin">
                        <h1 className="ft-20 ftw-600 t-center mb-20">Scorecard</h1>

                        <div className="scr_Mini  pd15 bgWhite brdr-rad12">
                            <div className="scr_mtchSt ft-13 ftw-600">{this.state.matchdetail.Status}</div>
                            <div className="scr_Loc mt-10 ft-14">
                                {this.state.matchdetail.Venue.Name}
                                {/* <span className="mtch_Dt">Sep 13, 2020</span> */}
                            </div>
                            <div className="scr_tms mt-10">
                                <div className="scr_tm d-flex jus-s-between al-i-center wnr">
                                    <div className="scr_tmNm d-flex al-i-center">
                                        {/* <div className="tm_logo"><img src="/agames/images/3.png" /></div> */}
                                        <div className={`team_card_circle_ptw team_grd_${this.state.teams[battingTeam.Battingteam].Name_Short} widteamImgDetail`}><img src={`images/city/${this.state.teams[battingTeam.Battingteam].Name_Short}.svg`} className="team_card_circle_img" /></div>
                                       
                                        <div className="tm_nm ml-10">
                                            {this.state.teams[battingTeam.Battingteam].Name_Short}
                                        </div>
                                    </div>
                                    <div className="scr_tmDta d-flex al-i-center">
                                        <div className="tm_run ftw-600">{battingTeam.Total + "/" + battingTeam.Wickets}</div>
                                        <div className="tm_ov ml-5 ft-12">&nbsp;({battingTeam.Overs + "/" + battingTeam.AllottedOvers})</div>
                                    </div>
                                </div>
                                {typeof this.state.innings[1] !== "undefined" ?
                                    <><hr className="mtb-10" />
                                        <div className="scr_tm d-flex jus-s-between al-i-center">
                                            <div className="scr_tmNm d-flex al-i-center">
                                                {/* <div className="tm_logo"><img src="/agames/images/1.png" /></div> */}
                                                <div className={`team_card_circle_ptw team_grd_${this.state.teams[bowlingTeam.Battingteam].Name_Short} widteamImgDetail`}><img src={`images/city/${this.state.teams[bowlingTeam.Battingteam].Name_Short}.svg`} className="team_card_circle_img" /></div>
                                                <div className="tm_nm ml-10">
                                                    {this.state.teams[bowlingTeam.Battingteam].Name_Short}
                                                </div>
                                            </div>
                                            <div className="scr_tmDta d-flex al-i-center">
                                                <div className="tm_run ftw-600">{bowlingTeam.Total + "/" + bowlingTeam.Wickets}</div>
                                                <div className="tm_ov ml-5">&nbsp;({bowlingTeam.Overs + "/" + bowlingTeam.AllottedOvers})</div>
                                            </div>
                                        </div></> : null}
                            </div>
                            <div className="mtchStatus pt-15">{status}</div>
                        </div>

                        <div id="tbsBoxtouch"></div>
                        <div className="lst_Tms tabs" id="tbsBox">
                            <div className="swiper-container" id="lst_Tbs">
                                <ul className="swiper-wrapper-tab">
                                    {/* <!-- <div className="slider"></div> --> */}
                                    <li className={show1st ? "swiper-slide active" : "swiper-slide"}><a
                                        //  href="javascript:void(0)"
                                        onClick={() => this.tabClick("1st")}
                                    >
                                        {this.state.teams[this.state.innings[0].Battingteam].Name_Short}
                                    </a></li>
                                    <li className={show2nd ? "swiper-slide active" : "swiper-slide"}><a
                                        onClick={() => this.tabClick("2nd")}
                                    //  href="javascript:void(0)"
                                    >
                                        {this.state.teams[this.state.innings[0].Bowlingteam].Name_Short}
                                    </a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="swiper-container" id="teamsDta">
                            <div className="swiper-wrapper">
                                {/* Table 1 */}
                                {show1st == true && show2nd == false ?
                                    <div className="swiper-slide">
                                        <div className="bgWhite">
                                            <div className="scr_Tbls brdr-rad12 brdtltr-0 pd10">
                                                <table width="100%" cellPadding="0" cellSpacing="0">
                                                    <thead>
                                                        <tr>
                                                            <th>Batsman</th>
                                                            <th>R</th>
                                                            <th>B</th>
                                                            <th>4s</th>
                                                            <th>6s</th>
                                                            <th>SR</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.innings[0].Batsmen.map((value, key) =>
                                                            <tr key={key}>
                                                                <td className={value.Howout == "Batting" ? "notOutT" : ""}>
                                                                    {this.state.teams[this.state.innings[0].Battingteam].Players[value.Batsman].Name_Full}
                                                                    <span className={value.Howout == "not out" ? "notOut": "sp_Txt"}>{value.Howout}</span></td>
                                                                <td>{value.Runs}</td>
                                                                <td>{value.Balls}</td>
                                                                <td>{value.Fours}</td>
                                                                <td>{value.Sixes}</td>
                                                                <td>{value.Strikerate == "" ? "" :parseFloat(value.Strikerate).toFixed(2)}</td>
                                                            </tr>
                                                        )}
                                                        <tr>
                                                            <td colSpan="6">
                                                                <table width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <th>Extras</th>
                                                                            <td className="ftw-400">{parseInt(this.state.innings[0].Byes) + parseInt(this.state.innings[0].Legbyes) + parseInt(this.state.innings[0].Wides) + parseInt(this.state.innings[0].Noballs)+ parseInt(this.state.innings[0].Penalty)} Runs (B: {this.state.innings[0].Byes}, LB: {this.state.innings[0].Legbyes}, WD: {this.state.innings[0].Wides}, NB: {this.state.innings[0].Noballs}, P: {this.state.innings[0].Penalty})</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Total</th>
                                                                            <td className="ftw-400"><strong>{this.state.innings[0].Total + "/" + this.state.innings[0].Wickets} ({this.state.innings[0].Overs + "/" + this.state.innings[0].AllottedOvers})</strong>  (RR: {this.state.innings[0].Runrate})</td>
                                                                        </tr>
                                                                    </tbody>

                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            {this.state.innings[0].FallofWickets != null && this.state.innings[0].FallofWickets.length > 0 ? 
                                            <div className="scr_Tbls pos-rel foWckts mt-20 brdr-rad12 ">
                                                <div className="ft-16 ftw-600 mb-15 pdlr15">Fall Of Wickets:</div>
                                                <div className="swiper-container" id="fowAus">
                                                    <ul className="swiper-wrapper">
                                                         <Slider {...settings1}> 
                                                            {this.state.innings[0].FallofWickets.map((item, index) => {
                                                                return <li className="swiper-slide" key={index}>
                                                                    <div className="fal_wkt-rd">{item.Score}/{item.Wicket_No}</div>
                                                                    <div className="fal_wkt-ovr">{item.Overs} ov</div>
                                                                    <div className="fal_wkt-nme">{this.state.teams[this.state.innings[0].Battingteam].Players[item.Batsman].Name_Full}</div>
                                                                </li>
                                                            })}
                                                        </Slider> 
                                                    </ul>
                                                </div>
                                                {/* <div className="fowHor_Arw">
                                                    <div className="fow-prev aus swiper-button-prev"></div>
                                                    <div className="fow-next aus swiper-button-next"></div>
                                                </div> */}
                                            </div>:null}

                                            <div className="scr_Tbls mt-20 brdr-rad12 pd10">
                                                <table width="100%" cellPadding="0" cellSpacing="0">
                                                    <thead>
                                                        <tr>
                                                            <th>Bowlers</th>
                                                            <th>O</th>
                                                            <th>M</th>
                                                            <th>R</th>
                                                            <th>W</th>
                                                            <th>ER</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.innings[0].Bowlers.map((value, key) =>
                                                            <tr key={key}>
                                                                <td> {this.state.teams[this.state.innings[0].Bowlingteam].Players[value.Bowler].Name_Full}
                                                                </td>
                                                                <td>{value.Overs}</td>
                                                                <td>{value.Maidens}</td>
                                                                <td>{value.Runs}</td>
                                                                <td>{value.Wickets}</td>
                                                                <td>{value.Economyrate == "" ? "" :parseFloat(value.Economyrate).toFixed(2)}</td>
                                                            </tr>
                                                        )}
                                                        {/* {Object.keys(this.state.teams[0].Players).map(key =>
                                                            <tr key={key}>
                                                                <td>{this.state.teams[0].Players[key].Name_Full}</td>
                                                                <td>6</td>
                                                                <td>11</td>
                                                                <td>0</td>
                                                                <td>{this.state.teams[0].Players[key].Bowling.Wickets}</td>
                                                                <td>{this.state.teams[0].Players[key].Bowling.Economyrate}</td>
                                                            </tr>)} */}

                                                        {/* <tr>
                                                        <td className="notOutT ftw-600">Aaron Finch*</td>
                                                        <td>73</td>
                                                        <td>105</td>
                                                        <td>8</td>
                                                        <td>1</td>
                                                        <td>5.52</td>
                                                    </tr> */}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    :
                                    show1st == false && show2nd == true ?
                                        // {/* Table 2  */}
                                        <>
                                            {typeof this.state.innings[1] !== "undefined" ?
                                                <div className="swiper-slide">
                                                    <div className="bgWhite">
                                                        <div className="scr_Tbls brdr-rad12 brdtltr-0 pd10">
                                                            <table width="100%" cellPadding="0" cellSpacing="0">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Batsman</th>
                                                                        <th>R</th>
                                                                        <th>B</th>
                                                                        <th>4s</th>
                                                                        <th>6s</th>
                                                                        <th>SR</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {this.state.innings[1].Batsmen.map((value, key) =>
                                                                        <tr key={key}>
                                                                            <td className={value.Howout == "Batting" ? "notOutT" : ""}>
                                                                                {this.state.teams[this.state.innings[1].Battingteam].Players[value.Batsman].Name_Full}
                                                                                <span className={value.Howout == "not out" ? "notOut": "sp_Txt"}>{value.Howout}</span></td>
                                                                            <td>{value.Runs}</td>
                                                                            <td>{value.Balls}</td>
                                                                            <td>{value.Fours}</td>
                                                                            <td>{value.Sixes}</td>
                                                                            <td>{value.Strikerate == "" ? "" :parseFloat(value.Strikerate).toFixed(2)}</td>
                                                                        </tr>
                                                                    )}

                                                                    {/* <tr>
                                                        <td>Glenn Maxwell<span className="notOut">Not Out</span></td>
                                                        <td>1</td>
                                                        <td>8</td>
                                                        <td>0</td>
                                                        <td>0</td>
                                                        <td>12.50</td>
                                                    </tr> */}

                                                                    <tr>
                                                                        <td colSpan="6">
                                                                            <table width="100%">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <th>Extras</th>
                                                                                        <td className="ftw-400">{parseInt(this.state.innings[1].Byes) + parseInt(this.state.innings[1].Legbyes) + parseInt(this.state.innings[1].Wides) + parseInt(this.state.innings[1].Noballs)+ parseInt(this.state.innings[1].Penalty)} Runs (B: {this.state.innings[1].Byes}, LB: {this.state.innings[1].Legbyes}, WD: {this.state.innings[1].Wides}, NB: {this.state.innings[1].Noballs}, P: {this.state.innings[1].Penalty})</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <th>Total</th>
                                                                                        <td className="ftw-400"><strong>{this.state.innings[1].Total + "/" + this.state.innings[1].Wickets} ({this.state.innings[1].Overs + "/" + this.state.innings[1].AllottedOvers})</strong>  (RR: {this.state.innings[1].Runrate})</td>
                                                                                    </tr>
                                                                                </tbody>

                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                        {this.state.innings[1].FallofWickets !=null && this.state.innings[1].FallofWickets.length > 0 ?
                                                        <div className="scr_Tbls pos-rel foWckts mt-20 brdr-rad12 ">
                                                            <div className="ft-16 ftw-600 mb-15 pdlr15">Fall Of Wickets:</div>
                                                            <div className="swiper-container" id="fowEng">
                                                                <ul className="swiper-wrapper">

                                                                     <Slider {...settings2}> 
                                                                        {this.state.innings[1].FallofWickets.map((item, index) => {
                                                                            return <li className="swiper-slide">
                                                                                <div className="fal_wkt-rd">{item.Score}/{item.Wicket_No}</div>
                                                                                <div className="fal_wkt-ovr">{item.Overs} ov</div>
                                                                                <div className="fal_wkt-nme">{this.state.teams[this.state.innings[1].Battingteam].Players[item.Batsman].Name_Full}</div>
                                                                            </li>
                                                                        })}
                                                                    </Slider> 

                                                                </ul>
                                                            </div>
                                                            {/* <div className="fowHor_Arw">
                                                                <div className="fow-prev eng swiper-button-prev"></div>
                                                                <div className="fow-next eng swiper-button-next"></div>
                                                            </div> */}
                                                        </div>:null}


                                                        <div className="scr_Tbls mt-20 brdr-rad12 pd10">
                                                            <table width="100%" cellPadding="0" cellSpacing="0">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Bowlers</th>
                                                                        <th>O</th>
                                                                        <th>M</th>
                                                                        <th>R</th>
                                                                        <th>W</th>
                                                                        <th>ER</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {this.state.innings[1].Bowlers.map((value, key) =>
                                                                        <tr key={key}>
                                                                            <td> {this.state.teams[this.state.innings[1].Bowlingteam].Players[value.Bowler].Name_Full}
                                                                            </td>
                                                                            <td>{value.Overs}</td>
                                                                            <td>{value.Maidens}</td>
                                                                            <td>{value.Runs}</td>
                                                                            <td>{value.Wickets}</td>
                                                                            <td>{value.Economyrate == "" ? "" :parseFloat(value.Economyrate).toFixed(2)}</td>
                                                                        </tr>
                                                                    )}

                                                                    {/* <tr>
                                                        <td className="notOutT ftw-600">Aaron Finch*</td>
                                                        <td>73</td>
                                                        <td>105</td>
                                                        <td>8</td>
                                                        <td>1</td>
                                                        <td>5.52</td>
                                                    </tr>
                                                    */}
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                    </div>
                                                </div> : 
                                                 <div className="swiper-slide">
                                                 <div className="bgWhite">
                                                     <p className="pd20 t-center">Yet to Bat</p>
                                                 </div>
                                             </div>}</> : null}
                            </div>
                        </div>
                         {/* New Requirement */}
                         {localStorage.getItem("show_batting") == 1 && playerFilAndBatData != null && playerFilAndBatData.length > 0 ?<>
                         <h2>Batting</h2>
                            <div className="scr_Tbls brdr-rad12 brdtltr-0 pd10">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Matches</th>
                                        <th>Runs</th>
                                        <th>50s</th>
                                        <th>100s</th>
                                        <th>Avg.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {playerFilAndBatData != null && playerFilAndBatData.length > 0 ? 
                                    playerFilAndBatData.map((d1,index)=>
                                        <tr key={index}>
                                        <td>{d1.data.profile.Bio.Player_Name}</td>
                                        <td>{d1.stats["Batting & Fielding"].IPL != null ? d1.stats["Batting & Fielding"].IPL[0] : ""}</td>
                                        <td>{d1.stats["Batting & Fielding"].IPL != null ? d1.stats["Batting & Fielding"].IPL[3] : ""}</td> 
                                        <td>{d1.stats["Batting & Fielding"].IPL != null ? d1.stats["Batting & Fielding"].IPL[6] : ""}</td>
                                        <td>{d1.stats["Batting & Fielding"].IPL != null ? d1.stats["Batting & Fielding"].IPL[5] : ""}</td>
                                        <td>{d1.stats["Batting & Fielding"].IPL != null ? d1.stats["Batting & Fielding"].IPL[9] : ""}</td>
                                    </tr>                                  
                                    ):null}
                                </tbody>
                                </table>
                            </div>
                            </>:null}

                        {localStorage.getItem("show_bowling") == 1 && playerBowlingData != null && Object.keys(playerBowlingData).length > 0 ? <>
                            <h2>Bowling</h2>
                            <div className="scr_Tbls brdr-rad12 brdtltr-0 pd10">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Innings</th>
                                        <th>Overs</th>
                                        <th>W</th>
                                        <th>3V</th>
                                        <th>E/R</th>
                                    </tr>
                                </thead>
                                <tbody>
                               {playerBowlingData != null && Object.keys(playerBowlingData).length > 0  ? <tr>
                                        <td>{playerBowlingData.data.profile.Bio.Player_Name}</td>
                                        <td>{playerBowlingData.stats["Bowling"].IPL != null ? playerBowlingData.stats["Bowling"].IPL[0] : ""}</td>
                                        <td>{playerBowlingData.stats["Bowling"].IPL != null ? playerBowlingData.stats["Bowling"].IPL[1] : ""}</td> 
                                        <td>{playerBowlingData.stats["Bowling"].IPL != null ? playerBowlingData.stats["Bowling"].IPL[4] : ""}</td>
                                        <td>{playerBowlingData.stats["Bowling"].IPL != null ? playerBowlingData.stats["Bowling"].IPL[6] : ""}</td>
                                        <td>{playerBowlingData.stats["Bowling"].IPL != null ? playerBowlingData.stats["Bowling"].IPL[9] : ""}</td>
                                    </tr>:null}     
                                </tbody>
                                </table>
                            </div>
                        </>:null}
                        {/* Points Table */}
                        {localStorage.getItem("show_points") == 1 ? <>
                                <br></br>
                            <div className="scr_Tbls brdr-rad12 brdtltr-0 pd10">
                            <h2>Points Table</h2>
                                <table width="100%" cellpadding="0" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Teams</th>
                                        <th>P</th>
                                        <th>W</th>
                                        <th>L</th>
                                        <th>Pts</th>
                                        <th>Nrr</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {pointsTableData.length > 0 ? 
                                   pointsTableData.map((data,index)=><tr key={index}>
                                        <td>{data.name}</td>
                                        <td>{data.p}</td>
                                        <td>{data.w}</td>
                                        <td>{data.l}</td>
                                        <td>{data.pts}</td>
                                        <td>{data.nrr}</td> 
                                    </tr>):null}
                                </tbody>
                                </table>
                            </div></> : null}
                    </div>
                </section>
            </div>
        )
    }
}
