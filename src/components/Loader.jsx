import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import muiThemeable from 'material-ui/styles/muiThemeable'
import CircularProgress from 'material-ui/CircularProgress'

const LoaderWrapper = styled.div`
  top: 57px;
  left: 0;
  position: fixed;
  opacity: 0.9;
  background-color: ${({color}) => color};
  width: 100%;
  height: calc(100% - 57px);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;  
`

const Loader = ({ muiTheme }) => (
  <LoaderWrapper color={muiTheme.palette.textColor}>
    <CircularProgress color={muiTheme.palette.primaryColor}
      size={60}
      thickness={7} />
  </LoaderWrapper>
)

export default muiThemeable()(observer(Loader))
