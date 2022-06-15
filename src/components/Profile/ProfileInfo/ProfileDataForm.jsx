import React from 'react';
import s from './ProfileInfo.module.scss'
import {reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import styles from "../../common/FormsControls/FormsControls.module.scss";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form>
        <div>
            <button onClick={handleSubmit}>Save</button>
        </div>
        {error && <div className={styles.formSummaryError}>
            {error}
        </div>}
        <div>
            <b>Full name</b>:
            {createField("fullName", [], Input, "Full name")}
        </div>
        <div>
            <b>Looking for a job</b>:
            {createField("lookingForAJob", [], Input, "lookingForAJob", {type: "checkbox"})}
        </div>
        <div>
            <b>My professional skills</b>:
            {createField("lookingForAJobDescription", [], Textarea, "My professional skills")}
        </div>
        <div><b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <div className={s.contact} key={key}>
                <b>{key}</b>: {createField(`contacts.${key}`, [], Input, key)}
            </div>
        })}</div>
        <div>
            <b>About me</b>:
            {createField("aboutMe", [], Textarea, "About Me")}
        </div>
    </form>
};

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormReduxForm;