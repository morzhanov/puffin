import React from 'react'
import { observer, inject } from 'mobx-react'
import Paper from 'material-ui/Paper'
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import styled from 'styled-components'
// import Loader from './Loader'

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
    width: 70px !important;
    height: 70px !important;
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
  componentDidMount () {

  }

  next = () => (this.props.rootStore.nextImage())

  prev = () => (this.props.rootStore.prevImage())

  render () {
    const {rootStore} = this.props
    return <Wrapper>
      <ArrowPanel left>
        <ArrowLeft className="arrow" onClick={this.prev}/>
      </ArrowPanel>
      <Paper zDepth={4}>
        <Image src={rootStore.currentPhoto}/>
      </Paper>
      <ArrowPanel>
        <ArrowRight className="arrow" onClick={this.next}/>
      </ArrowPanel>
    </Wrapper>
  }
}

export default inject('rootStore')(observer(FullSize))
