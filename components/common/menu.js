import styled from 'styled-components'
import Link from 'next/link'

const menux = [
  {
    title: 'Workflow',
    url: '/workflow',
  },
  {
    title: 'CronJob',
    url: '/cronjob'
  },
  {
    title: '404',
    url: '/notfound'
  }
]


const MenuStyled = styled.div`
  transform: translateX(100%);
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;
  background-color: var(--primary);
  opacity: 0.9;
  transition: 0.4s;
  .items {
    position: absolute;
    transform: translateY(50%);
    text-align: center;
    width: calc(100% - 2rem);
    bottom: 50%;
    margin: 0;
    padding: 0;
    li {
      display: block;
      margin: 3.5rem 0;
      text-decoration: underline;
      font-size: 24px;
    }
    a {
      color: inherit;
      letter-spacing: 1.5px;
      font-weight: 500;
    }
  }
  @media screen and (min-width: 1024px) {
    transform: translateX(0);
    position: static;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: transparent;
    opacity: 1;
    .items {
      transform: none;
      position: static;
      display: flex;
      li {
        margin: 0 8px;
        font-size: 1rem;
        :first {
          margin: 0;
        }
      }
    }
  }
`

export default function Menu({ className }) {
  return (
    <MenuStyled className={className}>
      <ul className="items">
        {menux.map(({ title, url }, index) => (
          <li key={index}>
            <Link href={url}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </MenuStyled>
  )
}