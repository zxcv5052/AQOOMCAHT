import React from 'react';
import TelegramLoginButton from "react-telegram-login";
import AQ_LOGO from "../img/AQOOM_logo.png";

function getUTCExpiredTime() {
    let now = new Date();
    let time = now.getTime();
    let expireTime = time + 2 * 3600000;
    now.setTime(expireTime);

    return now.toUTCString();
}
const handleTelegramResponse = response => {
    console.log(response);
};
const Login = () => {
    return (
        <div className="signin_container">
            <div className="aqoom_logo">
            </div>
            <div className="login_box">
                <p className="login_info">
                    Please login with your Telegram <br />
                    to proceed to your dashboard.
                </p>
                <TelegramLoginButton
                    dataOnauth={handleTelegramResponse} botName="kyeong"
                />
                <p className="login_help">
                    AQOOM uses Telegram Secure ID to provide seamless automation of
                    group management services. To learn more about Telegram Login works
                    for websites, click <a href="https://telegram.org/blog/login">here</a>. <br/><br/> Having trouble logging in? Contact us at
                    <a href="mailto:info@aqoom.com"> info@aqoom.com</a>
                </p>
            </div>
        </div>
    );
};

export default Login;