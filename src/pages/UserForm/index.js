import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { addData } from 'store/features/MeasurementsSlice';

import { Form, Formik } from 'formik';

import FIELDS from './checkoutFormModel';
import validateSchema from './validationSchema';
import formInitialValues from './formInitialValues';

import InputField from 'ui/input';
import ToggleSwitch from 'ui/toggleSwitch';

import { getClothesData } from 'utils/closetUtils';

import bodyTypes from 'constants/bodyTypes';
import { GeneralTexts, InputsTitles, ButtonsTexts } from 'constants';

import './styles.css';

// TODO - example
const ID = 1;
const isFemale = false;
/////////////////

export default function UserForm({
    next,
}) {
    const { formId, formField } = FIELDS;
    const currentValidationSchema = validateSchema[0];

    const dispatch = useDispatch();

    const {
        height,
        feet,
        inches,
        weight,
        isCentimeter,
        isKilogram
    } = formField;

    const [isCentimeterBool, setIsCentimeterBool] = useState(true);
    const [isKilogramBool, setIsKilogramBool] = useState(true);

    const handleToggle = (name, bool) => name === 'isCentimeter' ? setIsCentimeterBool(bool) : setIsKilogramBool(bool);


    const _submitForm = async (values, actions) => {

        actions.setSubmitting(false);

        const { height, weight } = values;

        const gender = isFemale ? 0 : 1;
        const closetItems = await getClothesData(gender);

        const [item] = closetItems?.data.filter(elem => elem.id === ID);
        let url = item?.closet_url;

        if (item?.is_closet) {
            const genderParams = isFemale ? bodyTypes.female : bodyTypes.male;
            url += `?&avatar_info=${genderParams.gender}_${genderParams.skinType}_${height}_${weight}_${genderParams.shapeType.RECTANGLE}`;
        }

        dispatch(addData({ ...values, url, isCloset: item?.is_closet }));

        return next()
    };

    const _handleSubmit = (values, actions) => {
        // console.log(values)
        _submitForm(values, actions);
    };

    return (
        <div className='step-form'>
            <h2 className='title'>
                {GeneralTexts.formTitle}
            </h2>
            <div className='line' />
            <Formik
                initialValues={formInitialValues}
                validationSchema={currentValidationSchema}
                onSubmit={_handleSubmit}
            >
                {({ isValid, dirty }) => (
                    <Form id={formId} className='form'>
                        <div className='container'>
                            <p className='step-text'>
                                {GeneralTexts.formHeaderText}
                            </p>
                            <div className='column'>
                                <p className='title-column'>
                                    {InputsTitles.height}
                                </p>
                                <div className='row'>
                                    {
                                        isCentimeterBool ?
                                            <div className='input-box'>
                                                <InputField
                                                    type='number'
                                                    unit='cm'
                                                    name={height.name}
                                                    className='form-input-style'
                                                />
                                            </div> :
                                            <>
                                                <div className='input-box'>
                                                    <InputField
                                                        type='number'
                                                        unit='fn'
                                                        name={feet.name}
                                                        className='form-input-feet-style'
                                                    />
                                                </div>
                                                <div className='input-box'>
                                                    <InputField
                                                        type='number'
                                                        unit='in'
                                                        name={inches.name}
                                                        className='form-input-feet-style'
                                                    />
                                                </div>
                                            </>
                                    }
                                    <ToggleSwitch
                                        name={isCentimeter.name}
                                        leftLabel='cm'
                                        rightLabel='in'
                                        onChange={handleToggle}
                                    />
                                </div>
                            </div>
                            <div>
                                <p className='title-column'>
                                    {InputsTitles.weight}
                                </p>
                                <div className='row'>
                                    <div className='input-box-weight'>
                                        <InputField
                                            type='number'
                                            unit={isKilogramBool ? 'kg' : 'ibs'}
                                            name={weight.name}
                                            className='form-input-style'
                                        />
                                    </div>
                                    <ToggleSwitch
                                        name={isKilogram.name}
                                        leftLabel='kg'
                                        rightLabel='ibs'
                                        onChange={handleToggle}
                                    />
                                </div>
                            </div>
                            <button
                                disabled={!(isValid && dirty)}
                                type='submit'
                                variant='contained'
                                color='primary'
                                className={`${!(isValid && dirty) ? 'disabled' : 'enabled'} button-next`}
                            >
                                {ButtonsTexts.send}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
};