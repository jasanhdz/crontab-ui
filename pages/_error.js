import Button from 'common/button'
import Wrapper from 'common/wrapper'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const WrapperStyled = styled(Wrapper)`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column-reverse;
  justify-content: space-evenly;
  align-items: center;
  @media screen and (min-width: 1024px) {
    flex-direction: row;
    flex-wrap: nowrap;
  }
`

const ErrorStyled = styled.div`
  background: url("/stars.svg"), #1b1b25;
  height: 100vh;
  display: flex;
  img {
    width: 300px;
  }
  .description {
    color: white;
    text-align: center;
    h1 {
      text-shadow: 0.1em 0.1em #333;
      font-family: "Anton", sans-serif;
    }
    p {
      font-size: 1.1rem;
      line-height: 1.5;
      color: #c9c9c9;
    }
  }
  @media screen and (min-width: 1024px) {
    h1 {
      font-size: 48px;
      letter-spacing: 2.0px;
    }
    .description {
      text-align: start;
      padding: 10px 15px;
      p {
        font-size: 1.4rem;
      }
    }
    img {
      width: auto;
    }
    .action {
      max-width: 250px;
      text-align: center;
    }
  }
` 

export default function Error({ statusCode }) {
  const router = useRouter()
  return (
    <ErrorStyled>
      <WrapperStyled>
        <div className="description">
          <h1>Error {statusCode}: La página que estas buscando no existe:</h1>
          <p>
            La página pudo ser movida o eliminada, si crees que esto es un error
            contacta al desarrollador
          </p>
          <div className="action">
            <Button onClick={() => router.back()} fullWidth >Regresar</Button>
          </div>
        </div>
        <img src="/astronaut.png" alt="Astronaut" />
      </WrapperStyled>
    </ErrorStyled>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
