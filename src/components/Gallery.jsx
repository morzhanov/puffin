import React from 'react'
import { observer, inject } from 'mobx-react'
import Gallery from 'react-photo-gallery'

class ImageGallery extends React.Component {
  componentDidMount () {
    window.onscroll = () => {
      const bottomOfWindow = (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) +
        window.innerHeight === document.documentElement.offsetHeight
      console.log(`scrolled bottomOfWindow = ${bottomOfWindow}`)
      if (bottomOfWindow) {
        this.props.rootStore.loadMore()
        console.log('bottom!')
      }
    }
  }

  render () {
    return (
      <Gallery photos={this.props.rootStore.allPhotos.toJSON()} margin={12}/>
    )
  }
}

export default inject('rootStore')(observer(ImageGallery))
