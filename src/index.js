import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import minesReducer from './reducers/minesReducer';
import './style/index.css';
import App from './components//App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(minesReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();

