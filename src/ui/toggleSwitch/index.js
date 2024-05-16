import React from 'react';

import { useField } from 'formik';

import './style.css'

const ToggleSwitch = ({
    name,
    leftLabel,
    rightLabel,
    onChange
}) => {
    const [field, , helpers] = useField(name);

    const handleToggle = () => {
        helpers.setValue(!field.value);
        onChange(name, !field.value)
    };

    return (
        <div className='toggle-switch'>
            <p className='label'>
                {leftLabel}
            </p>
            <label id={name} className='switch'>
                <input
                    type='checkbox'
                    onChange={handleToggle}
                    name={name}
                    id={name}
                />
                <span className='slider round' />
            </label>
            <p className='label'>
                {rightLabel}
            </p>
        </div>
    );
};

export default ToggleSwitch;
