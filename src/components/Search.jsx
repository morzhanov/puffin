import React from 'react'
import styled from 'styled-components'
import Icon from './Icon'
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
    color: #5a49ff;
  }
`

const Search = ({ rootStore }) => {
  return (
    <SearchWrapper>
      <SearchBar>
        <input type="text"
          value={rootStore.search}
          onKeyPress={(e) => e.key === 'Enter' && rootStore.performSearch()}
          onChange={v => rootStore.changeSearch(v.target.value)}/>
        <Icon id="fa-search"
          onClick={() => rootStore.performSearch()}/>
      </SearchBar>
    </SearchWrapper>
  )
}

export default inject('rootStore')(observer(Search))
