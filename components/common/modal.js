import styled from 'styled-components'
import Close from '@material-ui/icons/Close'
import PropTypes from 'prop-types'

const ModalStyled = styled.div`
  background: ${({ background }) => background ? background : 'white'};
  position: absolute;
  margin: auto;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  max-width: 1024px;
  height: auto;
  max-height: 100%;
  overflow-y: auto;
  .modal-close {
    position: fixed;
    right: 1rem;
    top: 1rem;
    cursor: pointer;
    &:hover {
      transform: scale(1.2)
    }
  }
  .modal-content {
    padding: 2.5rem 1rem;
  }

  @media screen and (min-width: 768px) {
    max-height: calc(100% - 20px);
    .modal-content {
      padding: 2.5rem;
    }
  }
`

export default function Modal(props) {
  const { onClose, children, ...otherProps } = props
  return (
    <ModalStyled {...otherProps}>
      <div className="modal-close" onClick={onClose}>
        <Close />
      </div>
      <div className="modal-content">
        {children}
      </div>
    </ModalStyled>
  )
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}