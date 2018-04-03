import React from 'react'
import ImageGallery from './Gallery'
import Header from './Header'
import Icons from './Icons'
import { inject, observer } from 'mobx-react'

const App = ({ rootStore }) => (
  <div>
    <Icons/>
    <Header/>
    <ImageGallery/>
  </div>
)

export default inject('rootStore')(observer(App))
