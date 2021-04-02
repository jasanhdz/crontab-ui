import { createGlobalStyle } from 'styled-components'

const DefaultStyles = createGlobalStyle`
  :root {
    --primaryFont: ${({ theme }) => theme.primaryFont};
    --secondaryFont: ${({ theme }) => theme.secondaryFont};
    --primary: ${({ theme }) => theme.primary};
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--primaryFont);
  }
`

export default function BaseStyles({ theme }) {
  return <DefaultStyles {...theme} />
}