import React from 'react'
import ImageGallery from './Gallery'
import Header from './Header'
import { inject, observer } from 'mobx-react'

const App = ({ rootStore }) => (
  <div>
    <Header/>
    <ImageGallery/>
  </div>
)

export default inject('rootStore')(observer(App))
