import { useField } from 'formik';
import { at } from 'lodash';

import './style.css';
// import { useSelector } from 'react-redux';

const InputField = (props) => {
    const { errorText, unit, ...rest } = props;
    const [field, meta] = useField(props);
    // const { height, weight } = useSelector((state) => state.state);

    function _renderHelperText() {
        const [touched, error] = at(meta, 'touched', 'error');
        if (touched && error) {
            return error;
        }
    };

    return (
        <div className='form-group'>
            <div className='input-wrapper'>
                <input type="text" {...field} {...rest} />
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
