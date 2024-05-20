import Layout from 'layout';

import { ThemeProvider } from 'context';

import { useSelector } from 'react-redux';

import SelectAvatar from 'components/SelectAvatar';

import './App.css';


const App = () => {
  const { isDisplay } = useSelector((state) => state.isDisplay);

  return (
    <ThemeProvider>
      <Layout />
      {isDisplay &&
        <div className='select-avatar'>
          <SelectAvatar />
        </div>}
    </ThemeProvider>
  )

};

export default App;
