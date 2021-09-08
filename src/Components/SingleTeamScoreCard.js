import React, { Component } from 'react';

export default class SingleTeamScoreCrard extends Component {
    constructor(props){
        super(props);
        this.state = {
            notes : this.props.notes,
            innings : this.props.innings,
            matchdetail : this.props.matchdetail,
            teams : this.props.teams,
            show1st : true,
            show2nd : false
        }
    }
    static getDerivedStateFromProps(props,state){
        state.notes = props.notes
        state.innings = props.innings
        state.matchdetail = props.matchdetail
        state.teams = props.teams
        return state
    }
    tabClick = (value) => {
        if(value == "1st"){
            this.setState({show1st : true, show2nd : false })
        }
        if(value == "2nd"){
            this.setState({show2nd : true, show1st : false })
        }
    }
    componentDidMount(){
        console.log("Single")
    }
    render() {
        console.log("single data",this.state)
        return (
            <>
                    <section class="mt-20">
        <div class="container2">
            <h1 class="ft-20 ftw-600 t-center mb-20">Scorecard</h1>
            
            <div class="scr_Mini  pd15 bgWhite brdr-rad12">
                <div class="scr_mtchSt ft-13 ftw-600">Match Ended</div>
                <div class="scr_Loc mt-10 ft-14">Old Trafford, Manchester, <span class="mtch_Dt">Sep 13, 2020</span></div>
                <div class="scr_tms mt-10">
                    <div class="scr_tm d-flex jus-s-between al-i-center wnr">
                        <div class="scr_tmNm d-flex al-i-center">
                            <div class="tm_logo"><img src="/agames/images/3.png" /></div>
                            <div class="tm_nm ml-10">Eng</div>
                        </div>
                        <div class="scr_tmDta d-flex al-i-center">
                            <div class="tm_run ftw-600">231/9</div>
                            <div class="tm_ov ml-5 ft-12">(50.0/50)</div>
                        </div>
                    </div>
                    <hr class="mtb-10" />
                    <div class="scr_tm d-flex jus-s-between al-i-center">
                        <div class="scr_tmNm d-flex al-i-center">
                            <div class="tm_logo"><img src="/agames/images/1.png" /></div>
                            <div class="tm_nm ml-10">Aus</div>
                        </div>
                        <div class="scr_tmDta d-flex al-i-center">
                            <div class="tm_run ftw-600">207</div>
                            <div class="tm_ov ml-5">(48.4/50)</div>
                        </div>
                    </div>
                </div>
                <div class="mtchStatus pt-15">England beat Australia by 24 runs</div>
            </div>

            <div id="tbsBoxtouch"></div>
            <div class="lst_Tms tabs" id="tbsBox">
                <div class="swiper-container" id="lst_Tbs">
                    <ul class="swiper-wrapper">
                        {/* <!-- <div class="slider"></div> --> */}
                        <li class={this.state.show1st ? "swiper-slide active" : "swiper-slide"}>
                            <a 
                            // href="javascript:void(0)"
                            onClick={()=>this.tabClick("1st")}
                            >Aus</a>
                        </li>
                        <li class={this.state.show2nd ? "swiper-slide active" : "swiper-slide"}>
                            <a 
                            // href="javascript:void(0)"
                            onClick={()=>this.tabClick("2nd")}
                            >Eng</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="swiper-container" id="teamsDta">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div class="bgWhite">
                            <div class="scr_Tbls brdr-rad12 brdtltr-0 pd10">
                                <table width="100%" cellpadding="0" cellspacing="0">
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
                                    <tr>
                                        <td>David Warner<span class="sp_Txt">c Jos Buttler b Jofra Archer</span></td>
                                        <td>6</td>
                                        <td>11</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>54.54</td>
                                    </tr>
                                    <tr>
                                        <td>Aaron Finch<span class="sp_Txt">b Chris Woakes</span></td>
                                        <td>73</td>
                                        <td>105</td>
                                        <td>8</td>
                                        <td>1</td>
                                        <td>69.52</td>
                                    </tr>
                                    <tr>
                                        <td>Marcus Stoinis <span class="sp_Txt">c Jos Buttler b Jofra Archer</span></td>
                                        <td>9</td>
                                        <td>14</td>
                                        <td>0</td>
                                        <td>1</td>
                                        <td>64.28</td>
                                    </tr>
                                    <tr>
                                        <td>Marnus Labuschagne <span class="sp_Txt">lbw b Chris Woakes</span></td>
                                        <td>48</td>
                                        <td>59</td>
                                        <td>3</td>
                                        <td>0</td>
                                        <td>81.35</td>
                                    </tr>
                                    <tr>
                                        <td>Mitchell Marsh <span class="sp_Txt">c Jos Buttler b Jofra Archer</span></td>
                                        <td>1</td>
                                        <td>6</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>16.66</td>
                                    </tr>
                                    <tr>
                                        <td>Glenn Maxwell<span class="notOut">Not Out</span></td>
                                        <td>1</td>
                                        <td>8</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>12.50</td>
                                    </tr>
                                    <tr>
                                        <td class="notOutT">Marnus Labuschagne <span class="sp_Txt">Not Out</span></td>
                                        <td>48</td>
                                        <td>59</td>
                                        <td>3</td>
                                        <td>0</td>
                                        <td>81.35</td>
                                    </tr>
                                    <tr>
                                        <td colspan="6">
                                            <table width="100%">
                                                <tr>
                                                    <th>Extras</th>
                                                    <td class="ftw-400">13 Runs (B: 0, LB: 11, WD: 1, NB: 1</td>
                                                </tr>
                                                <tr>
                                                    <th>Total</th>
                                                    <td  class="ftw-400"><strong>207/10 (48.4/50)</strong>  (RR: 4.25)</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>

                            <div class="scr_Tbls pos-rel foWckts mt-20 brdr-rad12 pdlr15">
                                <div class="ft-16 ftw-600 mb-15">Fall Of Wickets:</div>
                                <div class="swiper-container" id="fowAus">
                                    <ul class="swiper-wrapper">
                                    <li class="swiper-slide">
                                        <div class="fal_wkt-rd">9/1</div>
                                        <div class="fal_wkt-ovr">3.4 ov</div>
                                        <div class="fal_wkt-nme">David Warner</div>
                                    </li>
                                    <li class="swiper-slide">
                                        <div class="fal_wkt-rd">37/2</div>
                                        <div class="fal_wkt-ovr">7.5 ov</div>
                                        <div class="fal_wkt-nme">Marcus Stoinis</div>
                                    </li>
                                    <li class="swiper-slide">
                                        <div class="fal_wkt-rd">144/3</div>
                                        <div class="fal_wkt-ovr">30.5 ov</div>
                                        <div class="fal_wkt-nme">Marnus Labuschagne</div>
                                    </li>
                                    <li class="swiper-slide">
                                        <div class="fal_wkt-rd">145/4</div>
                                        <div class="fal_wkt-ovr">31.5 ov</div>
                                        <div class="fal_wkt-nme">Mitchell Marsh</div>
                                    </li>
                                    <li class="swiper-slide">
                                        <div class="fal_wkt-rd">145/5</div>
                                        <div class="fal_wkt-ovr">32.3 ov</div>
                                        <div class="fal_wkt-nme">Aaron Finch</div>
                                    </li>
                                    <li class="swiper-slide">
                                        <div class="fal_wkt-rd">147/6</div>
                                        <div class="fal_wkt-ovr">34.1 ov</div>
                                        <div class="fal_wkt-nme">Glenn Maxwell</div>
                                    </li>
                                    <li class="swiper-slide">
                                        <div class="fal_wkt-rd">166/7</div>
                                        <div class="fal_wkt-ovr">39.2 ov</div>
                                        <div class="fal_wkt-nme">Pat Cummins</div>
                                    </li>
                                    <li class="swiper-slide">
                                        <div class="fal_wkt-rd">166/8</div>
                                        <div class="fal_wkt-ovr">39.3 ov</div>
                                        <div class="fal_wkt-nme">Mitchell Starc</div>
                                    </li>
                                    <li class="swiper-slide">
                                        <div class="fal_wkt-rd">176/9</div>
                                        <div class="fal_wkt-ovr">43.5 ov</div>
                                        <div class="fal_wkt-nme">Adam Zampa</div>
                                    </li>
                                    <li class="swiper-slide">
                                        <div class="fal_wkt-rd">207/10</div>
                                        <div class="fal_wkt-ovr">48.4 ov</div>
                                        <div class="fal_wkt-nme">Alex Carey</div>
                                    </li>
                                    </ul>                               
                                </div>
                                <div class="fowHor_Arw">
                                    <div class="fow-prev aus swiper-button-prev"></div>
                                    <div class="fow-next aus swiper-button-next"></div> 
                                </div>
                            </div>


                            <div class="scr_Tbls mt-20 brdr-rad12 pd10">
                                <table width="100%" cellpadding="0" cellspacing="0">
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
                                        <tr>
                                            <td>David Warner</td>
                                            <td>6</td>
                                            <td>11</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>5.54</td>
                                        </tr>
                                        <tr>
                                            <td class="notOutT ftw-600">Aaron Finch*</td>
                                            <td>73</td>
                                            <td>105</td>
                                            <td>8</td>
                                            <td>1</td>
                                            <td>5.52</td>
                                        </tr>
                                        <tr>
                                            <td>Marcus Stoinis </td>
                                            <td>9</td>
                                            <td>14</td>
                                            <td>0</td>
                                            <td>1</td>
                                            <td>5.28</td>
                                        </tr>
                                        <tr>
                                            <td>Marnus Labuschagne</td>
                                            <td>48</td>
                                            <td>59</td>
                                            <td>3</td>
                                            <td>0</td>
                                            <td>5.35</td>
                                        </tr>
                                        <tr>
                                            <td>Mitchell Marsh</td>
                                            <td>1</td>
                                            <td>6</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>5.66</td>
                                        </tr>
                                        <tr>
                                            <td>Glenn Maxwell</td>
                                            <td>1</td>
                                            <td>8</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>5.50</td>
                                        </tr>
                                        <tr>
                                            <td>Marnus Labuschagne</td>
                                            <td>48</td>
                                            <td>59</td>
                                            <td>3</td>
                                            <td>0</td>
                                            <td>5.35</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="bgWhite">
                            <p class="pd20 t-center">Yet to Start Bat</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
            </>
        )
    }
}
