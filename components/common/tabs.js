import styled from 'styled-components'
import { useState } from 'react'

const TabsStyled = styled.div`
  .tabs {
    max-width: 650px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    /* grid-template-columns: repeat(6, 1fr); */
  }
  .tabs-title {
    color: #d3d3d4;
    font-weight: 500;
    box-shadow: 0 -1px 0 0 #d3d3d4 inset;
    text-align: center;
    padding: 6px 0;
    cursor: pointer;
    h2 {
      font-size: 16px;
      user-select: none;
    }
    &.is-active {
      color: #212429;
      box-shadow: 0 -3px 0 0 var(--primary) inset;
    }
    
  }
  .tabs-content {
    display: none;
    &.is-active {
      display: block;
    }
  }
`

function Tabs({ options }) {
  const [tabActive, setTabActive] = useState(options[0].id)
  return (
    <TabsStyled>
      <div className="tabs">
        {
          options.map(tab => (
            <div
              key={tab.id}
              className={`tabs-title ${tabActive === tab.id && 'is-active'}`}
              onClick={() => setTabActive(tab.id)}
            >
              <h2>{tab.title.toUpperCase()}</h2>
            </div>
          ))
        }
      </div>
      {
        options.map(tab => (
          <div key={tab.id} className={`tabs-content ${tabActive === tab.id && 'is-active'}`}>
            <div>{tab.component}</div>
          </div>
        ))
      }
    </TabsStyled>
  )
}

export default Tabs
