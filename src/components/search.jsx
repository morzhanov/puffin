import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react/index'

const SearchBar = styled.input`
  width: 200px;
  height: 24px;
`

const Search = ({ rootStore }) => {
  return (
    <SearchBar type="text" value={rootStore.search} onChange={v => rootStore.changeSearch(v.target.value)} />
  )
}

export default inject('rootStore')(observer(Search))
