import React from 'react'
import styled from 'styled-components'
import Icon from './Icon'
import { TextField } from 'material-ui'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { inject, observer } from 'mobx-react/index'

const SearchWrapper = styled.div`
  width: 100%;
`

const SearchBar = styled.div`
  width: 200px;
  height: 28px;
  margin: auto;
  display: flex;
  align-items: center;
  input {
    width: 200px;
    height: inherit;
    padding: 4px 24px 4px 4px;
  }
  .icon {
    width: 20px;
    height: 20px;
    margin-left: -26px;
    cursor: pointer;
  }
  button {
    position: absolute;
    top: 24px;
    right: 24px;
  }
`

const Search = ({ rootStore, muiTheme }) => {
  return (
    <SearchWrapper>
      <SearchBar>
        <TextField type="text"
          underlineStyle={{borderColor: muiTheme.palette.primaryColor}}
          name="search"
          value={rootStore.search}
          onKeyPress={(e) => e.key === 'Enter' && rootStore.performSearch()}
          onChange={v => rootStore.changeSearch(v.target.value)}/>
        <Icon id="fa-search"
          color={muiTheme.palette.primaryColor}
          onClick={() => rootStore.performSearch()}/>
      </SearchBar>
    </SearchWrapper>
  )
}

export default muiThemeable()(inject('rootStore')(observer(Search)))
