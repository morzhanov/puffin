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
  font-size: 12px;
  font-weight: normal;
  opacity: 0.5;
  text-align: center;
  color: ${({color}) => color}
`

const Example = ({ muiTheme, rootStore }) => (
  <ExampleWrapper>
    <RaisedButton style={{
      marginTop: '20%'
    }}
    labelStyle={{
      fontSize: 18,
    }}
    label="See the Puffins!"
    onClick={() => {
      rootStore.changeSearch('Puffin')
      rootStore.performSearch()
    }}
    primary={true} />
    <br/>
    <Or color={muiTheme.palette.textColorGray}>Or search for images via search bar above</Or>
  </ExampleWrapper>
)

export default muiThemeable()(inject('rootStore')(observer(Example)))
