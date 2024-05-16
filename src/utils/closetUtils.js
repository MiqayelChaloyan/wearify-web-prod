import axios from 'axios';

import { API_URL, API_ENDPOINTS } from 'constants/apiUrl';

export const getClothesData = async (gender) => {
    try {
        const apiUrl = `${API_URL}${API_ENDPOINTS.getData}`;

        const response = await axios.get(apiUrl, {
            params: {
                type: 2,
                gender,
                start: 0,
                end: 100
            },
            timeout: 10000
        });

        // console.log(response.data)

        return  {
            data: JSON.parse(response.data)
        };
    } catch (error) {
        if (error.response) {
            return {
                message: error.message,
                statusCode: error.response.status
            };
        } else if (error.request) {
            console.error('No response received from API:', error.message);
            return error.message;
        } else {
            console.error('Error setting up the request:', error.message);
            return error.message;
        }
    }
};