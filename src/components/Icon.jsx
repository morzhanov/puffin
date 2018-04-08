import React from 'react'
import { observer } from 'mobx-react'
import classnames from 'classnames'

const Icon = ({ id, onClick, extraClasses = [], color }) => {
  return (
    <svg key={id}
      style={{color: color}}
      onClick={onClick}
      className={classnames('icon', ...extraClasses)}>
      <use xlinkHref={`#${id}`} />
    </svg>
  )
}

export default observer(Icon)
