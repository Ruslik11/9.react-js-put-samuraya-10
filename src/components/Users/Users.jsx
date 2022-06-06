import React from "react";
import Pagination from "../common/Pagination/Pagination";
import User from "./User";
import styles from "./users.module.scss";

let Users = ({users, totalUsersCount, pageSize, currentPage, onPageChanged, ...props}) => {
    return (
        <div>
            <Pagination
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
            />
            <div className={styles.userBoxing}>
                {users.map(u => <User user={u}
                                      followingInProgress={props.followingInProgress}
                                      key={u.id}
                                      unfollow={props.unfollow}
                                      follow={props.follow}/>
                )}
            </div>
        </div>
    );
};

export default Users;