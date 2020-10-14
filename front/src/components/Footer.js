import React from 'react';
import AQ_LOGO_W from '../img/AQOOM_whitelogo.svg';
import styles from '../styles/footer.module.scss'
const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footer_left}>
                <div className={styles.aqoom_logo}>
                    <img src={AQ_LOGO_W} alt="aqoom logo"></img>
                </div>
                <div className={styles.aqoom_right}>
                    All rights reserved 2020 © AQOOM
                </div>
            </div>
            <div className={styles.footer_right}>
                <a href="http://aqoom.info/" >
                    ABOUT US
                </a>
                <a href="mailto:contact@aqoom.com">
                    CONTACT US
                </a>
            </div>
        </div>
    )
}

export default Footer;