import React from 'react'
import { observer, inject } from 'mobx-react'
import Gallery from 'react-photo-gallery'

const ImageGallery = ({ rootStore }) => {
  return (
    <Gallery photos={rootStore.allPhotos.toJSON()} margin={12} />
  )
}

export default inject('rootStore')(observer(ImageGallery))
