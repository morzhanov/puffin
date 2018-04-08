import { spacing } from 'material-ui/styles'
import { red500 } from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'

export default (customPalette = {}) => {
  const palette = {
    primaryColor: customPalette.primary1Color || '#47d1cb',
    accentColor: customPalette.accent1Color || '#4939a0',
    textColor: customPalette.textColor || '#757575',
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
