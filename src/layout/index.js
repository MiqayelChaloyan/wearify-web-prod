import { useEffect } from 'react';

import Modal from 'components/Modal';

import { useMultistepForm } from 'hooks/useMultistepForm';

// Pages
import SplashScreen from 'pages/SplashScreen';
import UserForm from 'pages/UserForm';
import WebView from 'pages/WebView';


export default function Layout() {

    const handleNext = () => next();

    const { currentStepIndex, step, back, next } =
        useMultistepForm([
            <SplashScreen />,
            <UserForm next={handleNext} />,
            <WebView />
        ]);

    useEffect(() => {
        let isMounted = true;

        const intervalId = setTimeout(() => {
            if (isMounted) {
                next();
            }
        }, 5000);

        return () => {
            isMounted = false;
            clearTimeout(intervalId);
        };
    }, []);

    return (
        <Modal
            currentStepIndex={currentStepIndex}
            _handleBack={back}
        >
            {step}
        </Modal>
    )
};