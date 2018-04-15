import React from 'react'
import { observer, inject } from 'mobx-react'
import Paper from 'material-ui/Paper'
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color:rgba(98,98,98,0.73);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  width: auto;
  height: 80%;
`

const arrowStyles = {
  width: 50,
  height: 50,
  cursor: 'pointer'
}

class FullSize extends React.Component {
  componentDidMount () {

  }

  next = () => (this.props.rootStore.nextImage())

  prev = () => (this.props.rootStore.prevImage())

  render () {
    const {rootStore} = this.props
    return <Wrapper>
      <ArrowLeft className="arrow"
        onClick={this.prev}
        style={arrowStyles}/>
      <Paper zDepth={4}>
        <Image src={rootStore.currentPhoto}/>
      </Paper>
      <ArrowRight className="arrow"
        onClick={this.next}
        style={arrowStyles}/>
    </Wrapper>
  }
}

export default inject('rootStore')(observer(FullSize))
