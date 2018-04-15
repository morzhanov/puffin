import React from 'react'
import styled from 'styled-components'
import Search from './Search'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar'
import LogoImage from '../assets/logo.png'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { inject, observer } from 'mobx-react/index'

const Logo = styled.img`
  height: 70%;
  width: auto;
  margin-right: 30px;
`

const Header = ({ rootStore, muiTheme }) => {
  return (
    <Toolbar style={{
      width: '100%',
      boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
      backgroundColor: muiTheme.palette.primaryColor
    }}>
      <ToolbarGroup>
        <Logo src={LogoImage}/>
      </ToolbarGroup>
      <ToolbarGroup style={{
        width: '100%',
        dislpay: 'flex'
      }}>
        <Search/>
      </ToolbarGroup>
    </Toolbar>
  )
}

export default muiThemeable()(
  inject('rootStore')(observer(Header))
)
