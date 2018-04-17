import React from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton'
import muiThemeable from 'material-ui/styles/muiThemeable'

const ExampleWrapper = styled.div`
  width: 100%;
  height: 80%;
  text-align: center;
`

const Or = styled.p`
  font-size: 14px;
  font-weight: normal;
  opacity: 0.5;
  text-align: center;
  color: ${({color}) => color}
`

const Example = ({ muiTheme, rootStore }) => (
  <ExampleWrapper>
    <RaisedButton style={{
      width: 300,
      height: 64,
      marginTop: '20%'
    }}
    buttonStyle={{
      backgroundColor: muiTheme.palette.accentColor,
    }}
    labelStyle={{
      fontSize: 24,
    }}
    label="See the Puffins!"
    onClick={() => {
      rootStore.changeSearch('Puffin')
      rootStore.performSearch()
    }}
    primary={true} />
    <br/>
    <Or color={muiTheme.palette.accentColor}>Or search for images via search bar above</Or>
  </ExampleWrapper>
)

export default muiThemeable()(inject('rootStore')(observer(Example)))
