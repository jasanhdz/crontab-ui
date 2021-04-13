import styled from 'styled-components'
import Close from '@material-ui/icons/Close'
import WarningOutlined from '@material-ui/icons/WarningRounded'
import PropTypes from 'prop-types'
import Button, { SecondaryButton } from 'common/button'

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
  max-height: calc(100% - 2rem);
  max-width: calc(100% - 2rem);
  overflow-y: auto;
  border-radius: 4px;
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

export const ModalPreventStyled= styled(ModalStyled)`
  padding-left: 0;
  padding-right: 0;
  .header {
    padding: 0 1rem;
    border-bottom: 1px solid rgba(63, 81, 181, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    .icon {
      font-size: 32px;
    }
    .title {
      margin-left: 20px;
    }
  }
  .modal-content {
    padding: 1rem;
    text-align: center;
  }
  .buttons {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(2, 130px);
    grid-column-gap: 20px;
    padding-top: 1rem;
  }
  @media screen and (min-width: 768px) {
    .title {
      font-size: 24px;
    }
    .icon {
      font-size: 40px;
    }
  }
`

export function ModalConfirm(props) {
  const { children, title, onClose, onConfirm, ...otherProps } = props
  return (
    <ModalPreventStyled {...otherProps}>
      <header className="header">
        <span className="icon"><WarningOutlined fontSize="inherit" /></span>
        <span className="title">Mensaje de confirmación</span>
      </header>
      <div className="modal-content">
        {children}
        <div className="buttons">
          <SecondaryButton onClick={onClose}>Cancelar</SecondaryButton>
          <Button onClick={onConfirm} background="#f50057" color="white">Eliminar</Button>
        </div>
      </div>
    </ModalPreventStyled>
  )
}