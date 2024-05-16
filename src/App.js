import Layout from 'layout';

import { ThemeProvider } from 'context';

import './App.css';

const App = () => (
  <ThemeProvider>
    <Layout />
  </ThemeProvider>
);

export default App;
