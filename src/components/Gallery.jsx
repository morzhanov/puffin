import React from 'react'
import { observer, inject } from 'mobx-react'
import Paper from 'material-ui/Paper'
import styled from 'styled-components'

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
      console.log(`scrolled bottomOfWindow = ${bottomOfWindow}`)
      if (bottomOfWindow) {
        this.props.rootStore.loadMore()
        console.log('bottom!')
      }
    }
  }

  render () {
    const photos = this.props.rootStore.allPhotos
    return (
      <Gallery>
        {
          photos.map(e => <Box>
            <Paper className="gallery-item"
              zDepth={4}
              style={paperStyle({ url: e.src })}/>
          </Box>)
        }
      </Gallery>
    )
  }
}

export default inject('rootStore')(observer(ImageGallery))
