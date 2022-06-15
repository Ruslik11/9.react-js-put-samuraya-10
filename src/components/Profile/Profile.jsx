import React from 'react';
import s from './Profile.module.scss'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
  return (
    <div className={s.content}>
      <ProfileInfo
          isOwner={props.isOwner}
          profile={props.profile}
          status={props.status}
          updateStatus={props.updateStatus}
          savePhoto={props.savePhoto}
          saveProfile={props.saveProfile}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;