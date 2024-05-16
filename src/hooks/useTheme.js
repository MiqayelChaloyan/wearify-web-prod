import { useContext } from 'react';
import { ThemeContext } from 'context';

const useTheme = () => {
    const value = useContext(ThemeContext);
    return value;
};

export default useTheme;