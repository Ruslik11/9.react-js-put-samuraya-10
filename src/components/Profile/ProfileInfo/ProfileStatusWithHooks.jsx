import React, {useState, useEffect} from 'react';

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    const activateMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    };

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    return (
        <div>
            {!editMode && <div>
                <b>Status</b>:
                <span
                    onDoubleClick={activateMode}
                >{props.status || 'No status'}</span>
            </div>}
            {editMode && <div>
                <input
                    type="text"
                    autoFocus={true}
                    onBlur={deactivateEditMode}
                    value={status}
                    onChange={onStatusChange}
                />
            </div>}
        </div>
    )
};

export default ProfileStatusWithHooks;