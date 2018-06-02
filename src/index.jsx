import './styles/main.scss'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader'
import { MuiThemeProvider } from 'material-ui'
import RootStore from './stores/rootStore'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import theme from './utils/theme'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

const rootStore = RootStore.create({
  search: '',
  loading: false,
  savedSearch: '',
  page: 1,
  totalPages: 0,
  photos: [],
  fetching: false
})

render(
  <AppContainer>
    <Provider rootStore={rootStore}>
      <MuiThemeProvider muiTheme={getMuiTheme(theme())}>
        <App/>
      </MuiThemeProvider>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
)

registerServiceWorker()

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default

    render(
      <AppContainer>
        <Provider rootStore={rootStore}>
          <MuiThemeProvider muiTheme={getMuiTheme(theme())} >
            <NextApp/>
          </MuiThemeProvider>
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
