import { useSelector } from 'react-redux';

import './styles.css';

export default function WebView() {
    const state = useSelector((state) => state.state);

    // document.addEventListener('DOMContentLoaded', function() {
    //     document.getElementsByClassName('e1p0l5j40').style.display = 'none';
    // });
    
    return (
        <iframe
            title='webview'
            src={state?.url}
            // src='https://style.clo-set.com/fitting/sO15%2B%2F0YITvl0q9vrefpDQ%3D%3D?avatar_info=1_131338e96683431eb6c6e3267b94ce6f_160_40_0'
            className='iframe'
        />
    );
};