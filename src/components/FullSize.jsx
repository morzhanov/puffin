import React from 'react'
import ReactDOM from 'react-dom'
import { inject, observer } from 'mobx-react'
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

const ArrowPanel = styled.div`
  background-color: rgba(98,98,98,0.46);
  min-width: 8%;
  max-width: 8%;
  width: 100px;
  position: fixed;
  top: 0;
  left: ${({ left }) => left ? 0 : 'auto'};
  right: ${({ left }) => left ? 'auto' : 0};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;  
  cursor: pointer;
  transition: all ease 300ms;
  .arrow {
    width: 70% !important;
    height: 70% !important;
    color: rgba(174,174,174,0.75) !important;
    &:hover {
      color: rgba(174,174,174,0.98) !important;
    }
  }
  &:hover {
    background-color: rgba(98,98,98,0.61);
  }
`

const Image = styled.img`
  width: auto;
  height: 80%;
`

class FullSize extends React.Component {
  constructor (props) {
    super(props)
    this.image = React.createRef()
  }
  next = e => {
    this.props.rootStore.nextImage()
    e.stopPropagation()
  }
  prev = e => {
    this.props.rootStore.prevImage()
    e.stopPropagation()
  }
  handleOutsideClick = e => {
    if (ReactDOM.findDOMNode(this.image.current) !== e.target) {
      this.props.rootStore.closePhoto()
    }
  }
  render () {
    const {rootStore} = this.props
    return <Wrapper onClick={this.handleOutsideClick}>
      <ArrowPanel onClick={this.prev} left>
        <ArrowLeft className="arrow"/>
      </ArrowPanel>
      <Paper style={{
        overflow: 'hidden',
        maxWidth: '80%',
        display: 'flex',
        justifyContent: 'center'
      }}
      zDepth={4}>
        <Image ref={this.image}
          className="disable-select"
          src={rootStore.currentPhoto}/>
      </Paper>
      <ArrowPanel onClick={this.next}>
        <ArrowRight className="arrow"/>
      </ArrowPanel>
    </Wrapper>
  }
}

export default inject('rootStore')(observer(FullSize))
