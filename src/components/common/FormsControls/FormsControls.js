import React from 'react'
import styles from './FormsControls.module.scss'
import {Field} from "redux-form";

const FormControl = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={`${styles.formControl} ${(touched && error) ? styles.error : ''}`}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
};

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
};

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
};

export const CreateField = (name, validators, component, placeholder, props = {}, text = "") => (
    <div>
        <Field component={component} name={name}
               validate={validators}
               placeholder={placeholder}
               {...props}
        />
        {text}
    </div>);
