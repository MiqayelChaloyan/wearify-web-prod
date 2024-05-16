import useTheme from 'hooks/useTheme';

import { IoClose } from 'react-icons/io5';
import { IoMdArrowRoundBack } from 'react-icons/io';

import './styles.css';

export default function Modal({
    children,
    currentStepIndex,
    _handleBack
}) {
    const { theme } = useTheme();
    const styles = { backgroundColor: theme };
    const buttonHeadStyles = currentStepIndex !== 2 ? { right: 0 } : { left: '20px' };
    const buttonStyles = { color: '#FFFFFF' };
    const classNameButtons = currentStepIndex !== 2 ? 'modal-header' : 'modal-header-web-view';

    const handleClose = () => document.getElementById('modal-viewer').style.display = 'none';

    return (
        <div
            id='modal-viewer'
            className="modal"
            style={styles}
        >
            <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                    {currentStepIndex !== 0 &&
                        <div className={classNameButtons} style={buttonHeadStyles}>
                            <button
                                onClick={handleClose}
                                className='modal-button'
                                style={buttonStyles}
                            >
                                <IoClose />
                            </button>
                            {currentStepIndex === 2 && (
                                <>
                                    <div className='button-line' />
                                    <button
                                        onClick={_handleBack}
                                        className='modal-button-back'
                                        style={buttonStyles}
                                    >
                                        <IoMdArrowRoundBack />
                                    </button>
                                </>
                            )}
                        </div>
                    }
                    {children}
                </div>
            </div>
        </div>
    )
};
