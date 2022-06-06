import React from "react";
import styles from "./users.module.scss";
import {NavLink} from "react-router-dom";

let User = ({user, followingInProgress, unfollow, follow}) => {
  return (<div className={styles.userBox}>
          <span>
            <div>
              <NavLink to={`/profile/${user.id}`}>
                <img className={styles.userPhoto} alt=""
                     src={user?.photos?.small !== null ? user.photos.small : 'https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg'}/>
              </NavLink>
            </div>
          </span>
          <span>
            <span>
              <div>{user?.name}</div>
              <div>{user?.status}</div>
              <div>
              {user?.followed
                ? <button
                  disabled={followingInProgress.some(id => id === user.id)}
                  onClick={() => unfollow(user.id)}
                  >Unfollow</button>
                : <button
                  disabled={followingInProgress.some(id => id === user.id)}
                  onClick={() => follow(user.id)}
                  >Follow</button>
              }
            </div>
            </span>
            <span>
              <div>{user?.location?.country}</div>
              <div>{user?.location?.city}</div>
            </span>
          </span>
        </div>
  );
};

export default User;