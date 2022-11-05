import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Routes from './Component/Routes';
import { Provider } from 'react-redux'
import configureStore from './store/index'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
// import { orange } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#588157',
    },
    secondary: {
      main: '#3A5A40',
    },
  },
});

export const store = configureStore({});
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
