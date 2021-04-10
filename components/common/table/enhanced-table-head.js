import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import CheckBox from '@material-ui/core/Checkbox'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import PropTypes from 'prop-types'

// const headCells = [
//   { id: 'name', numeric: false, disablePadding: true, label: 'Nombre' },
//   { id: 'description', numeric: false, disablePadding: false, label: 'Descrición' },
//   { id: 'scheduling', numeric: false, disablePadding: false, label: 'Scheduling' },
//   { id: 'id', numeric: true, disablePadding: false, label: 'id' },
//   { id: 'updated_at', numeric: false, disablePadding: false, label: 'UpdatedAt' },
//   { id: 'created_at', numeric: false, disablePadding: false, label: 'CreatedAt' },
// ]

export default function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } = props
 
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <CheckBox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'center'}
            // align="center"
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}
