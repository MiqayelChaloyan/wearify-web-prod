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

const MEASUREMENTS = {
    [height.name]: '',
    [feet.name]: '',
    [inches.name]: '',
    [weight.name]: '',
    [isCentimeter.name]: true,
    [isKilogram.name]: true,
};

export default MEASUREMENTS;
