import styled from 'styled-components'
import PropTypes from 'prop-types'

const PrimaryButton = styled.button`
  font-family: ${({ font }) => font};
  color: ${({ color }) => color};
  background: ${({ background }) => background};
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'initial')};
  border-radius: ${({ radius }) => (radius ? `${radius}px` : '4px')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  padding: ${({ padding }) => (padding ? `${padding}px` : `${0.8}em ${1}em`)};
  font-weight: ${({ fontWeight }) => (fontWeight || '600')};
  ${({ fullWidth }) => (fullWidth
    ? `
      display: block;
      width: 100%;
    `
    : 'display: inline-block;')
  }
  height: ${({ height }) => height};
  box-sizing: border-box;
  font-size: 16px;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  border: none;
  appearance: none;
  box-sizing: border-box;
  ${({ margin }) => margin && `margin: ${margin}`};
  ${({ large }) => large && 'font-size: 2em;'};
  ${({ small }) => small && 'font-size: 1em;'};
  ${({ medium }) => medium && 'font-size: 1.25em;'};
  text-decoration: none;
  outline: 0;
  :active {
    transition: 200ms ease-in-out;
  }
  &:hover {
    color: ${({ activeColor }) => activeColor};
    background: ${({ activeBackground }) => activeBackground};
    transform: scale(1.01);
  }
`

const SecondaryButton = styled(PrimaryButton)`
  background-color: transparent;
  border: 1px solid ${({ color }) => color || '#373535'};
  padding: 12px 30px;
`

const TertiaryButton = styled(PrimaryButton)`
  background-color: transparent;
  font-weight: ${({ fontWeight }) => (fontWeight || 500)};
`

function Button({ radius, background, color, activeBackground, activeColor, disabled, uppercase, rounded, fontWeight, fullWidth, large, medium, small, secondary, areaLabel, ...otherProps }) {
  return (
    <PrimaryButton
      {...otherProps}
      color={color}
      activeColor={activeColor}
      disabled={disabled}
      background={background}
      activeBackground={activeBackground}
      uppercase={uppercase}
      rounded={rounded}
      fontWeight={fontWeight}
      fullWidth={fullWidth}
      large={large}
      medium={medium}
      small={small}
      radius={radius}
    />
  )
}

Button.defaultProps = {
  color: 'var(--primaryContrast)',
  disabled: false,
  uppercase: false,
  rounded: false,
  light: false,
  fullWidth: false,
  large: false,
  small: false,
  medium: false,
  secondary: false,
  background: 'var(--primary)',
  radius: 4,
  font: 'var(--secondaryFont)'
}

Button.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  uppercase: PropTypes.bool,
  rounded: PropTypes.bool,
  light: PropTypes.bool,
  fullWidth: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  background: PropTypes.string,
  secondary: PropTypes.bool,
  radius: PropTypes.number,
  font: PropTypes.string
  
}

export default Button

export { Button, SecondaryButton, TertiaryButton }