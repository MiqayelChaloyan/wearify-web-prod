import React, { useRef, useState } from 'react';

import useTheme from 'hooks/useTheme';

import { IoClose } from 'react-icons/io5';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { BsFillCameraFill } from 'react-icons/bs';

import './styles.css';

// Variant - 1
// import * as htmlToImage from 'html-to-image';
// import { createFileName, useScreenshot } from 'use-react-screenshot';

// Variant - 2
// import html2canvas from 'html2canvas';
// Variant - 3
import ReactToPrint from 'react-to-print';


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


    // Screnshots
    // Variant -1   
    // const ref = useRef(null);
    // const [image, takeScreenshot] = useScreenshot({
    //     type: 'image/jpeg',
    //     quality: 1.0
    // });

    // const takeScreenShot = async (node) => {
    //     const dataURI = await htmlToImage.toJpeg(node);
    //     return dataURI;
    // };

    // const download = (image, { name = "img", extension = "jpg" } = {}) => {
    //     const a = document.createElement("a");
    //     a.href = image;
    //     a.download = createFileName(extension, name);
    //     a.click();
    // };

    // const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

    // Variant - 2
    // const screenRef = useRef();

    // const takeScreenshot = () => {
    //   html2canvas(screenRef.current, { useCORS: true, logging: true })
    //     .then((canvas) => {
    //       const imgData = canvas.toDataURL('image/png');
    //       const link = document.createElement('a');
    //       link.href = imgData;
    //       link.download = 'screenshot.png';
    //       link.click();
    //     })
    //     .catch((err) => {
    //       console.error('Screenshot error:', err);
    //     });
    // };
    // Variant - 3
    const componentRef = useRef();
    /////////////////////////////

    return (
        <div
            id='modal-viewer'
            className='modal'
            style={styles}
            ref={componentRef}
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
                            {/* {currentStepIndex === 2 && ( */}
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
                                    {/* <button
                                    // onClick={handleSave}
                                    className='camera-button'
                                >
                                    <BsFillCameraFill color='white' />
                                </button> */}
                                    <ReactToPrint
                                        trigger={() =>
                                            <button
                                                className='camera-button'
                                            >
                                                <BsFillCameraFill color='white' />
                                            </button>}
                                        content={() => componentRef.current}
                                    />
                                </>
                            {/* )} */}
                        </div>
                    }
                    {children}
                </div>
            </div>
        </div>
    )
};
