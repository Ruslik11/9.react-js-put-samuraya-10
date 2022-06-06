import React from 'react';
import s from './Header.module.scss'
import {NavLink} from "react-router-dom";

const Header = props => {
  return (
    <header className={s.header}>
      <img src="https://logo-marque.com/wp-content/uploads/2020/04/Twitter-Logo.png" alt=""/>

      <div className={s.loginBlock}>
        {props.isAuth
            ? <div>
                {props.login} - <button onClick={props.logout}>Log out</button>
            </div>
            : <NavLink to={'/login'}>Login</NavLink> }
      </div>
    </header>
  );
};

export default Header;