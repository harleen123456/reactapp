import React, { Component } from 'react';

import { baseUrl } from '../../Config/Config'
export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.getParameterByName = this.getParameterByName.bind(this)
    }
    async componentDidMount() {
        let { params } = this.props.match
        localStorage.removeItem("quiz_user")
        localStorage.removeItem("current_quiz")
        localStorage.removeItem("selected_team")
        let type = this.getParameterByName("type");
        let username = this.getParameterByName("username");
        let token = this.getParameterByName("token");
        console.log('here');
        if (typeof username === undefined || typeof token === undefined) {
            console.log(1234);
            // this.props.history.push("/not-found")
        } else {
            console.log(5678);
            localStorage.setItem("quiz_user", JSON.stringify({ type, username, token }))
            setTimeout(() => {
                this.props.history.push(`${baseUrl}/quiz-mania/team-selection`)
            }, 2000)

        }

    }
    getParameterByName(name) {
        var result = null;
        var regexS = "[\\?&#]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec('?' + window.location.href.split('?')[1]);
        if (results != null) {
            result = decodeURIComponent(results[1].replace(/\+/g, " "));
        }
        return result;
    }
    render() {
        return (
            <div>
                <img src={`${baseUrl}/images/splash_screen.jpg`} className="splash_screen" />
            </div>
        );
    }
}
