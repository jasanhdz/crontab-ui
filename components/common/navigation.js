import React, { useRef } from 'react'
import styled from 'styled-components'
import Container from 'common/wrapper'
import Menu from 'common/menu'
import Overlay from 'common/overlay'
import CloseIcon from '@material-ui/icons/Close'
import MenuIcon from '@material-ui/icons/Menu'
import Link from 'next/link'
 
const MenuStyled = styled(Menu)``
const OverlayStyled = styled(Overlay)``

const Wrapper = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NavigationStyled = styled.div`
  background-color: var(--primary);
  color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
  .logo {
    color: inherit;
    z-index: 5;
    font-weight: bold;
    letter-spacing: 2.5px;
    text-transform: uppercase;
  }
  .toogle-button {
    position: relative;
    z-index: 5;
    .close {
      display: none;
    }
  }
  .checkbox {
    display: none;
  }
  .close, .open {
    cursor: pointer;
    user-select: none;
  } 
  .checkbox:checked {
    ~ .toogle-button {
      .close {
        display: inline;
      }
      .open {
        display: none;
      }
    }
    ~ ${MenuStyled} {
      transform: translateX(0)
    }
    ~ ${OverlayStyled} {
      visibility: visible
    }
  }

  @media screen and (min-width: 1024px) {
    .toogle-button {
      display: none;
    }
  }

`

export default function Navigation() {
  const element = useRef(null);
  const handleClick = () => {
    element.current.checked = false
  }
  return (
    <NavigationStyled>
      <Wrapper>
        <input ref={element} className="checkbox" type="checkbox" id="toogle-button" name="active" />
        <Link href="/">
          <a className="logo">Booleand</a>
        </Link>
        <label htmlFor="toogle-button" className="toogle-button">
          <MenuIcon className="open" size={26} color="white" />
          <CloseIcon className="close" size={26} color="#262626" />
        </label>
      <OverlayStyled onClick={handleClick} />
      <MenuStyled />
      </Wrapper>
    </NavigationStyled>
  )
}
