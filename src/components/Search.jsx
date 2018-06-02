import React from 'react'
import styled from 'styled-components'
import { TextField, IconButton } from 'material-ui'
import SearchIcon from 'material-ui/svg-icons/action/search'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { inject, observer } from 'mobx-react/index'

const SearchWrapper = styled.div`
  width: 50%;
  transition: all ease 300ms;
`

const SearchBar = styled.div`
  width: 100%;
  height: 28px;
  margin: auto;
  display: flex;
  align-items: center;
  input {
    width: 200px;
    height: inherit;
    padding: 4px 24px 4px 4px;
  }
`

class Search extends React.Component {
  constructor () {
    super()
    this.state = {
      focused: false
    }
  }

  onFocusChanged = (v) => {
    this.setState({focused: v})
  }

  render () {
    const rootStore = this.props.rootStore
    const muiTheme = this.props.muiTheme
    return (
      <SearchWrapper focused={this.state.focused}>
        <SearchBar>
          <TextField type="text"
            style={{width: '100%'}}
            inputStyle={{
              color: this.state.focused ? muiTheme.palette.textColor
                : muiTheme.palette.textColor
            }}
            onFocus={() => this.onFocusChanged(true)}
            onBlur={() => this.onFocusChanged(false)}
            underlineFocusStyle={{ borderColor: muiTheme.palette.textColor }}
            underlineStyle={{ borderColor: muiTheme.palette.textColor }}
            name="search"
            hintText="Search for images"
            hintStyle={{color: !rootStore.search
              ? muiTheme.palette.textColor : 'transparent',
            opacity: 0.8}}
            value={rootStore.search}
            onKeyPress={(e) => e.key === 'Enter' && rootStore.performSearch()}
            onChange={v => rootStore.changeSearch(v.target.value)}/>
          <IconButton className="icon"
            onClick={() => rootStore.changeSearch('')}
            style={{ marginLeft: '-32px' }}>
            {
              rootStore.search ? <CloseIcon/> : <SearchIcon/>
            }
          </IconButton>
        </SearchBar>
      </SearchWrapper>
    )
  }
}

export default muiThemeable()(inject('rootStore')(observer(Search)))
