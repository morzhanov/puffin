import React from 'react'
import { observer, inject } from 'mobx-react'
import Paper from 'material-ui/Paper'
import styled from 'styled-components'
import FullSize from './FullSize'
import Example from './Example'
import Loader from './Loader'
const Fragment = React.Fragment

const paperStyle = (props) => ({
  backgroundImage: `url(${props.url})`
})

const Gallery = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

const Box = styled.div`
  height: 30vh;
  width: 30%;
  margin: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

class ImageGallery extends React.Component {
  componentDidMount () {
    window.onscroll = () => {
      const bottomOfWindow = (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) +
        window.innerHeight === document.documentElement.offsetHeight
      if (bottomOfWindow) {
        this.props.rootStore.loadMore()
      }
    }
  }

  render () {
    const {rootStore} = this.props
    return (
      <Fragment>
        {!rootStore.allPhotos.length && <Example/>}
        <Gallery>
          {
            rootStore.allPhotos.map(e => <Box key={e.id}>
              <Paper key={e.id} className="gallery-item"
                onClick={() => rootStore.openPhoto(e.regular)}
                zDepth={4}
                style={paperStyle({ url: e.src })}/>
            </Box>)
          }
        </Gallery>
        {rootStore.currentPhoto && <FullSize/>}
        {rootStore.loading && <Loader/>}
      </Fragment>
    )
  }
}

export default inject('rootStore')(observer(ImageGallery))
