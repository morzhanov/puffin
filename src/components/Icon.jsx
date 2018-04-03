import React from 'react'
import { observer } from 'mobx-react'
import classnames from 'classnames'

const Icon = ({ id, onClick, extraClasses = [] }) => {
  return (
    <svg key={id}
      onClick={onClick}
      className={classnames('icon', ...extraClasses)}>
      <use xlinkHref={`#${id}`} />
    </svg>
  )
}

export default observer(Icon)
