import React from 'react'
import ImageGallery from './gallery'
import Header from './header'
import { inject, observer } from 'mobx-react'

const App = ({ rootStore }) => (
  <div>
    <Header/>
    <ImageGallery/>
  </div>
)

export default inject('rootStore')(observer(App))
