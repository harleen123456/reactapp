import React from 'react';
import { baseUrl } from '../../../Config/Config'

export default class TeamCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team_list: [], selectedTeam: ""
        }
    }
    static getDerivedStateFromProps(nextProps, currntState) {
        currntState['selectedTeam'] = nextProps['selectedTeam']
        currntState['team_list'] = nextProps['team_list']
        return currntState
    }

    render() {
        let { team_list, selectedTeam } = this.state;
        return (
            <div>
                <div className="team_cards_wrp">
                    {team_list.length ? team_list.map((item, index) => {
                        //  item = item.team_name;
                        let city_name = `${baseUrl}/images/city/bombay.svg`
                        let class_name = "team_card_circle"
                        if (item.team_name == "Delhi") {
                            class_name = class_name + " team_grd_2"
                            city_name = `${baseUrl}/images/city/delhi.png`;
                        }

                        else if (item.team_name == "Hyderabad") {
                            class_name = class_name + " team_grd_8"
                            city_name = `${baseUrl}/images/city/hyderabad.png`
                        }

                        else if (item.team_name == "Punjab") {
                            class_name = class_name + " team_grd_3"
                            city_name = `${baseUrl}/images/city/punjab.png`
                        }

                        else if (item.team_name == "Rajasthan") {
                            class_name = class_name + " team_grd_6"
                            city_name = `${baseUrl}/images/city/rajasthan.png`
                        }

                        else if (item.team_name == "Mumbai") {
                            class_name = class_name + " team_grd_5"
                            city_name = `${baseUrl}/images/city/mumbai.png`
                        }
                        else if (item.team_name == "Bangalore") {
                            class_name = class_name + " team_grd_7"
                            city_name = `${baseUrl}/images/city/bangalore.png`
                        }
                        else if (item.team_name == "Kolkata") {
                            class_name = class_name + " team_grd_4"
                            city_name = `${baseUrl}/images/city/kolkata.png`
                        }
                        else if (item.team_name == "Chennai") {
                            city_name = `${baseUrl}/images/city/chennai.png`
                        }

                        return (
                            <li className={selectedTeam == item.team_id ? "actv" : ""} key={index} onClick={() => { this.props.handleTeamSelect(item) }}><a href="#"><span className="ctIc"><img className="roundpic" src={city_name} /></span><span className="ctNm">{item.team_name}</span></a></li>
                            
                        )
                    }) : null}
                    <li className="" key="8"><a href="#"><span className="ctIc"></span><span className="ctNm">-</span></a></li>

                </div>
            </div>
        )
    }
}