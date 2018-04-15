import { spacing } from 'material-ui/styles'
import { red500 } from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'

export default (customPalette = {}) => {
  const palette = {
    primaryColor: customPalette.primary1Color || '#00bcd4',
    accentColor: customPalette.accent1Color || '#ff4081',
    textColor: customPalette.textColor || '#fff',
    textColorGray: '#626262',
  }
  return {
    spacing,
    borderRadius: 2,
    listItem: {
      fontSize: '11px',
    },
    subheader: {
      color: fade(palette.textColor, 0.8),
    },
    card: {
      titleColor: fade(palette.textColor, 0.87),
      subtitleColor: fade(palette.textColor, 0.54),
    },
    textField: {
      floatingLabelColor: fade(palette.textColor, 0.8),
      borderColor: fade(palette.textColor, 0.8),
      nonFieldErrorsColor: red500,
    },
    palette,
  }
}
