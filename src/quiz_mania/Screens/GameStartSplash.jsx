import React, { Component } from 'react';
import { baseUrl } from '../../Config/Config'
export default class SplashScreen extends Component {
    async componentDidMount() {
        setTimeout(() => {
            this.props.history.replace(`${baseUrl}/quiz-mania/quiz`)
        }, 2000)
    }
    render() {
        return (
            <div>
                <img src={`${baseUrl}/images/splash_screen.jpg`} className="splash_screen" />
            </div>
        );
    }
}
