import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { updatedModalStatus } from 'store/features/ModalSwitch';
import { updatedAvatarLoadingStatus } from 'store/features/AvatarLoading';
import { updatedAvatarErrorStatus } from 'store/features/AvatarError';
import { setUserId } from 'store/features/UserId';

import { ref, set } from 'firebase/database';
import { database, storage } from 'firebaseDatabase';
import { uploadBytes, ref as sRef } from 'firebase/storage';

import { v4 as uuidv4 } from 'uuid';

import { IoClose } from 'react-icons/io5';

import avatars from 'constants/avatars';
import { GeneralTexts, ButtonsTexts } from 'constants';

import './styles.css';


const SelectAvatar = () => {
    const [isActive, setIsActive] = useState(avatars[0].id);
    const { url } = useSelector((state) => state.state);
    const dispatch = useDispatch();

    const hadnleClose = () => dispatch(updatedModalStatus());

    const handleSelectAvatar = (id) => setIsActive(id);


    const handleNext = async () => {
        hadnleClose();
        dispatch(updatedAvatarLoadingStatus(true));
        dispatch(updatedAvatarErrorStatus(false));
        const userId = uuidv4();
        dispatch(setUserId(userId));

        const result = avatars.filter((elem => elem.id === isActive));
        const { link, presetModel} = result[0];

        try {
            const response = await fetch(link);
            const blob = await response.blob();
            const newFile = new File([blob], 'example.png', { type: blob.type });

            const storageRef = sRef(storage, `WEB/${userId}/avatar_${userId}.png`);

            uploadBytes(storageRef, newFile);
        } catch (_) {
            console.log('File upload error', _)
        }

        set(ref(database, 'avatars/' + userId), {
            isLoading: true,
            isAvatarError: false,
        }).catch(err => console.log(err));


        set(ref(database, 'new/' + userId), {
            avatarURL: link,
            closetURL: url,
            status: 'new',
            presetBackground: '033',
            presetModel,
        }).catch(err => console.log(err))
    };

    return (
        <div className='avatar'>
            <div className='avatar-header'>
                <h2 className='close-avatar-select-title'>
                    {GeneralTexts.selectAvatarText}
                </h2>
                <button onClick={hadnleClose} className='close-avatar-select-btn'>
                    <IoClose />
                </button>
            </div>

            <div className='avatars'>
                {avatars.map(avatar => (
                    <button
                        key={avatar.id}
                        onClick={() => handleSelectAvatar(avatar.id)}
                        className={`avatar-button ${isActive === avatar.id && 'selected'}`}
                    >
                        <img
                            src={avatar.link}
                            alt='avatar'
                            className='avatar-img'
                        />
                    </button>
                ))}
            </div>
            <div className='avatar-footer'>
                <button
                    onClick={handleNext}
                    className='next-button'
                >
                    {ButtonsTexts.next}
                </button>
            </div>
        </div>
    )
};

export default SelectAvatar;