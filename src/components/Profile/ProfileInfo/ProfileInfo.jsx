import React, { useState } from 'react';
import s from './ProfileInfo.module.scss'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files[0]) {
            savePhoto(e.target.files[0]);
        }
    };

    const onSubmit = (formData) => {
        saveProfile(formData).then(() => {
            setEditMode(false);
        })
    };

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile?.photos?.large || 'https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg'} alt=""/>
                <h1>{profile.fullName}</h1>
                {isOwner && <input
                    type="file"
                    onChange={onMainPhotoSelected}
                />}
                {editMode
                    ? <ProfileDataForm initialValues={profile} onSubmit={onSubmit} profile={profile} />
                    : <ProfileData goToEditMode={() => setEditMode(true)} profile={profile} isOwner={isOwner} />}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
        </div>
    );
};

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div>
            <button
                onClick={goToEditMode}
            >Edit</button>
        </div>}
        <div><b>Full name</b>: {profile.fullName}</div>
        <div><b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}</div>
        {profile.lookingForAJob && <div><b>My professional skills</b>: {profile.lookingForAJobDescription}</div>}
        <div><b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return profile.contacts[key] && <Contact contactTitle={key} key={key} ContactValue={profile.contacts[key]} />
        })}</div>
        <div><b>About me</b>: {profile.aboutMe}</div>
    </div>
};

const Contact = ({contactTitle, ContactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {ContactValue}</div>
};

export default ProfileInfo;
