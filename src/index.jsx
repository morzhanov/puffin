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
  savedSearch: '',
  page: 1,
  photos: [
    { src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599', full: '', width: 4, height: 3 },
    { src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799', full: '', width: 1, height: 1 },
    { src: 'https://source.unsplash.com/qDkso9nvCg0/600x799', full: '', width: 3, height: 4 },
    { src: 'https://source.unsplash.com/iecJiKe_RNg/600x799', full: '', width: 3, height: 4 },
    { src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799', full: '', width: 3, height: 4 },
    { src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599', full: '', width: 4, height: 3 },
    { src: 'https://source.unsplash.com/zh7GEuORbUw/600x799', full: '', width: 3, height: 4 },
    { src: 'https://source.unsplash.com/PpOHJezOalU/800x599', full: '', width: 4, height: 3 },
    { src: 'https://source.unsplash.com/I1ASdgphUH4/800x599', full: '', width: 4, height: 3 }
  ]
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
