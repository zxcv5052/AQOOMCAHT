import React, { useState }  from 'react';
import styles from '../styles/header.module.scss'
import {NavLink} from 'react-router-dom'

const Header = (isLogin) => {
    if(true){
        return (
            <div className = {styles.header}>
                <div className={styles.logo} > <NavLink exact to="/"/> Logo </div>

                <div className={styles.navigate__top}>
                    <div className={styles.gf}>
                        <div className={styles.group}> <NavLink exact to="/groups" >Group </NavLink> </div>
                        <div className={styles.function}> <NavLink exact to="/functions" >Function </NavLink> </div>
                    </div>
                    <div className={styles.u}> <div className={styles.group}><NavLink exact to="/users" >사용자 </NavLink> </div> </div>
                </div>
            </div>
        )
    }else{
        return (
            <div className ="header">
                <div> <NavLink exact to="/" > Logo </NavLink> </div>
                <div> <NavLink exact to="/future" > Future </NavLink> </div>
                <div> <NavLink exact to="/login" > 로그인 창 </NavLink> </div>
            </div>
        )
    }
}

export default Header;