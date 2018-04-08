import React from 'react'
import styled from 'styled-components'
import Search from './Search'
import LogoImage from '../assets/logo.png'
import { inject, observer } from 'mobx-react/index'

const HeaderWrapper = styled.header`
  width: 100%;
  height: 200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

const Logo = styled.img`
  position: absolute;
  top: 24px;
  left: 24px;
  height: 80px;
  width: 80px;
`

const Header = ({ rootStore }) => {
  return (
    <HeaderWrapper>
      <Logo src={LogoImage} />
      <h1>Puffin. Search for Images.</h1>
      <Search/>
    </HeaderWrapper>
  )
}

export default inject('rootStore')(observer(Header))
