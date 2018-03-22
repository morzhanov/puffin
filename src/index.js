import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import App from './components/app'
import registerServiceWorker from './registerServiceWorker'

import './styles/main.css'
import RootStore from './stores/root'

const rootStore = RootStore.create()

const store = {
  root: rootStore
}

// TODO add ESLINT, DECORATORS, HOT RELOAD and OTHER features for development

const router = (
  <Provider {...store}>
    <App/>
  </Provider>
)

render(router, document.getElementById('root'))
registerServiceWorker()
