import './styles/main.scss'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader'
import RootStore from './stores/rootStore'
import App from './components/app'
import registerServiceWorker from './registerServiceWorker'

const rootStore = RootStore.create({search: ''})

render(
  <AppContainer>
    <Provider rootStore={rootStore}>
      <App/>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
)

registerServiceWorker()

if (module.hot) {
  module.hot.accept('./components/app', () => {
    const NextApp = require('./components/app').default

    render(
      <AppContainer>
        <Provider rootStore={rootStore}>
          <NextApp/>
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
