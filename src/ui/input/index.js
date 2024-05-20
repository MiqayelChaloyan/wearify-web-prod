import React, { useEffect } from 'react';
import { useField } from 'formik';
import { useSelector } from 'react-redux';
import { at } from 'lodash';

import './style.css';

const InputField = (props) => {
    const { errorText, unit, ...rest } = props;
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;
    const { height, weight } = useSelector((state) => state.state);

    useEffect(() => {
        if (props.name === 'height' && height) {
            setValue(height);
        } else if (props.name === 'weight' && weight) {
            setValue(weight);
        }
    }, [height, weight, props.name, setValue]);

    const _renderHelperText = () => {
        const [touched, error] = at(meta, 'touched', 'error');
        if (touched && error) {
            return error;
        }
    };

    return (
        <div className='form-group'>
            <div className='input-wrapper'>
                <input type='text' {...field} {...rest} />
                <span className='unit'>{unit}</span>
            </div>
            {meta.touched && meta.error &&
                <span className='error-field'>
                    {_renderHelperText()}
                </span>
            }
        </div>
    );
};

export default InputField;
