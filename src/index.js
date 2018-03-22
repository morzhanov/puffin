import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import registerServiceWorker from './registerServiceWorker';

import './stylesheets/common.css';
import RootStore from "./stores/root";

const rootStore = RootStore.create();

const store = {
  root: rootStore
};

const router = (
  <Provider {...store}>
    <div>
      <App />
    </div>
  </Provider>
);

render(router, document.getElementById('root'));
registerServiceWorker();
