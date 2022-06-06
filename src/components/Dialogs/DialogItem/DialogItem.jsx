import React from 'react';
import s from '../Dialogs.module.scss'
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
  const path = '/dialogs/' + props.id;

  return (
    <div>
      <NavLink to={path} activeClassName={s.active} className={s.dialog}>{props.name}</NavLink>
    </div>
  )
};

export default DialogItem;