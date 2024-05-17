import React, { useRef } from 'react';

import * as htmlToImage from 'html-to-image';

import { createFileName, useScreenshot } from 'use-react-screenshot';

import useTheme from 'hooks/useTheme';

import { IoClose } from 'react-icons/io5';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { BsFillCameraFill } from 'react-icons/bs';

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
    const ref = useRef(null);

    const handleClose = () => document.getElementById('modal-viewer').style.display = 'none';


    // Screnshot
    const [image, takeScreenshot] = useScreenshot();

    const takeScreenShot = async (node) => {
        const dataURI = await htmlToImage.toJpeg(node);
        return dataURI;
    };

    const download = (image, { name = "img", extension = "jpg" } = {}) => {
        const a = document.createElement("a");
        a.href = image;
        a.download = createFileName(extension, name);
        a.click();
    };

    const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

    /////////////////////////////

    return (
        <div
            id='modal-viewer'
            className="modal"
            style={styles}
        >
            <div className='modal-dialog' role='document'>
                <div ref={ref} className='modal-content'>
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
                                    <div className='button-line' />
                                    <button
                                        onClick={downloadScreenshot}
                                        className='camera-button'
                                    >
                                        <BsFillCameraFill color='white' />
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
