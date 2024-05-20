import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updatedModalStatus } from 'store/features/ModalSwitch';
import { updatedAvatarErrorStatus } from 'store/features/AvatarError';
import { updatedAvatarLoadingStatus } from 'store/features/AvatarLoading';

import { getDatabase, onValue, ref } from 'firebase/database';

import useTheme from 'hooks/useTheme';

import { IoClose } from 'react-icons/io5';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { BsFillCameraFill } from 'react-icons/bs';

import { Oval, ThreeDots } from 'react-loading-icons';

import FinalResult from 'pages/FinalResult';

import { colors, StatusTexts } from 'constants';

import './styles.css';


export default function Modal({
    children,
    currentStepIndex,
    _handleBack
}) {
    const { theme } = useTheme();

    const { isLoading } = useSelector((state) => state.isAvatarLoading);
    const { isAvatarError } = useSelector((state) => state.avatarError);
    const [showFinal, setShowFinal] = useState(false);

    const dispatch = useDispatch();
    const { setTheme } = useTheme();

    const { userId } = useSelector((state) => state);

    const styles = { backgroundColor: theme };
    const buttonHeadStyles = currentStepIndex !== 2 ? { right: 0 } : { left: '20px' };
    const buttonStyles = { color: '#FFFFFF' };

    const classNameButtons = currentStepIndex !== 2 ? 'modal-header' : `modal-header-web-view ${isLoading || isAvatarError ? 'top' : ''}`;
    const classNameFinalBtn = 'modal-header-small-view';


    const handleClose = () => document.getElementById('modal-viewer').style.display = 'none';

    const handleSubmitCamera = () => dispatch(updatedModalStatus());

    useEffect(() => {
        if (userId) {
            const db = getDatabase();

            const starCountRef = ref(db, 'avatars/' + userId.userId);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                if (!data?.isLoading) {
                    dispatch(updatedAvatarLoadingStatus(false));
                    dispatch(updatedAvatarErrorStatus(false));

                    setTheme(colors.darkBlue)
                    setShowFinal(true);
                } else {
                    dispatch(updatedAvatarLoadingStatus(true));
                    dispatch(updatedAvatarErrorStatus(false));

                    setTheme(colors.darkBlue);
                }
                if (data?.isAvatarError) {
                    dispatch(updatedAvatarErrorStatus(true));
                    dispatch(updatedAvatarLoadingStatus(false));

                    setTheme('#ffcc00')
                }
            });
        }
    }, [userId])

    return (
        <div
            id='modal-viewer'
            className='modal'
            style={styles}
        >
            <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                    {currentStepIndex !== 0 &&
                        <div className={!showFinal ? classNameButtons : classNameFinalBtn} style={buttonHeadStyles}>
                            <button
                                onClick={handleClose}
                                className='modal-button'
                                style={buttonStyles}
                            >
                                <IoClose />
                            </button>
                            {currentStepIndex === 2 && !showFinal && (
                                <>
                                    <div className='button-line' />
                                    <button
                                        onClick={_handleBack}
                                        className='modal-button-back'
                                        style={buttonStyles}
                                        disabled={isLoading || isAvatarError}
                                    >
                                        {isLoading ? <Oval width={30} height={50} /> : <IoMdArrowRoundBack color='white' />}
                                    </button>
                                    <div className='button-line' />
                                    <button
                                        onClick={handleSubmitCamera}
                                        className='camera-button'
                                    >
                                        <BsFillCameraFill color='white' />
                                    </button>
                                </>
                            )}
                        </div>
                    }
                    {isLoading &&
                        <div className='loading-content'>
                            <h2 className='loading-avatar'>{StatusTexts.loading}</h2>
                            <ThreeDots width={20} />
                        </div>}
                    {isAvatarError && <h2 className='avatar-error'>{StatusTexts.error}</h2>}
                    {showFinal ? <FinalResult /> : children}
                </div>
            </div>
        </div>
    )
};
