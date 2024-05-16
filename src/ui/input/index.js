import { useField } from 'formik';
import { at } from 'lodash';

import './style.css';

const InputField = (props) => {
    const { errorText, unit, ...rest } = props;
    const [field, meta] = useField(props);

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
