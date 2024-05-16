import { logoUrl } from 'constants';
import './styles.css';

export default function SplashScreen() {
    return (
        <div className='container-splash'>
            <img src={logoUrl} alt='logo' className='img' />
        </div>
    )
};