import styled from 'styled-components'
import PropTypes from 'prop-types'

const OverlayStyled = styled.div`
  position: ${({ position }) => position || 'fixed'};
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: ${({ background }) => background || 'rgba(0,0,0, .5)'};
  z-index: ${({ zIndex }) => zIndex};
  backdrop-filter: blur(2px);
  visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
`

export default function Overlay(props) {
  const { children, ...otherProps } = props
  return (
    <OverlayStyled {...otherProps}>
      {children}
    </OverlayStyled>
  )
}

Overlay.defaultProps = {
  zIndex: 3
}

Overlay.propTypes = {
  children: PropTypes.element.isRequired
}