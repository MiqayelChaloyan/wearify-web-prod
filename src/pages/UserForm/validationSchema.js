import * as Yup from 'yup';

import checkoutFormModel from './checkoutFormModel';

const {
  formField: {
    height,
    feet,
    inches,
    weight,
    isCentimeter,
    isKilogram,
  }
} = checkoutFormModel;

const validateSchema = [
  Yup.object().shape({
    [height.name]: Yup
      .number()
      .positive()
      .integer()
      .min(90, "Min is 90")
      .max(230, "Max is 230")
      // .required(`${feet.requiredErrorMsg}`)
      .typeError(`${feet.typeError}`),
    [feet.name]: Yup
      .number()
      .positive()
      .integer()
      .min(90, "Min is 90")
      .max(230, "Max is 230")
      // .required(`${feet.requiredErrorMsg}`)
      .typeError(`${feet.typeError}`),
    [inches.name]: Yup
      .number()
      .positive()
      .integer()
      .min(3, "Min is 3")
      .max(7, "Max is 7")
      .typeError(`${feet.typeError}`),
    [weight.name]: Yup
      .number()
      .positive()
      .integer()
      .min(25, "Min is 25")
      .max(200, "Max is 200")
      .typeError(`${weight.typeError}`)
      .required(`${weight.requiredErrorMsg}`),
    [isCentimeter.name]: Yup.bool(),
    [isKilogram.name]: Yup.bool(),
  }),
];

export default validateSchema;