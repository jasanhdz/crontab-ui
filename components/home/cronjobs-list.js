import styled from 'styled-components'
import Link from 'next/link'

const TableStyled = styled.table`
  border-spacing: 0px;
  overflow-x: scroll;
  thead {
    background-color: #d1d1d1;
    color: rgba(0,0,0, 0.5);
  }
  th , td {
    padding: 8px;
  }
  .small {
    font-size: 12px;
  }
`


function CronJobsList({ cronjobs }) {
  const options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: true,
    timeZone: 'America/Los_Angeles'
  }
  const createItems = () => cronjobs.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td>{item.scheduling}</td>
      <td>{item.workflow_id}</td>
      <td>{Intl.DateTimeFormat('default', options).format(new Date(item.created_at))}</td>
      <td>{Intl.DateTimeFormat('default', options).format(new Date(item.updated_at))}</td>
      <td>
        <Link href={`cronjob/${item.id}`}>
          <a>Editar</a>
        </Link>
      </td>
      <td>
        <button>Eliminar</button>
      </td>
    </tr>
  ))

  return (
    <TableStyled>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Scheduling</th>
          <th>Workflow ID</th>
          <th>CreateAt</th>
          <th>UpdateAt</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {createItems()}
      </tbody>
    </TableStyled>
  )
}

export default CronJobsList
