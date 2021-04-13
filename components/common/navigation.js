import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Container from 'common/wrapper'
import Menu from 'common/menu'
import CloseIcon from '@material-ui/icons/Close'
import MenuIcon from '@material-ui/icons/Menu'
import Link from 'next/link'
 
const MenuStyled = styled(Menu)``

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
    font-size: 30px;
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
  }

  @media screen and (min-width: 1024px) {
    .toogle-button {
      display: none;
    }
  }

`

export default function Navigation() {
  const element = useRef(null)
  function toogleChecked() {
    element.current.checked = !element.current.checked
  }
  useEffect(() => {
    if (window !== 'undefined') {
      const $body = document.getElementsByTagName('body')[0]
      const hammer = new Hammer($body)
      hammer.on('swipeleft', toogleChecked)
      hammer.on('swiperight', toogleChecked)
    }
  }, [])
  return (
    <NavigationStyled>
      <Wrapper>
        <input ref={element} className="checkbox" type="checkbox" id="toogle-button" name="active" />
        <Link href="/">
          <a className="logo">Booleand</a>
        </Link>
        <label htmlFor="toogle-button" className="toogle-button">
          <MenuIcon className="open" fontSize="inherit" />
          <CloseIcon className="close" fontSize="inherit" />
        </label>
      <MenuStyled />
      </Wrapper>
    </NavigationStyled>
  )
}
