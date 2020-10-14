import React, {useState, useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from "../components/Header";
import Section from "../components/Section";
import Footer from "../components/Footer";
import SideMenu from "../components/SideMenu";
import styles from '../styles/index.module.scss';
import Cookies from 'js-cookie';

const Root = () => {

    const [user, setUser] = useState([]);

    useEffect(() => {
        setUser(Cookies.get('user'));
    });

    return (
        <div>
            {user}
            <div>
                <BrowserRouter>
                    <Header />
                    <SideMenu />
                    <Section />
                </BrowserRouter>
            </div>
        <Footer />
        </div>
    )
};
export default Root;
