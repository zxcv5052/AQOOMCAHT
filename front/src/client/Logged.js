import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import SideMenu from '../components/SideMenu'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Section from '../components/Section'

const Logged = () => (
    <div className="wrapper">
        <BrowserRouter>
            <Header />
            <SideMenu />
            <Section />
        </BrowserRouter>
        <Footer />
    </div>
);
export default Logged;