import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import './styles.css';

const FinalResult = () => {
    const [url, setUrl] = useState(null);
    const { userId } = useSelector((state) => state);

    const storage = getStorage();
    const starsRef = ref(storage, `WEB/${userId.userId}/final_${userId.userId}.png`);

    useEffect(() => {
        getDownloadURL(starsRef)
            .then((url) => {
                setUrl(url)
            })
    }, []);

    return (
        <div className='avatar-flow'>
            <img src={url} className='final-avatar' />
        </div>
    )
};

export default FinalResult;