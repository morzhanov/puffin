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
  // currentPhoto: 'https://images.unsplash.com/photo-1499054488849-3dd812295ef0?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjIyNDUzfQ&s=91f375d53854ae7c41f17a794b4419dc',
  page: 1,
  photos: []
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
